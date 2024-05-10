import express from 'express';
import * as mqtt from 'mqtt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const MQTT_HOST = process.env.MQTT_HOST;
const MQTT_PORT = process.env.MQTT_PORT;
const BACKEND_STUB_PORT = process.env.BACKEND_MQTT_STUB_PORT;
const BACKEND_STUB_TOPIC_ROUTE = process.env.BACKEND_MQTT_STUB_TOPIC_ROUTE;

const app = express();
const mqttClient = mqtt.connect(`mqtt://${MQTT_HOST}:${MQTT_PORT}`);

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

app.use(function (req, res, next) {
    req.mqttPublish = function (topic, message) {
        mqttClient.publish(topic, message)
    }

    next()
})

app.post(`/${BACKEND_STUB_TOPIC_ROUTE}`, function (req, res) {
    const { topic, payload } = req.body;

    console.log(`Data received from front - ${topic}, payload - ${payload}`);

    try {
        req.mqttPublish(topic, payload);
        res.send('MQTT is working!')
    } catch (error) {
        res.send('Something wrong with mqtt.');
        res.status(400).send(error?.message ?? `Backend works, but something went wrong when trying to to publish payload "${payload}" on topic "${topic}".`)
    }

})

app.listen(BACKEND_STUB_PORT, function () {
    console.log(`Server is running on port ${BACKEND_STUB_PORT}`);
});
