import { getProcessEnv } from "../utils/getProcessEnv.ts";

class RequestService {
    private readonly BACKEND_PORT = getProcessEnv("BACKEND_PORT");
    private readonly BACKEND_HOST = getProcessEnv("BACKEND_PORT");

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

export default new RequestService();

export type SendMessageToMqttPropsType = {
    topic: string;
    payload: string;
};
