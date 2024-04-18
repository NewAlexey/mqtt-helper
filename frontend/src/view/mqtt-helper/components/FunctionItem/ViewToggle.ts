import { PlusIcon } from "src/view/components/icons/PlusIcon.ts";
import { MinusIcon } from "src/view/components/icons/MinusIcon.ts";

export class ViewToggle {
    private showElement: HTMLElement | null = null;
    private hideElement: HTMLElement | null = null;

    public init(hideClass: string, callback: (event: Event) => void) {
        this.showElement = new PlusIcon().init(callback, "view-toggle");
        this.hideElement = new MinusIcon().init(callback, "view-toggle");

        this.showElement.classList.add(hideClass);

        return [this.hideElement, this.showElement];
    }

    public toggle(hideClass: string) {
        this.hideElement?.classList.toggle(hideClass);
        this.showElement?.classList.toggle(hideClass);
    }
}
