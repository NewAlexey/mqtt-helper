import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./style.scss";

import { FunctionItem } from "src/view/pages/Testing/component/FunctionItem/FunctionItem.tsx";
import { FunctionModelListStore } from "src/model/store/FunctionModelListStore.ts";

const FunctionModelsStore = new FunctionModelListStore();

export const FunctionModelsContainer = observer(() => {
    return (
        <div className="functions__container">
            <Typography variant="h2" fontSize={25} fontWeight={400}>
                Список функций
            </Typography>
            <Button
                className="right-alignment"
                onClick={() => FunctionModelsStore.addNewModel()}
                variant="contained"
            >
                Добавить функцию
            </Button>
            <div className="functions__content">
                {FunctionModelsStore.modelList.map((functionStore) => (
                    <FunctionItem
                        key={functionStore.functionData.id}
                        functionStore={functionStore}
                        sensorDataList={FunctionModelsStore.sensorDataList}
                        deviceDataList={FunctionModelsStore.deviceDataList}
                        saveFunctionModel={FunctionModelsStore.saveFunctionData}
                        removeFunctionModel={FunctionModelsStore.removeModel}
                    />
                ))}
            </div>
        </div>
    );
});
