export class CbReturnStatus implements ICbReturnStatus {
    success: boolean;
    message: string;

    constructor(cbReturnStatus: CbReturnStatus) {
        this.success = cbReturnStatus.success;
        this.message = cbReturnStatus.message;
    }
}

interface ICbReturnStatus {
    success: boolean;
    message: string;
}