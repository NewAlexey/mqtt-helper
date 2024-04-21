import { SensorModel } from "src/model/SensorModel.ts";

export class BackendApiService {
    private readonly BACKEND_API_URL = process.env.BACKEND_API_URL;
    private readonly BACKEND_API_SENSOR_URL_PATH = "sensors";

    private readonly BACKEND_SENSOR_URL = `${this.BACKEND_API_URL}/${this.BACKEND_API_SENSOR_URL_PATH}`;

    public async getSensorList(): Promise<SensorModel[]> {
        const response: Response = await fetch(this.BACKEND_SENSOR_URL);

        if (!response.ok) {
            throw new Error("Не удалось загрузить список сенсоров.");
        }

        return await response.json();
    }
}
