import { LocalStorageApi } from "src/integration/LocalStorageApi.ts";
import { FunctionModel } from "src/model/FunctionModel.ts";

type StoreType = {
    functionList: FunctionModel[];
};

const FunctionStore = new LocalStorageApi<StoreType>("mqtt-stub-data");

export default FunctionStore;
