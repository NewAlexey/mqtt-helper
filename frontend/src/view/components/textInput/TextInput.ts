import { createElement } from "src/utils/createElement.ts";

import "./style.scss";

export class TextInput {
    private readonly container = createElement("div", "text-input_container");
    private readonly input = createElement("input", "text-input");
    private readonly label = createElement("label", "text-label");

    public init(props: InputInitProps) {
        this.input.addEventListener("input", props.inputHandler);
        this.input.id = props.id;
        this.input.placeholder = props.placeholder;

        this.label.innerText = props.label;
        this.label.htmlFor = props.id;

        this.container.append(this.label, this.input);

        return this.container;
    }
}

type InputInitProps = {
    id: string;
    placeholder: string;
    label: string;
    inputHandler: (event: Event) => void;
};
