import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material";

import { SensorData } from "src/model/store/FunctionModelListStore.ts";
import { ErrorDataType } from "src/view/pages/Testing/component/FunctionItem/useErrorData.ts";

export const TopicData = observer(
    ({
        id,
        topic,
        isFetching,
        topicError,
        setErrorData,
        onChangeTopic,
        sensorDataList,
    }: PropsType) => {
        return sensorDataList.length ? (
            <div className="data-item__content">
                <InputLabel id="select_sensor-data" error={Boolean(topicError)}>
                    Сенсор (топик)
                </InputLabel>
                <Select
                    size="small"
                    labelId="select_sensor-data"
                    disabled={isFetching}
                    value={topic}
                    error={Boolean(topicError)}
                    onChange={(event: SelectChangeEvent) => {
                        onChangeTopic(event.target.value);
                        setErrorData((prevValue) => ({
                            ...prevValue,
                            topicError: "",
                        }));
                    }}
                    className="select_sensor-data"
                >
                    {sensorDataList.map((sensorData) => (
                        <MenuItem key={sensorData.id} value={sensorData.topic}>
                            {sensorData.description}
                            {"\u00A0"}||{"\u00A0"}
                            <strong>{sensorData.topic}</strong>
                        </MenuItem>
                    ))}
                </Select>
            </div>
        ) : (
            <div className="data-item__content">
                <InputLabel id={`${id}_topic`} error={Boolean(topicError)}>
                    Укажите топик
                </InputLabel>
                <TextField
                    id={`${id}_topic`}
                    label="Топик"
                    variant="outlined"
                    value={topic}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        onChangeTopic(event.target.value);
                        setErrorData((prevValue) => ({
                            ...prevValue,
                            topicError: "",
                        }));
                    }}
                    error={Boolean(topicError)}
                    size="small"
                    disabled={isFetching}
                />
            </div>
        );
    },
);

type PropsType = {
    id: string;
    topic: string;
    topicError: string;
    isFetching: boolean;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    onChangeTopic: (topic: string) => void;
    sensorDataList: SensorData[];
};
