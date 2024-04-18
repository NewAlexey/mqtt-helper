class MqttService {
    private readonly BACKEND_PORT = process.env.BACKEND_PORT;
    private readonly BACKEND_HOST = process.env.BACKEND_PORT;

    private readonly BACKEND_URL = `http://${this.BACKEND_HOST}:${this.BACKEND_PORT}`;

    public async sendMessageToMqtt(props: SendMessageToMqttPropsType) {
        await fetch(this.BACKEND_URL, {
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
    payload: string;
};
