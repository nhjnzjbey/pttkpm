import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { Post } from './model/post.model';
import { Item } from './model/item.model';
import { UploadService } from '../../service/user/upload.service';

@Component({
    selector: 'app-upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.css']
})

export class UploadComponent implements OnInit {
    post: Post;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private uploadService: UploadService
    ) { }

    ngOnInit(): void {
        this.post = new Post();
    }

    onSelectFile(event): void {
        this.post.items = this.uploadService.createItem(event.srcElement.files);
    }

    onClickUpload(): void {
        console.log('submit upload');
        this.uploadService.submitUpload(this.post)
                            .subscribe(post => {
                                console.log('this is subcriber post');
                                console.log(post);
                            });
    }


}
