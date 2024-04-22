import { useCallback, useState } from "react";

export const useErrorData = () => {
    const [errorData, setErrorData] = useState<ErrorDataType>(initialErrorData);

    const clearErrorData = useCallback(
        () => setErrorData(initialErrorData),
        [],
    );

    return { errorData, setErrorData, clearErrorData };
};

export type ErrorDataType = {
    payloadStepError: string;
    payloadRangeError: string;
};

const initialErrorData: ErrorDataType = {
    payloadRangeError: "",
    payloadStepError: "",
};
