import { makeAutoObservable } from "mobx";

import { FunctionImplementation } from "src/model/FunctionModel.ts";

export class ComplexRequest {
    private executionMode: ExecutionMode | null = null;
    private temporaryPayload: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public getComplexRequestHandler = ({
        topic,
        payloadStep,
        stopRequest,
        payloadTo,
        payloadFrom,
        implementationType,
    }: ComplexRequestProps) => {
        this.temporaryPayload = getNormalizeString(payloadFrom);

        if (implementationType === "increasing") {
            return () =>
                this.increaseModeRequest(
                    topic,
                    payloadStep,
                    payloadTo,
                    stopRequest,
                );
        }

        if (implementationType === "decreasing") {
            return () =>
                this.decreaseModeRequest(
                    topic,
                    payloadStep,
                    payloadTo,
                    stopRequest,
                );
        }

        if (implementationType === "sinusoidal") {
            this.changeSinusoidalExecutionMode(payloadTo, payloadFrom);

            return () =>
                this.sinusoidalModeRequest(
                    topic,
                    payloadStep,
                    payloadTo,
                    payloadFrom,
                );
        }

        throw new Error("Check Complex request handlers.");
    };

    public onStopRequest() {
        this.temporaryPayload = "";
        this.executionMode = null;
    }

    private sinusoidalModeRequest = (
        topic: string,
        payloadStep: string,
        payloadTo: string,
        payloadFrom: string,
    ) => {
        console.log("topic~~", topic);
        console.log("payload~~", this.temporaryPayload);

        if (this.executionMode === "increase") {
            this.increaseTempPayload(payloadStep);
        } else {
            this.decreaseTempPayload(payloadStep);
        }

        this.changeSinusoidalExecutionMode(payloadTo, payloadFrom);
    };

    private increaseModeRequest = (
        topic: string,
        payloadStep: string,
        payloadTo: string,
        stopRequest: () => void,
    ) => {
        console.log("call increase request, topic~~", topic);
        console.log("call increase request, payload~~", this.temporaryPayload);

        this.increaseTempPayload(payloadStep);

        if (Number(this.temporaryPayload) > Number(payloadTo)) {
            stopRequest();

            return;
        }
    };

    private decreaseModeRequest = (
        topic: string,
        payloadStep: string,
        payloadTo: string,
        stopRequest: () => void,
    ) => {
        console.log("call decrease request, topic~~", topic);
        console.log("call decrease request, payload~~", this.temporaryPayload);

        this.decreaseTempPayload(payloadStep);

        if (Number(this.temporaryPayload) < Number(payloadTo)) {
            stopRequest();

            return;
        }
    };

    private changeSinusoidalExecutionMode(
        payloadTo: string,
        payloadFrom: string,
    ) {
        if (!this.executionMode) {
            this.executionMode =
                payloadFrom >= payloadTo ? "decrease" : "increase";

            return;
        }

        if (this.executionMode === "increase") {
            if (
                Number(this.temporaryPayload) >= Number(payloadTo) &&
                Number(this.temporaryPayload) >= Number(payloadFrom)
            ) {
                this.executionMode = "decrease";
            }
        } else {
            if (
                Number(this.temporaryPayload) <= Number(payloadFrom) &&
                Number(this.temporaryPayload) <= Number(payloadTo)
            ) {
                this.executionMode = "increase";
            }
        }
    }

    private increaseTempPayload(payloadStep: string) {
        this.temporaryPayload = getNormalizeString(
            Number(this.temporaryPayload) + Number(payloadStep),
        );
    }

    private decreaseTempPayload(payloadStep: string) {
        this.temporaryPayload = getNormalizeString(
            Number(this.temporaryPayload) - Number(payloadStep),
        );
    }
}

const DECIMAL_COUNT = 2;

function getNormalizeString(value: string | number): string {
    return String(Number(value).toFixed(DECIMAL_COUNT));
}

type ComplexRequestProps = {
    topic: string;
    payloadStep: string;
    payloadTo: string;
    payloadFrom: string;
    stopRequest: () => void;
    implementationType: FunctionImplementation;
};

export type ExecutionMode = "increase" | "decrease";
