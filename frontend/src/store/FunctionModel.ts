import { makeAutoObservable } from "mobx";

export class FunctionModel {
    public id: string;
    public topic: string;
    public payload: string;
    public mode: FunctionMode = "single";

    constructor({ id, topic, payload }: ConstructorPropsType) {
        this.id = id;
        this.topic = topic;
        this.payload = payload;
        makeAutoObservable(this);
    }

    public onChangeTopic = (topicValue: string): void => {
        this.topic = topicValue;
    };

    public onChangeMode = () => {
        this.mode = this.mode === "single" ? "periodic" : "single";
    };

    public onChangePayload = (payloadValue: string) => {
        this.payload = payloadValue;
    };
}

type ConstructorPropsType = {
    id: string;
    topic: string;
    payload: string;
};

export type FunctionMode = "single" | "periodic";
