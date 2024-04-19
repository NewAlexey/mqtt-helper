import { makeAutoObservable } from "mobx";

import { FunctionModel } from "src/store/FunctionModel.ts";

const mockFunctionModel = new FunctionModel({ id: "15", topic: "AAAAA" });

export class FunctionModelListStore {
    public modelList: FunctionModel[] = [mockFunctionModel];

    constructor() {
        makeAutoObservable(this);
    }

    public addNewModel = () => {
        this.modelList.push(
            new FunctionModel({
                id: String(new Date().getTime()),
                topic: "",
            }),
        );
    };

    public removeModel = (id: string) => {
        this.modelList = this.modelList.filter(
            (functionModel) => functionModel.id !== id,
        );
    };
}
