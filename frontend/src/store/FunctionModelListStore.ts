import { makeAutoObservable, runInAction } from "mobx";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { BackendApiService } from "src/service/BackendApiService.ts";
import { SensorModel } from "src/model/SensorModel.ts";

const mockFunctionModel = new FunctionModel({
    id: "15",
    topic: "",
    payload: "",
});

export class FunctionModelListStore {
    public sensorDataList: SensorData[] = [];
    public modelList: FunctionModel[] = [mockFunctionModel];

    private readonly backendApiService = new BackendApiService();

    constructor() {
        makeAutoObservable(this);
        this.getSensorList();
    }

    public addNewModel = () => {
        this.modelList.push(
            new FunctionModel({
                id: String(new Date().getTime()),
                topic: "",
                payload: "",
            }),
        );
    };

    public removeModel = (id: string) => {
        this.modelList = this.modelList.filter(
            (functionModel) => functionModel.id !== id,
        );
    };

    private async getSensorList() {
        try {
            const sensors = await this.backendApiService.getSensorList();

            runInAction(() => {
                this.sensorDataList = sensors.map<SensorData>((sensor) => ({
                    id: sensor.id,
                    topic: sensor.topic,
                    description: sensor.description,
                }));
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export type SensorData = Pick<SensorModel, "id" | "description" | "topic">;
