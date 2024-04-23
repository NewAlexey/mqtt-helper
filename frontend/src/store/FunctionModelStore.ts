import { makeAutoObservable, runInAction } from "mobx";

import { Timer } from "src/utils/Timer.ts";
import {
    ComplexRequest,
    FunctionExecutionMode,
} from "src/store/request/ComplexRequest.ts";
import { FunctionModel } from "src/model/FunctionModel.ts";
import MqttService from "src/service/MqttService.ts";

export class FunctionModelStore {
    public isFetching: boolean = false;
    public isError: boolean = false;
    public isPaused: boolean = false;

    public functionData: FunctionModel;

    private readonly complexRequest: ComplexRequest = new ComplexRequest();
    private readonly apiService = MqttService;
    private readonly timer: Timer;

    constructor(props: ConstructorPropsType) {
        this.functionData = new FunctionModel(props);
        this.timer = new Timer({
            frequency: this.functionData.frequency,
        });
        makeAutoObservable(this);
    }

    public get executionMode() {
        return this.complexRequest.executionMode;
    }

    public onChangeFrequency = (frequency: number) => {
        this.functionData.frequency = frequency;
        this.timer.frequency = frequency;
    };

    public onChangeExecutionMode = (executionMode: FunctionExecutionMode) => {
        this.complexRequest.onChangeExecutionMode(executionMode);
    };

    public sendSingleRequest = async () => {
        this.isFetching = true;
        this.isError = false;

        try {
            await this.sendRequest(this.functionData.payload.payloadConst);
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

    public stopRequest = () => {
        this.timer.stop();
        this.isPaused = false;
        this.isFetching = false;
        this.complexRequest.onStopRequest();
    };

    public pauseRequest = () => {
        this.timer.pause();
        this.isPaused = true;
    };

    public unpauseRequest = () => {
        this.isPaused = false;
        this.timer.unpause();
    };

    public startPeriodicRequest = async () => {
        this.timer.setHandler(this.periodicRequest);
        this.startRequest();
    };

    public startComplexRequest = async () => {
        const complexHandler = this.complexRequest.getComplexRequestHandler({
            payloadStep: this.functionData.payloadStep,
            payloadFrom: this.functionData.payload.payloadFrom,
            payloadTo: this.functionData.payload.payloadTo,
            stopRequest: this.stopRequest,
        });
        this.timer.setHandler(complexHandler);
        this.startRequest();
    };

    private startRequest() {
        this.isPaused = false;
        this.isFetching = true;
        this.timer.run();
    }

    private periodicRequest = async () => {
        console.log("i'm periodic request!!");
        // await this.requestService.sendMessageToMqtt({
        //     topic: this.topic,
        //     payload: this.payload,
        // });
    };

    private sendRequest = async (payload: string) => {
        await this.apiService.sendMessageToMqtt({
            payload,
            topic: this.functionData.topic,
        });
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
