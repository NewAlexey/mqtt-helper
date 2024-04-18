import { createElement } from "src/utils/createElement.ts";

import "./style.scss";
import { TextInput } from "src/view/components/textInput/TextInput.ts";
import { RemoveIcon } from "src/view/components/icons/RemoveIcon.ts";
import { ViewToggle } from "src/view/mqtt-helper/components/FunctionItem/ViewToggle.ts";

type SettingItemProps = {
    topicInputHandler: (event: Event) => void;
};

export class FunctionView {
    private isHide: boolean = false;
    private readonly HIDE_CSS_CLASS = "hide";

    private readonly formContainer = createElement("form", "form_container");
    private readonly formContent = createElement("div", "form_content");
    private readonly formHeading = createElement("h5", "form_heading");

    private viewToggleElement = new ViewToggle();

    public init(props: SettingItemProps) {
        this.formContent.append(this.initSettingsContainer(props));

        this.formContainer.append(
            this.initHeadingContainer(),
            this.formContent,
        );

        return this.formContainer;
    }

    public remove() {
        this.formContainer.remove();
    }

    private initSettingsContainer(props: SettingItemProps) {
        const settingsContainer = createElement("div", "settings_container");
        const topicTextInput = new TextInput().init({
            id: String(new Date().getTime()),
            label: "Топик",
            placeholder: "Топик",
            inputHandler: props.topicInputHandler,
        });
        settingsContainer.append(topicTextInput);

        return settingsContainer;
    }

    private initHeadingContainer() {
        const removeButton = new RemoveIcon().init(
            () => this.remove(),
            "remove-icon",
        );

        const headingContainer = createElement("div", "heading_container");
        headingContainer.append(
            this.formHeading,
            ...this.viewToggleElement.init(
                this.HIDE_CSS_CLASS,
                (event: Event) => this.toggleButtonHandler(event),
            ),
            removeButton,
        );
        this.formHeading.innerText = "Название функции для тестирования mqtt.";

        return headingContainer;
    }

    private toggleButtonHandler(event: Event) {
        event.preventDefault();

        this.viewToggleElement.toggle(this.HIDE_CSS_CLASS);
        this.formContent.classList.toggle(this.HIDE_CSS_CLASS);

        this.isHide = !this.isHide;
    }
}
