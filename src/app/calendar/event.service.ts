import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class EventSesrvice {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01'
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-09T16:00:00',
            backgroundColor: '#f39c12', //yellow
            borderColor: '#f39c12' //yellow
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: yearMonth + '-16T16:00:00',
            backgroundColor: '#f56954', //red
            borderColor: '#f56954' //red
        },
        {
            title: 'Conference',
            start: yearMonth + '-11',
            end: yearMonth + '-13',
            backgroundColor: '#f39c12', //yellow
            borderColor: '#f39c12' //yellow
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T10:30:00',
            end: yearMonth + '-12T12:30:00',
            backgroundColor: '#0073b7', //Blue
            borderColor: '#0073b7' //Blue
        },
        {
            title: 'Lunch',
            start: yearMonth + '-12T12:00:00',
            backgroundColor: '#0073b7', //Blue
            borderColor: '#0073b7' //Blue
        },
        {
            title: 'Meeting',
            start: yearMonth + '-12T14:30:00',
            backgroundColor: '#00a65a', //Success (green)
            borderColor: '#00a65a' //Success (green)
        },
        {
            title: 'Happy Hour',
            start: yearMonth + '-12T17:30:00',
            backgroundColor: '#00a65a', //Success (green)
            borderColor: '#00a65a' //Success (green)
        },
        {
            title: 'Dinner',
            start: yearMonth + '-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: yearMonth + '-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28',
            backgroundColor: '#00a65a', //Success (green)
            borderColor: '#00a65a' //Success (green)
        }];
        return Observable.of(data);
    }
}
