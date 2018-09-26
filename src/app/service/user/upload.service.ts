import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../../user/upload/model/item.model';
import { Post } from '../../user/upload/model/post.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})

export class UploadService {

    private urlPost = 'http://localhost:8100/post/';

    constructor(
        private loginService: LoginService,
        private http: HttpClient,

    ) { }

    submitUpload(post: Post): Observable<Post> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const postSubmit = new Post();
        postSubmit.name = post.name;
        postSubmit.idUser = this.loginService.user.id;
        postSubmit.username = this.loginService.user.username;


        postSubmit.items = [];
        for (let index = 0; index < post.items.length; index++) {
            const element = post.items[index];
            const item = new Item();
            item.name = element.name;
            item.urlFile = element.urlFile;
            item.description = element.description;
            item.address = element.address;
            item.file = element.src.split(',')[1];
            item.type = element.type;
            postSubmit.items.push(item);
        }

        return this.http.post<Post>(this.urlPost, postSubmit, httpOptions)
            .pipe(
                tap((newPost: Post) => this.log('added post')),
                catchError(this.handleError<Post>('saving post'))
            );

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('Post Service: ' + message);
    }

    createItem(files): Item[] {
        const items = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const reader = new FileReader();
            this.readFile(file, reader, (result, f) => {
                const item = new Item();
                item.file = f;
                item.src = result;
                item.urlFile = f.name;
                items.push(item);
            });
        }
        return items;
    }


    readFile(file, reader, callback) {
        // Set a callback funtion to fire after the file is fully loaded
        reader.onload = () => {
            // callback with the results
            callback(reader.result, file);
        };

        // Read the file
        reader.readAsDataURL(file);
    }

}
