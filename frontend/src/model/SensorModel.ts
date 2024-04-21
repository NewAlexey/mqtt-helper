export class SensorModel {
    public id: number;
    public name: string;
    public description: string;
    public topic: string;
    public currentValue: number | null;
    public verificationValue: number;
    public secondVerificationValue: number;
    public status: string;
    public unit: string;
    public createdAt: Date;
    public updatedAt: Date;
    public equipmentComplexId: null | number;

    constructor(props: SensorModel) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.topic = props.topic;
        this.currentValue = props.currentValue;
        this.verificationValue = props.verificationValue;
        this.secondVerificationValue = props.secondVerificationValue;
        this.status = props.status;
        this.unit = props.unit;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.equipmentComplexId = props.equipmentComplexId;
    }
}
