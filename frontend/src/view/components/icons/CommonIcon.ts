import { createElement } from "src/utils/createElement.ts";

export class CommonIcon {
    private icon = createElement("div", "common-icon");

    constructor(htmlIcon: string) {
        this.icon.innerHTML = htmlIcon;
    }

    public init(callback: (event: Event) => void, className = "") {
        this.icon.addEventListener("click", callback);
        this.icon.classList.add(className);

        return this.icon;
    }
}
