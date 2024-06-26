import { makeAutoObservable, runInAction, toJS } from "mobx";
import isEqual from "lodash.isequal";

import { Timer } from "src/utils/Timer.ts";
import { ComplexRequest } from "src/model/store/request/ComplexRequest.ts";
import {
    FunctionModel,
    FunctionModelPropsType,
} from "src/model/FunctionModel.ts";
import MqttService from "src/service/MqttService.ts";

export class FunctionModelStore {
    public isFetching: boolean = false;
    public isError: boolean = false;
    public isPaused: boolean = false;
    public functionData: FunctionModel;

    private readonly complexRequest: ComplexRequest = new ComplexRequest();
    private readonly apiService = MqttService;
    private readonly timer: Timer;
    private initialFunctionData: FunctionModel;

    constructor(props: ConstructorPropsType) {
        this.functionData = new FunctionModel(props);
        this.initialFunctionData = toJS(this.functionData);
        this.timer = new Timer({
            frequency: this.functionData.frequency,
        });
        makeAutoObservable(this);
    }

    public onSaveFunctionData() {
        this.initialFunctionData = { ...this.functionData };
    }

    public get isSaved(): boolean {
        return isEqual(toJS(this.initialFunctionData), toJS(this.functionData));
    }

    public onChangeFrequency = (frequency: number) => {
        this.functionData.frequency = frequency;
        this.timer.frequency = frequency;
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
        this.isError = false;
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
            topic: this.functionData.topic,
            payloadStep: this.functionData.payloadStep,
            payloadTo: this.functionData.payload.payloadTo,
            payloadFrom: this.functionData.payload.payloadFrom,
            implementationType: this.functionData.implementation,
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
        try {
            await this.sendRequest(this.functionData.payload.payloadConst);
        } catch (error) {
            runInAction(() => {
                this.isError = true;
            });
            console.log("periodicRequest error~~", error);
        }
    };

    private sendRequest = async (payload: string) => {
        await this.apiService.sendMessageToMqtt({
            payload,
            topic: this.functionData.topic,
        });
    };
}

type ConstructorPropsType = FunctionModelPropsType;
