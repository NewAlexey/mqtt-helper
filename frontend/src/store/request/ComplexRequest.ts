import { makeAutoObservable } from "mobx";

export class ComplexRequest {
    public executionMode: FunctionExecutionMode = "increasing";
    private sinusoidalFunctionMode: SinusoidalRequestMode | null = null;
    private temporaryPayload: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public onChangeExecutionMode = (executionMode: FunctionExecutionMode) => {
        this.executionMode = executionMode;
    };

    public getComplexRequestHandler = ({
        payloadStep,
        stopRequest,
        payloadTo,
        payloadFrom,
    }: ComplexRequestProps) => {
        this.temporaryPayload = payloadFrom;

        if (this.executionMode === "increasing") {
            return () =>
                this.increaseModeRequest(payloadStep, payloadTo, stopRequest);
        }

        if (this.executionMode === "decreasing") {
            return () =>
                this.decreaseModeRequest(payloadStep, payloadTo, stopRequest);
        }

        if (this.executionMode === "sinusoidal") {
            this.changeSinusoidalRequestMode(payloadTo, payloadFrom);

            return () =>
                this.sinusoidalModeRequest(payloadStep, payloadTo, payloadFrom);
        }

        throw new Error("Check Complex request handlers.");
    };

    private sinusoidalModeRequest = (
        payloadStep: string,
        payloadTo: string,
        payloadFrom: string,
    ) => {
        console.log("payload~~", this.temporaryPayload);

        if (this.sinusoidalFunctionMode === "increase") {
            this.temporaryPayload = String(
                (Number(this.temporaryPayload) + Number(payloadStep)).toFixed(
                    2,
                ),
            );
        } else {
            this.temporaryPayload = String(
                (Number(this.temporaryPayload) - Number(payloadStep)).toFixed(
                    2,
                ),
            );
        }

        this.changeSinusoidalRequestMode(payloadTo, payloadFrom);
    };

    private increaseModeRequest = (
        payloadStep: string,
        payloadTo: string,
        stopRequest: () => void,
    ) => {
        console.log("increase request");
        console.log("payload~~", this.temporaryPayload);

        this.temporaryPayload = String(
            (Number(this.temporaryPayload) + Number(payloadStep)).toFixed(2),
        );

        if (Number(this.temporaryPayload) > Number(payloadTo)) {
            stopRequest();

            return;
        }
    };

    private decreaseModeRequest = (
        payloadStep: string,
        payloadTo: string,
        stopRequest: () => void,
    ) => {
        console.log("decrease request");
        console.log("payload~~", this.temporaryPayload);

        this.temporaryPayload = String(
            (Number(this.temporaryPayload) - Number(payloadStep)).toFixed(2),
        );

        if (Number(this.temporaryPayload) < Number(payloadTo)) {
            stopRequest();

            return;
        }
    };

    private changeSinusoidalRequestMode(
        payloadTo: string,
        payloadFrom: string,
    ) {
        if (!this.sinusoidalFunctionMode) {
            this.sinusoidalFunctionMode =
                payloadFrom >= payloadTo ? "decrease" : "increase";

            return;
        }

        if (this.sinusoidalFunctionMode === "increase") {
            if (
                Number(this.temporaryPayload) >= Number(payloadTo) &&
                Number(this.temporaryPayload) >= Number(payloadFrom)
            ) {
                this.sinusoidalFunctionMode = "decrease";
            }
        } else {
            if (
                Number(this.temporaryPayload) <= Number(payloadFrom) &&
                Number(this.temporaryPayload) <= Number(payloadTo)
            ) {
                this.sinusoidalFunctionMode = "increase";
            }
        }
    }

    public onStopRequest() {
        this.temporaryPayload = "";
        this.sinusoidalFunctionMode = null;
    }
}

type ComplexRequestProps = {
    payloadStep: string;
    payloadTo: string;
    payloadFrom: string;
    stopRequest: () => void;
};

export type SinusoidalRequestMode = "increase" | "decrease";
export type FunctionExecutionMode = "decreasing" | "increasing" | "sinusoidal";
