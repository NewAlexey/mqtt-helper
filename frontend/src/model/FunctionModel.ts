import { makeAutoObservable } from "mobx";

const defaultData: Omit<PropsType, "id"> = {
    mode: "single",
    topic: "",
    topicMode: "custom",
    title: "Название функции тестирования",
    frequency: 1000,
    payloadStep: "0",
    implementation: "increasing",
    payload: {
        payloadConst: "",
        payloadTo: "",
        payloadFrom: "",
    },
};

export class FunctionModel {
    public id: string;
    public topic: string;
    public topicMode: FunctionTopicMode;
    public title: string;
    public payload: FunctionPayloadType;
    public mode: FunctionMode;
    public payloadStep: string;
    public frequency: number;
    public implementation: FunctionImplementation;

    constructor({
        id,
        mode,
        topic,
        title,
        payload,
        topicMode,
        frequency,
        payloadStep,
        implementation,
    }: FunctionModelPropsType) {
        this.payload = {
            payloadTo: payload?.payloadTo ?? defaultData.payload.payloadTo,
            payloadFrom:
                payload?.payloadFrom ?? defaultData.payload.payloadFrom,
            payloadConst:
                payload?.payloadConst ?? defaultData.payload.payloadConst,
        };
        this.id = id ?? String(new Date().getTime());
        this.title = title ?? defaultData.title;
        this.topic = topic ?? defaultData.topic;
        this.topicMode = topicMode ?? defaultData.topicMode;
        this.frequency = frequency ?? defaultData.frequency;
        this.mode = mode ?? defaultData.mode;
        this.payloadStep = payloadStep ?? defaultData.payloadStep;
        this.implementation = implementation ?? defaultData.implementation;
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

    public onChangeTitle = (title: string) => {
        this.title = title;
    };

    public onChangeTopic = (topicValue: string) => {
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

    public onChangeImplementation = (
        implementation: FunctionImplementation,
    ) => {
        this.implementation = implementation;
    };

    public onChangeTopicMode = (topicMode: FunctionTopicMode) => {
        this.topicMode = topicMode;
    };
}

type PropsType = {
    id: string;
    mode: FunctionMode;
    title: string;
    topic: string;
    topicMode: FunctionTopicMode;
    frequency: number;
    payloadStep: string;
    payload: FunctionPayloadType;
    implementation: FunctionImplementation;
};

export type FunctionModelPropsType = Partial<PropsType>;

export type FunctionPayloadType = {
    payloadFrom: string;
    payloadTo: string;
    payloadConst: string;
};

export type FunctionMode = "single" | "periodic" | "complex";
export type FunctionImplementation = "decreasing" | "increasing" | "sinusoidal";
export type FunctionTopicMode = "custom" | "device";
