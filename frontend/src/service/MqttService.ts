class MqttService {
    private readonly MQTT_BACKEND_URL = `http://${process.env.BACKEND_MQTT_STUB_PORT}:${process.env.BACKEND_MQTT_STUB_HOST}/${process.env.BACKEND_MQTT_STUB_TOPIC_ROUTE}`;

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
