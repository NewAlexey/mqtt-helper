/**
 * Сервис для взаимодействия с браузерным "localStorage".
 */
export class LocalStorageApi<D> {
    /**
     * Ключ для взаимодействия с полем в "LocalStorageApi".
     */
    private readonly key: string;

    /**
     * Конструктор создания класса "LocalStorageApi".
     *
     * @param key ключ взаимодействия с полем "LocalStorageApi".
     */
    constructor(key: string) {
        this.key = key;
    }

    /**
     * Метод для сохранения данных в "localStorage".
     *
     * @param data данные для сохранения в "localStorage".
     */
    public saveData(data: D) {
        window.localStorage.setItem(this.key, JSON.stringify(data));
    }

    /**
     * Метод для получения данных из "localStorage".
     *
     * @return возвращает либо null, если данные в "localStorage" по ключу "key" отсутствуют,
     * либо данные, преобразованные в объект из строки методом JSON.parse.
     */
    public getData(): D | null {
        const data = window.localStorage.getItem(this.key);

        return data ? JSON.parse(data) : data;
    }

    /**
     * Метод для удаления данных из "localStorage".
     */
    public removeData(): void {
        window.localStorage.removeItem(this.key);
    }
}
