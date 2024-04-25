import { SensorModel } from "src/model/SensorModel.ts";
import { DeviceModel } from "src/model/DeviceModel.ts";

export class BackendApiService {
    private readonly BACKEND_SENSOR_URL = `${process.env.BACKEND_AGROSTUB_URL}/sensors`;
    private readonly BACKEND_DEVICE_URL = `${process.env.BACKEND_AGROSTUB_URL}/devices`;

    public async getSensorList(): Promise<SensorModel[]> {
        const response: Response = await fetch(this.BACKEND_SENSOR_URL);

        if (!response.ok) {
            throw new Error("Не удалось загрузить список сенсоров.");
        }

        return await response.json();
    }

    public async getDeviceList(): Promise<DeviceModel[]> {
        const response: Response = await fetch(this.BACKEND_DEVICE_URL);

        if (!response.ok) {
            throw new Error("Не удалось загрузить список устройств.");
        }

        return await response.json();
    }
}
