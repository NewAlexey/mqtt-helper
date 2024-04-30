import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
    DeviceData,
    SensorData,
} from "src/model/store/FunctionModelListStore.ts";
import { ErrorDataType } from "src/view/pages/Testing/component/FunctionItem/useErrorData.ts";
import { FunctionTopicMode } from "src/model/FunctionModel.ts";

export const TopicData = observer(
    ({
        topic,
        isFetching,
        topicError,
        topicMode,
        setErrorData,
        onChangeTopic,
        deviceDataList,
        sensorDataList,
        onChangeTopicMode,
    }: PropsType) => {
        return (
            <div className="data-item__content">
                <RadioGroup
                    row
                    aria-labelledby="topic-radio-buttons-group-label"
                    name="topic-radio-buttons-group"
                    onClick={(event) => {
                        if (!(event.target instanceof HTMLInputElement)) {
                            return;
                        }

                        onChangeTopicMode(
                            event.target.value as FunctionTopicMode,
                        );
                    }}
                >
                    {functionTopicItemList.map((item) => (
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                            checked={item.value === topicMode}
                        />
                    ))}
                </RadioGroup>

                <InputLabel id="topic-selector" error={Boolean(topicError)}>
                    Задайте топик
                </InputLabel>

                {topicMode === "custom" && (
                    <TextField
                        id="topic-selector"
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
                        className="topic-selector"
                        disabled={isFetching}
                    />
                )}

                {topicMode === "device" && (
                    <Select
                        size="small"
                        labelId="topic-selector"
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
                        className="topic-selector"
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
                        {deviceDataList.map((deviceData) => (
                            <MenuItem
                                key={deviceData.id}
                                value={deviceData.topic}
                            >
                                {deviceData.description}
                                {"\u00A0"}||{"\u00A0"}
                                <strong>{deviceData.topic}</strong>
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </div>
        );
    },
);

type PropsType = {
    id: string;
    topic: string;
    topicMode: FunctionTopicMode;
    topicError: string;
    isFetching: boolean;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    onChangeTopicMode: (topicMode: FunctionTopicMode) => void;
    onChangeTopic: (topic: string) => void;
    sensorDataList: SensorData[];
    deviceDataList: DeviceData[];
};

const functionTopicItemList: { value: FunctionTopicMode; label: string }[] = [
    { value: "device", label: "Сенсор/датчик" },
    { value: "custom", label: "Кастомный" },
];
