import { createElement } from "src/utils/createElement.ts";

import "./style.scss";

type OptionsType = {
    additionalClass?: string;
};

export class Button {
    private readonly element: HTMLButtonElement;

    constructor(title: string, iconSymbol: string, options?: OptionsType) {
        this.element = createElement("button", [
            "button_container",
            options?.additionalClass ?? "",
        ]);

        const titleElement = createElement("span", "title");
        titleElement.innerText = title;

        const iconElement = createElement("div", "icon");
        iconElement.innerText = iconSymbol;

        this.element.append(titleElement, iconElement);
    }

    public init(callback: (event: Event) => void) {
        this.element.addEventListener("click", callback);

        return this.element;
    }
}
