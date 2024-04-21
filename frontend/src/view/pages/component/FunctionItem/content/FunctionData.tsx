import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import "./style.scss";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { SensorData } from "src/store/FunctionModelListStore.ts";
import { isNumber } from "src/utils/isNumber.ts";

export const FunctionData = observer(
    ({ functionModel, sensorDataList }: PropsType) => {
        const topicSelectHandler = (event: SelectChangeEvent) =>
            functionModel.onChangeTopic(event.target.value);

        const topicInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
            functionModel.onChangeTopic(event.target.value);

        const payloadInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!isNumber(event.target.value)) {
                return;
            }

            functionModel.onChangePayload(event.target.value);
        };

        return (
            <div className="form-data__container boxed-container">
                <Typography
                    variant="h4"
                    fontSize={18}
                    fontWeight={500}
                    align="left"
                >
                    Данные запроса
                </Typography>
                <div className="function-data__container">
                    {sensorDataList.length ? (
                        <div className="data-item__content">
                            <InputLabel id="select_sensor-data">
                                Сенсор (топик)
                            </InputLabel>
                            <Select
                                size="small"
                                labelId="select_sensor-data"
                                disabled={functionModel.isFetching}
                                value={functionModel.topic}
                                onChange={topicSelectHandler}
                                className="select_sensor-data"
                            >
                                {sensorDataList.map((sensorData) => (
                                    <MenuItem
                                        key={sensorData.id}
                                        value={sensorData.topic}
                                    >
                                        {sensorData.description}
                                        {"\u00A0"}||{"\u00A0"}
                                        <strong>{sensorData.topic}</strong>
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    ) : (
                        <div className="data-item__content">
                            <InputLabel id={`${functionModel.id}_topic`}>
                                Укажите топик
                            </InputLabel>
                            <TextField
                                id={`${functionModel.id}_topic`}
                                label="Топик"
                                variant="outlined"
                                value={functionModel.topic}
                                onChange={topicInputHandler}
                                size="small"
                                disabled={functionModel.isFetching}
                            />
                        </div>
                    )}
                    <div className="data-item__content">
                        <InputLabel id={`${functionModel.id}_payload`}>
                            Payload
                        </InputLabel>
                        <TextField
                            id={`${functionModel.id}_payload`}
                            variant="outlined"
                            value={functionModel.payload}
                            onChange={payloadInputHandler}
                            size="small"
                        />
                    </div>
                </div>
            </div>
        );
    },
);

type PropsType = {
    sensorDataList: SensorData[];
    functionModel: FunctionModel;
};
