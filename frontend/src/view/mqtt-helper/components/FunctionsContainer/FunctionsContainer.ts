import { createElement } from "src/utils/createElement.ts";
import { FunctionItem } from "src/view/mqtt-helper/components/FunctionItem/FunctionItem.ts";
import { Button } from "src/view/components/button/Button.ts";

import "./style.scss";

export class FunctionsContainer {
    private readonly container = createElement("div", "function_container");
    private readonly content = createElement("div", "content");
    private readonly heading = createElement(
        "h4",
        "setting_heading",
        "Список функций",
    );

    private readonly addNewElementButton = new Button("Добавить функцию", "+", {
        additionalClass: "right-alignment",
    });

    public init() {
        this.container.append(this.heading);
        this.container.append(
            this.addNewElementButton.init(() => this.addNewSettingItem()),
        );
        this.content.append(new FunctionItem().init());

        this.container.append(this.content);

        return this.container;
    }

    public addNewSettingItem() {
        this.content.append(new FunctionItem().init());
    }
}
