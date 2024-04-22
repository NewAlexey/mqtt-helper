import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

import { isNumber } from "src/utils/isNumber.ts";

export const ConstantPayload = observer(
    ({ id, payloadConst, onChangePayload }: PropsType) => {
        const payloadInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!isNumber(event.target.value)) {
                return;
            }

            onChangePayload(Number(event.target.value));
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
    payloadConst: number;
    onChangePayload: (payload: number) => void;
};