import express from 'express';
import * as mqtt from 'mqtt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const mqttClient = mqtt.connect(`mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`);

// Connect to the MQTT broker
mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker')
});

app.use(express.static('public'));
app.use(cors({
    origin: '*'
}));

app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Allow,Access-Control-Allow-Origin');
    next();
})

// MQTT middleware for publishing and subscribing
app.use(function (req, res, next) {
    // Publish messages
    req.mqttPublish = function (topic, message) {
        mqttClient.publish(topic, message)
    }

    // Subscribe to topic
    req.mqttSubscribe = function (topic, callback) {
        mqttClient.subscribe(topic)
        mqttClient.on('message', function (t, m) {
            if (t === topic) {
                callback(m.toString())
            }
        })
    }
    next()
})

app.get('/', function (req, res) {
    // Subscribe
    req.mqttSubscribe(process.env.TOPIC_PREFIX, function (message) {
        console.log('Received message: ' + message)
    })

    res.send('MQTT is working!')
})

app.post('/topic', function (req, res) {
    const { topic, payload } = req.body;

    req.mqttPublish(topic, payload);

    res.send('MQTT is working!')
})

app.listen(process.env.BACKEND_PORT, function () {
    console.log(`Server is running on port ${process.env.BACKEND_PORT}`)
})
