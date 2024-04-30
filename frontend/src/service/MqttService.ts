class MqttService {
    private readonly BACKEND_MQTT_URL = `http://${process.env.BACKEND_MQTT_STUB_HOST}:${process.env.BACKEND_MQTT_STUB_PORT}/${process.env.BACKEND_MQTT_STUB_TOPIC_ROUTE}`;

    public async sendMessageToMqtt(props: SendMessageToMqttPropsType) {
        console.log("BACKEND_MQTT_URL", this.BACKEND_MQTT_URL);

        await fetch(this.BACKEND_MQTT_URL, {
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
