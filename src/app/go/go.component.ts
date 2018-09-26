import { Component, OnInit } from '@angular/core';
import { Item } from '../user/upload/model/item.model';
import { Address } from '../user/upload/model/address.model';

@Component({
    selector: 'app-go',
    templateUrl: 'go.component.html',
    styleUrls: ['go.component.css']
})

export class GoComponent implements OnInit {

    items: Item[];

    ngOnInit(): void {
        this.items = [];
        for (let index = 0; index < 20; index++) {
            const item = new Item();
            item.id = index.toString();
            item.name = 'name ' + index;
            item.description = 'description ' + index;
            item.urlFile = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
            item.address = new Address();
            item.address.full = '7 Ngô Quyền, Trần Hưng Đạo, Thành phố Qui Nhơn, Bình Định, Vietnam';
            item.address.urlSearch = 'https://www.google.fr/';
            this.items.push(item);
        }

    }

}
