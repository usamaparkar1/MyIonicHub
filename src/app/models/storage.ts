export class StorageModel implements IStorageModel {
    keyName: string;
    value?: string | undefined;
  
    constructor(storageModel: StorageModel) {
        this.keyName = storageModel.keyName;
        this.value = storageModel?.value;
    }
}
  
export interface IStorageModel {
    keyName: string;
    value?: string | undefined;
}