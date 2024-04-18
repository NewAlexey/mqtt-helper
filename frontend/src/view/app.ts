import { MqttHelperPage } from "src/view/mqtt-helper/MqttHelperPage.ts";

export class App {
    private mqttHelperPage = new MqttHelperPage();
    private readonly rootElement = document.querySelector("#app")!;

    public init() {
        const mqttHelperElement = this.mqttHelperPage.init();

        this.rootElement.append(mqttHelperElement);
    }
}
