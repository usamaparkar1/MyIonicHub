import termsAndConditionsJson from 'src/assets/json-data/projects/contract-booker/terms-and-conditions.json';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CbContractService } from '../../services/contract/cb-contract.service';
import { CbRoutingService } from '../../services/routing/cb-routing.service';
import { CbAlertService } from '../../services/alert/cb-alert.service';
import { CbAlertHelpers } from '../../helpers/cb-alert-helpers';
import { CbReturnStatus } from '../../models/cb-return-status';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from '../../models/cb-contract';
import { ActivatedRoute } from '@angular/router';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-cb-sign-contract',
    templateUrl: './cb-sign-contract.page.html',
    styleUrls: ['./cb-sign-contract.page.scss'],
})

export class CbSignContractPage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('signaturePadCanvas', { static: true }) signaturePadElement!: ElementRef;

    signaturePad!: SignaturePad;
    contract!: Contract;
    tncRead: boolean = false;
    termsAndConditions: string[] = termsAndConditionsJson.termsAndConditions;
    
    constructor(
        private _route: ActivatedRoute,
        private _cbAlertService: CbAlertService,
        private _translateService: TranslateService,
        private _cbRoutingService: CbRoutingService,
        private _cbContractService: CbContractService,
    ) { }

    ngOnInit() {
        this._setupContractSignature();
    }

    ngAfterViewInit() {
        this._setupSignatureCanvas();
    }

    ngOnDestroy(): void {
        window.removeEventListener("resize", this.resizeCanvas);
    }

    private async _setupContractSignature() {
        this.contract = this._route.snapshot.data['contract'];

        if (!this.contract){
            this._cbAlertService.showAlertForContractDataNotFound('Contract');
        }
    }

    private _setupSignatureCanvas() {
        const cbPrimaryColor = getComputedStyle(document.body).getPropertyValue('--ion-color-cbprimary').trim();

        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
            penColor: cbPrimaryColor
        });
        window.addEventListener("resize", this.resizeCanvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        var width = this.signaturePadElement.nativeElement.width;
        var height = this.signaturePadElement.nativeElement.height;
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        if (ratio <= 2) {
            this.signaturePadElement.nativeElement.width = width * ratio / 2;
            this.signaturePadElement.nativeElement.height = height * ratio;
            this.signaturePadElement.nativeElement.getContext("2d").scale(1, 1);
            this.signaturePad.clear();
        }
    }

    clearSignature() {
        this.signaturePad.clear();
    }
    
    canSignContract(): boolean {
        return false;
    }

    saveSignature() {
        const isValidSignature = this.validateSignatureLength();

        if (isValidSignature.success) {
            this._cbContractService.storeContractSignature(this.contract, this.signaturePad.toDataURL());
            this._cbRoutingService.goToCbShoppingCart();
        } else {
            this._cbAlertService.showAlert(
                CbAlertHelpers.invalidSignature,
                this._translateService.instant('CB.SIGN_CONTRACT.INVALID_SIGNATURE'),
                isValidSignature.message
            );
        }
    }

    validateSignatureLength(): CbReturnStatus {
        const points = this.signaturePad.toData();

        if (!points) {
            return new CbReturnStatus({
                success: false,
                message: this._translateService.instant('CB.SIGN_CONTRACT.INVALID_SIGNATURE_IMAGE'),
            });
        }

        const pointsCount = points.reduce((acc, cur) => acc + cur.points.length, 0);
        const isValidSignature = 50 <= pointsCount && pointsCount <= 250;

        return new CbReturnStatus({
            success: isValidSignature,
            message: isValidSignature
            ? this._translateService.instant('CB.SIGN_CONTRACT.VALID_SIGNATURE')
            : pointsCount < 50
            ? this._translateService.instant('CB.SIGN_CONTRACT.SIGNATURE_LENGTH_SHORT')
            : this._translateService.instant('CB.SIGN_CONTRACT.SIGNATURE_LENGTH_LONG')
        });
    }

    tncCheckboxClicked() {
        this.tncRead != this.tncRead;
    }
}
