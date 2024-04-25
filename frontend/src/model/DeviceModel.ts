export class DeviceModel {
    public id: number;
    public name: string;
    public description: string;
    public topic: string;
    public currentValue: number | null;
    public status: string;
    public type: string;
    public createdAt: Date;
    public updatedAt: Date;
    public equipmentComplexId: null | number;

    constructor(props: DeviceModel) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.topic = props.topic;
        this.currentValue = props.currentValue;
        this.status = props.status;
        this.type = props.type;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.equipmentComplexId = props.equipmentComplexId;
    }
}
