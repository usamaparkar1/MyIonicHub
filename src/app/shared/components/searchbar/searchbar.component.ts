import { Observable, ObservableInput, combineLatest, map, startWith, of } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'hub-app-searchbar',
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss']
})

export class SearchbarComponent  implements OnInit {

    @Input() searchList!: string[];

    searchValue: FormControl = new FormControl('');
    searchResult$!: Observable<string[]>;
    
    constructor(
        private _modalController: ModalController
    ) {}

    ngOnInit() {
        this._loadSearchList();
    }

    private _loadSearchList() {
        const searchTerm$ = this.searchValue.valueChanges.pipe(startWith(this.searchValue.value));
        const searchList$: ObservableInput<string[]> = of(this.searchList);

        this.searchResult$ = combineLatest([searchList$, searchTerm$]).pipe(
            map(([searchList, searchTerm]) =>
                searchList.filter((searchList: string) => searchTerm === '' || searchList.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        );
    }

    selectSearchResult(value: string) {
        this._modalController.dismiss(value, 'confirm');
    }

}