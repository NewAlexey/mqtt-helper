import { makeAutoObservable, runInAction } from "mobx";

import MqttService from "src/service/MqttService.ts";
import { Timer } from "src/utils/Timer.ts";

export class FunctionModel {
    public id: string;
    public topic: string;
    public payload: FunctionPayloadType;

    public temporaryPayload: string = "";
    public mode: FunctionMode = "single";
    public payloadStep: string = "0";
    public frequency: number = 1000;
    public executionMode: FunctionExecutionMode = "increasing";

    public isFetching: boolean = false;
    public isError: boolean = false;
    public isPaused: boolean = false;

    private readonly timer: Timer = new Timer({
        frequency: this.frequency,
    });

    private readonly requestService = MqttService;

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

    public pausePeriodicRequest = () => {
        this.timer.pause();
        this.isPaused = true;
    };

    public stopPeriodicRequest = () => {
        this.timer.stop();
        this.isPaused = false;
        this.isFetching = false;
        this.temporaryPayload = "";
    };

    public startPeriodicRequest = async () => {
        this.isPaused = false;
        this.isFetching = true;
        this.timer.run();
    };

    public unpausePeriodicRequest = () => {
        this.isPaused = false;
        this.timer.unpause();
    };

    public sendRequest = async () => {
        this.isFetching = true;
        this.isError = false;

        try {
            await this.requestService.sendMessageToMqtt({
                topic: this.topic,
                payload: this.payload.payloadConst,
            });
        } catch (error) {
            console.log("sendRequestError", error);
            runInAction(() => {
                this.isError = true;
                setTimeout(() => {
                    runInAction(() => (this.isError = false));
                }, 2000);
            });
        } finally {
            runInAction(() => {
                this.isFetching = false;
            });
        }
    };

    public onChangePayloadStep = (payloadStep: string) => {
        this.payloadStep = payloadStep;
    };

    public onChangeTopic = (topicValue: string): void => {
        this.topic = topicValue;
    };

    public onChangeMode = (mode: FunctionMode) => {
        this.mode = mode;

        if (this.mode === "periodic") {
            this.timer.setHandler(this.periodicRequest);
        }

        if (this.mode === "complex") {
            this.timer.setHandler(this.complexRequest);
        }
    };

    public onChangePayload = (payloadValue: string) => {
        this.payload.payloadConst = payloadValue;
    };

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

    public onChangeFrequency = (frequency: number) => {
        this.frequency = frequency;
        this.timer.frequency = frequency;
    };

    public onChangeExecutionMode = (executionMode: FunctionExecutionMode) => {
        this.executionMode = executionMode;
    };

    public startComplexRequest = async () => {
        this.isPaused = false;
        this.isFetching = true;
        this.timer.run();

        //TODO добавить проверку для синусоидальной функции.
        if (
            this.executionMode === "increasing" ||
            this.executionMode === "sinusoidal"
        ) {
            this.temporaryPayload = this.payload.payloadFrom;
        }

        if (this.executionMode === "decreasing") {
            this.temporaryPayload = this.payload.payloadTo;
        }
    };

    private periodicRequest = async () => {
        console.log("i'm periodic request!!");
        // await this.requestService.sendMessageToMqtt({
        //     topic: this.topic,
        //     payload: this.payload,
        // });
    };

    private complexRequest = async () => {
        if (this.executionMode === "increasing") {
            this.increaseMode();
        }
    };

    public increaseMode = () => {
        console.log("this", this.temporaryPayload);
        this.temporaryPayload = String(
            Number(this.temporaryPayload) + Number(this.payloadStep),
        );
        console.log("this", this.temporaryPayload);
    };
}

type ConstructorPropsType = {
    id: string;
    topic: string;
    payloadTo: string;
    payloadFrom: string;
    payloadConst: string;
};

export type FunctionMode = "single" | "periodic" | "complex";
export type FunctionExecutionMode = "decreasing" | "increasing" | "sinusoidal";
export type FunctionPayloadType = {
    payloadFrom: string;
    payloadTo: string;
    payloadConst: string;
};
