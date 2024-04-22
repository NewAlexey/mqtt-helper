class MqttService {
    private readonly MQTT_BACKEND_PORT = process.env.MQTT_BACKEND_PORT;
    private readonly MQTT_BACKEND_HOST = process.env.MQTT_BACKEND_HOST;
    private readonly MQTT_BACKEND_TOPIC_ROUTE =
        process.env.MQTT_BACKEND_TOPIC_ROUTE;

    private readonly MQTT_BACKEND_URL = `http://${this.MQTT_BACKEND_HOST}:${this.MQTT_BACKEND_PORT}/${this.MQTT_BACKEND_TOPIC_ROUTE}`;

    public async sendMessageToMqtt(props: SendMessageToMqttPropsType) {
        await fetch(this.MQTT_BACKEND_URL, {
            method: "POST",
            body: JSON.stringify(props),
            headers: {
                "Content-type": "Application/json",
            },
        });
    }
}

export default new MqttService();

export type SendMessageToMqttPropsType = {
    topic: string;
    payload: string | number;
};
