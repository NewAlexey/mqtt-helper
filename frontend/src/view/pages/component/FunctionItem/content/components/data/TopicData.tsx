import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";

import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import TextField from "@mui/material/TextField";

import { SensorData } from "src/store/FunctionModelListStore.ts";

export const TopicData = observer(
    ({ id, topic, sensorDataList, onChangeTopic, isFetching }: PropsType) => {
        return sensorDataList.length ? (
            <div className="data-item__content">
                <InputLabel id="select_sensor-data">Сенсор (топик)</InputLabel>
                <Select
                    size="small"
                    labelId="select_sensor-data"
                    disabled={isFetching}
                    value={topic}
                    onChange={(event: SelectChangeEvent) =>
                        onChangeTopic(event.target.value)
                    }
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
                <InputLabel id={`${id}_topic`}>Укажите топик</InputLabel>
                <TextField
                    id={`${id}_topic`}
                    label="Топик"
                    variant="outlined"
                    value={topic}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChangeTopic(event.target.value)
                    }
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
    isFetching: boolean;
    onChangeTopic: (topic: string) => void;
    sensorDataList: SensorData[];
};
