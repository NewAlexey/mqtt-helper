export class FunctionController {
    public topicData = "";

    public topicInputHandler(event: Event) {
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        this.topicData = event.target.value;
        console.log("topicData~~", this.topicData);
    }
}
