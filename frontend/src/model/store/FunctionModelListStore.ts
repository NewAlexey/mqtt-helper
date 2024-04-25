import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

import { FunctionModelStore } from "src/model/store/FunctionModelStore.ts";
import { BackendApiService } from "src/service/BackendApiService.ts";
import { SensorModel } from "src/model/SensorModel.ts";
import { FunctionModel } from "src/model/FunctionModel.ts";
import { DeviceModel } from "src/model/DeviceModel.ts";
import FunctionStore from "src/store/FunctionStore.ts";

export class FunctionModelListStore {
    public sensorDataList: SensorData[] = [];
    public deviceDataList: DeviceData[] = [];
    public modelList: FunctionModelStore[] = [];

    private readonly backendApiService = new BackendApiService();

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    public addNewModel = () => {
        this.modelList.push(new FunctionModelStore({}));
        this.onSaveFunctionDate();
    };

    public removeModel = (id: string) => {
        this.modelList = this.modelList.filter(
            (functionModelStore) => functionModelStore.functionData.id !== id,
        );
        this.onSaveFunctionDate();
        toast.success("Функция удалена.");
    };

    public saveFunctionData = (id: string) => {
        const updatedFunctionData = this.modelList.find(
            (model) => model.functionData.id === id,
        );

        if (!updatedFunctionData) {
            return;
        }

        this.onSaveFunctionDate();
        updatedFunctionData.onSaveFunctionData();
        toast.success(
            `Данные функции "${updatedFunctionData.functionData.title}" сохранены.`,
        );
    };

    private onSaveFunctionDate() {
        const functionDataList = this.modelList.map<FunctionModel>((model) => ({
            ...model.functionData,
        }));
        FunctionStore.saveData({ functionList: functionDataList });
    }

    private async init() {
        await this.getSensorList();
        await this.getDeviceList();
        await this.getFunctionDataList();
    }

    private async getFunctionDataList() {
        try {
            const storeData = FunctionStore.getData();

            if (!storeData) {
                return;
            }

            this.modelList = storeData.functionList.map(
                (functionItem) => new FunctionModelStore(functionItem),
            );
        } catch (error) {
            toast.error("Не удалось загрузить сохранённые функции.");
            console.log("getFunctionDataList", error);
        }
    }

    private async getSensorList() {
        try {
            const sensors = await this.backendApiService.getSensorList();

            runInAction(() => {
                this.sensorDataList = sensors.map<SensorData>(
                    ({ id, topic, description }) => ({
                        id,
                        topic,
                        description,
                    }),
                );
            });
            toast.success("Список сенсоров загружен.");
        } catch (error) {
            toast.error("Не удалось загрузить список сенсоров.");
            console.log("getSensorList", error);
        }
    }

    private async getDeviceList() {
        try {
            const device = await this.backendApiService.getDeviceList();

            runInAction(() => {
                this.deviceDataList = device.map<DeviceData>(
                    ({ id, topic, description }) => ({
                        id,
                        topic,
                        description,
                    }),
                );
            });
            toast.success("Список устройств загружен.");
        } catch (error) {
            toast.error("Не удалось загрузить список устройств.");
            console.log("getDeviceList", error);
        }
    }
}

export type SensorData = Pick<SensorModel, "id" | "description" | "topic">;
export type DeviceData = Pick<DeviceModel, "id" | "description" | "topic">;
