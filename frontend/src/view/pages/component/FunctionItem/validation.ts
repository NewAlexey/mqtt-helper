import {
    FunctionExecutionMode,
    FunctionPayloadType,
} from "src/store/FunctionModel.ts";

export enum ERROR_MESSAGE_ENUM {
    PAYLOAD_STEP_WRONG_VALUE = "Задайте значение шага больше '0'.",
    PAYLOAD_STEP_LARGE_VALUE = "Значение шага больше разницы значений payload 'От' и 'До'.",
    PAYLOAD_RANGE_FROM_WRONG_VALUE = "Значение payload 'От' не может быть больше чем 'До'.",
    PAYLOAD_RANGE_TO_WRONG_VALUE = "Значение payload 'До' не может быть больше чем 'От'.",
    TOPIC_ERROR = "Задайте значение топика.",
}

export function isTopicValid(topic: string): boolean {
    return !!topic;
}

export function validatePayloadData(
    payload: FunctionPayloadType,
    payloadStep: number,
    executionMode: FunctionExecutionMode,
) {
    validatePayloadStep(payload, payloadStep);
    validateFunctionParameters(payload, executionMode);
}

function validateFunctionParameters(
    payload: FunctionPayloadType,
    executionMode: FunctionExecutionMode,
): void {
    if (executionMode === "increasing") {
        if (payload.payloadTo <= payload.payloadFrom) {
            throw new PayloadRangeError(
                ERROR_MESSAGE_ENUM.PAYLOAD_RANGE_TO_WRONG_VALUE,
            );
        }
    }

    if (executionMode === "decreasing") {
        if (payload.payloadFrom <= payload.payloadTo) {
            throw new PayloadRangeError(
                ERROR_MESSAGE_ENUM.PAYLOAD_RANGE_FROM_WRONG_VALUE,
            );
        }
    }
}

function validatePayloadStep(
    payload: FunctionPayloadType,
    payloadStep: number,
) {
    if (payloadStep <= 0) {
        throw new PayloadStepError(ERROR_MESSAGE_ENUM.PAYLOAD_STEP_WRONG_VALUE);
    }

    const payloadDiff = Math.abs(payload.payloadTo - payload.payloadFrom);

    if (payloadStep > payloadDiff) {
        throw new PayloadStepError(ERROR_MESSAGE_ENUM.PAYLOAD_STEP_LARGE_VALUE);
    }
}

export class PayloadStepError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class PayloadRangeError extends Error {
    constructor(message: string) {
        super(message);
    }
}
