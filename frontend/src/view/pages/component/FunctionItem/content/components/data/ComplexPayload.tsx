import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";

import "./style.scss";

import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import { numericRegExp } from "src/utils/numericRegExp.ts";

export const ComplexPayload = observer(
    ({
        id,
        payloadTo,
        payloadFrom,
        isFetching,
        setErrorData,
        payloadRangeError,
        onChangeRangePayload,
    }: PropsType) => {
        const payloadFromInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            if (!numericRegExp.test(event.target.value)) {
                return;
            }

            setErrorData((prevValue) => ({
                ...prevValue,
                payloadRangeError: "",
            }));
            onChangeRangePayload({
                to: payloadTo,
                from: event.target.value,
            });
        };

        const payloadToInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            if (!numericRegExp.test(event.target.value)) {
                return;
            }

            setErrorData((prevValue) => ({
                ...prevValue,
                payloadRangeError: "",
            }));
            onChangeRangePayload({
                from: payloadFrom,
                to: event.target.value,
            });
        };

        return (
            <div className="complex-data__container">
                <Typography
                    style={{
                        color: `${Boolean(payloadRangeError) ? "red" : "rgba(0, 0, 0, 0.6)"}`,
                    }}
                >
                    Задайте диапазон payload
                </Typography>
                <div className="complex-data__content">
                    <div className="complex-data-item__container">
                        <InputLabel
                            id={`${id}_payload-from`}
                            error={Boolean(payloadRangeError)}
                        >
                            От
                        </InputLabel>
                        <TextField
                            id={`${id}_payload-from`}
                            variant="outlined"
                            value={payloadFrom}
                            onChange={payloadFromInputHandler}
                            size="small"
                            disabled={isFetching}
                            error={Boolean(payloadRangeError)}
                        />
                    </div>
                    <div className="complex-data-item__container">
                        <InputLabel
                            id={`${id}_payload-to`}
                            error={Boolean(payloadRangeError)}
                        >
                            До
                        </InputLabel>
                        <TextField
                            id={`${id}_payload-to`}
                            variant="outlined"
                            value={payloadTo}
                            onChange={payloadToInputHandler}
                            size="small"
                            disabled={isFetching}
                            error={Boolean(payloadRangeError)}
                        />
                    </div>
                </div>
            </div>
        );
    },
);

type PropsType = {
    id: string;
    payloadTo: string;
    payloadFrom: string;
    isFetching: boolean;
    payloadRangeError: string;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    onChangeRangePayload: (topicRange: { from: string; to: string }) => void;
};
