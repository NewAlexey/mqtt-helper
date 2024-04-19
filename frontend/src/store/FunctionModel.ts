import { makeAutoObservable, runInAction } from "mobx";

import MqttService from "src/service/MqttService.ts";
import { Timer } from "src/utils/Timer.ts";

export class FunctionModel {
    public id: string;
    public topic: string;
    public payload: string;
    public mode: FunctionMode = "single";
    public isFetching: boolean = false;
    public isError: boolean = false;
    public isPaused: boolean = false;
    public delay: number = 1000;

    private readonly timer: Timer = new Timer({
        delay: this.delay,
        handler: () => this.periodicRequest(),
    });

    private readonly requestService = MqttService;

    constructor({ id, topic, payload }: ConstructorPropsType) {
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
                payload: this.payload,
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

    public onChangeTopic = (topicValue: string): void => {
        this.topic = topicValue;
    };

    public onChangeMode = () => {
        this.mode = this.mode === "single" ? "periodic" : "single";
    };

    public onChangePayload = (payloadValue: string) => {
        this.payload = payloadValue;
    };

    private periodicRequest = async () => {
        console.log("run periodicRequest!!");

        // await this.requestService.sendMessageToMqtt({
        //     topic: this.topic,
        //     payload: this.payload,
        // });
    };
}

type ConstructorPropsType = {
    id: string;
    topic: string;
    payload: string;
};

export type FunctionMode = "single" | "periodic";
