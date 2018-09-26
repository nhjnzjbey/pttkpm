import { Component, ViewChild, NgZone, ElementRef, AfterViewInit, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Item } from './model/item.model';


@Component({
    selector: 'app-upload-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css']
})


export class ItemComponent implements AfterViewInit {
    @Input()
    item: Item;

    @ViewChild('searchFormAddress')
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }

    ngAfterViewInit() {
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.item.address.latitude = place.geometry.location.lat();
                    this.item.address.longtitude = place.geometry.location.lng();
                    this.item.address.full = place.formatted_address;
                    this.item.address.urlSearch = place.url;
                });
            });
        });
    }

}
