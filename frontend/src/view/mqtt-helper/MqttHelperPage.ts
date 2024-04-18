import { createElement } from "src/utils/createElement.ts";
import { FunctionsContainer } from "src/view/mqtt-helper/components/FunctionsContainer/FunctionsContainer.ts";

export class MqttHelperPage {
    private readonly container = createElement("div", "mqtt_container");
    private readonly heading = createElement(
        "h2",
        "mqtt_heading",
        "Web-интерфейс тестирования",
    );

    private readonly functionsContainer: FunctionsContainer =
        new FunctionsContainer();

    public init(): HTMLElement {
        const settingContainer = this.functionsContainer.init();

        this.container.append(this.heading, settingContainer);

        return this.container;
    }
}
