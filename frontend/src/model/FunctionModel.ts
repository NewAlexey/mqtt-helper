import { makeAutoObservable } from "mobx";

const defaultData: Omit<PropsType, "id"> = {
    mode: "single",
    topic: "",
    title: "Название функции тестирования",
    payloadTo: "",
    frequency: 1000,
    payloadFrom: "",
    payloadStep: "0",
    payloadConst: "",
    implementation: "increasing",
};

export class FunctionModel {
    public id: string;
    public topic: string;
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
        payloadTo,
        frequency,
        payloadFrom,
        payloadStep,
        payloadConst,
        implementation,
    }: FunctionModelPropsType) {
        this.payload = {
            payloadTo: payloadTo ?? defaultData.payloadTo,
            payloadFrom: payloadFrom ?? defaultData.payloadFrom,
            payloadConst: payloadConst ?? defaultData.payloadConst,
        };
        this.id = id ?? String(new Date().getTime());
        this.title = title ?? defaultData.title;
        this.topic = topic ?? defaultData.topic;
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
}

type PropsType = {
    id: string;
    mode: FunctionMode;
    title: string;
    topic: string;
    payloadTo: string;
    frequency: number;
    payloadFrom: string;
    payloadStep: string;
    payloadConst: string;
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
