import { makeAutoObservable } from "mobx";
import { FunctionMode } from "src/store/FunctionModelStore.ts";

export class FunctionModel {
    public id: string;
    public topic: string;
    public payload: FunctionPayloadType;
    public mode: FunctionMode = "single";
    public payloadStep: string = "0";
    public frequency: number = 1000;

    constructor({
        id,
        topic,
        payloadTo,
        payloadFrom,
        payloadConst,
    }: ConstructorPropsType) {
        const payload = {
            payloadFrom,
            payloadTo,
            payloadConst,
        };

        this.id = id;
        this.topic = topic;
        this.payload = payload;
        makeAutoObservable(this);
    }

    public onChangeRangePayload = (rangePayload: {
        from: string;
        to: string;
    }) => {
        this.payload = {
            payloadConst: this.payload.payloadConst,
            payloadTo: rangePayload.to,
            payloadFrom: rangePayload.from,
        };
    };

    public onChangeTopic = (topicValue: string): void => {
        this.topic = topicValue;
    };

    public onChangePayloadStep = (payloadStep: string) => {
        this.payloadStep = payloadStep;
    };

    public onChangeMode = (mode: FunctionMode) => {
        this.mode = mode;
    };

    public onChangePayload = (payloadValue: string) => {
        this.payload.payloadConst = payloadValue;
    };
}

type ConstructorPropsType = {
    id: string;
    topic: string;
    payloadTo: string;
    payloadFrom: string;
    payloadConst: string;
};

export type FunctionPayloadType = {
    payloadFrom: string;
    payloadTo: string;
    payloadConst: string;
};
