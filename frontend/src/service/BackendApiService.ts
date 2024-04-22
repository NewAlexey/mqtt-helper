import { SensorModel } from "src/model/SensorModel.ts";

export class BackendApiService {
    private readonly AGROSTAB_BACKEND_API_URL =
        process.env.AGROSTAB_BACKEND_API_URL;
    private readonly AGROSTAB_BACKEND_API_SENSOR_URL_PATH = "sensors";

    private readonly BACKEND_SENSOR_URL = `${this.AGROSTAB_BACKEND_API_URL}/${this.AGROSTAB_BACKEND_API_SENSOR_URL_PATH}`;

    public async getSensorList(): Promise<SensorModel[]> {
        const response: Response = await fetch(this.BACKEND_SENSOR_URL);

        if (!response.ok) {
            throw new Error("Не удалось загрузить список сенсоров.");
        }

        return await response.json();
    }
}
