import { makeAutoObservable } from "mobx";

export class FunctionModel {
    public id: string;
    public topic: string;

    constructor({ id, topic }: ConstructorPropsType) {
        this.id = id;
        this.topic = topic;
        makeAutoObservable(this);
    }

    public onChangeTopic(value: string): void {
        this.topic = value;
    }
}

type ConstructorPropsType = {
    id: string;
    topic: string;
};
