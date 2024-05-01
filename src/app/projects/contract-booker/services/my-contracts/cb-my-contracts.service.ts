import { CbDbMyContractsService } from '../my-db-contracts/cb-db-my-contracts.service';
import { cbToastHelpers } from '../../helpers/cb-toast-helpers';
import { CbReturnStatus } from '../../models/cb-return-status';
import { CbToastService } from '../toast/cb-toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CbMyContractsService {

    myContracts: BehaviorSubject<Contract[]> = new BehaviorSubject<Contract[]>([]);

    /** @description Create a copy of the contracts using spread syntax for immutability */
    get allMyContracts(): Contract[] {
        return [...this.myContracts.getValue()];
    }

    constructor(
        private _cbToastService: CbToastService,
        private _translateService: TranslateService,
        private _cbDbMyContractsService: CbDbMyContractsService,
    ) { }

    async loadAllSavedContracts(): Promise<Contract[] | undefined> {
        return await new Promise(async (resolve, reject) => {
            try {
                const response = await this._cbDbMyContractsService.getAll();

                if (response?.length > 0 ) {
                    this.myContracts.next(response);
                }

                resolve(response);
            } catch (error) {
                this._cbToastService.showToast({
                    id: cbToastHelpers.couldNotLoadSavedContracts,
                    header: this._translateService.instant('CORE.ERROR'),
                    message: this._translateService.instant('CB.MY_CONTRACTS.ERROR_LOADING_SAVED_CONTRACTS'),
                })
                reject(this.allMyContracts);
            }
        });
    }

    async saveContract(contract: Contract): Promise<boolean | null> {
        const saveSuccess = await this._cbDbMyContractsService.set(contract);
        if (saveSuccess) {
            await this.myContracts.next([...this.myContracts.getValue(), contract]);
        }

        return saveSuccess;
    }

    deleteMyContractById(myContract: Contract) {
        const cbReturnStatus = new CbReturnStatus({
            success: false,
            message: this._translateService.instant('CB.MY_CONTRACT.CANT_REMOVE_SAVED_CONTRACT', {
                contractId: myContract.id,
                error: JSON.stringify(myContract)
            })
        });

        try {
            const indexToRemove = this.allMyContracts.findIndex((c) => c.id === myContract.id);

            if (indexToRemove >= 0) {
                const updatedContracts = this.allMyContracts.filter((_, index) => index !== indexToRemove);
                this.myContracts.next(updatedContracts);

                cbReturnStatus.success = true;
                cbReturnStatus.message = this._translateService.instant('CB.MY_CONTRACT.CONTRACT_SAVED_REMOVED');
            } else {
                cbReturnStatus.message = this._translateService.instant('CB.MY_CONTRACT.CONTRACT_SAVED_NOT_FOUND')
            }
        } catch (error) {
            cbReturnStatus.message = this._translateService.instant('CB.MY_CONTRACT.CANT_REMOVE_SAVED_CONTRACT', {
                contractId: myContract.id,
                error: `Error: ${JSON.stringify(myContract)} ${error}`
            });
        }

        return cbReturnStatus;
    }
}
