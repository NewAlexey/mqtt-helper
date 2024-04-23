import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

import { numericRegExp } from "src/utils/numericRegExp.ts";

export const ConstantPayload = observer(
    ({ id, payloadConst, onChangePayload }: PropsType) => {
        const payloadInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!numericRegExp.test(event.target.value)) {
                return;
            }

            onChangePayload(event.target.value);
        };

        return (
            <div className="data-item__content">
                <InputLabel id={`${id}_payload`}>Payload</InputLabel>
                <TextField
                    id={`${id}_payload`}
                    variant="outlined"
                    value={payloadConst}
                    onChange={payloadInputHandler}
                    size="small"
                />
            </div>
        );
    },
);

type PropsType = {
    id: string;
    payloadConst: string;
    onChangePayload: (payload: string) => void;
};
