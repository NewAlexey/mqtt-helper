import { FunctionView } from "src/view/mqtt-helper/components/FunctionItem/FunctionView.ts";
import { FunctionController } from "src/view/mqtt-helper/components/FunctionItem/FunctionController.ts";

export class FunctionItem {
    private readonly view: FunctionView = new FunctionView();
    private readonly controller: FunctionController = new FunctionController();

    public init() {
        return this.view.init({
            topicInputHandler: (event: Event) =>
                this.controller.topicInputHandler(event),
        });
    }
}
