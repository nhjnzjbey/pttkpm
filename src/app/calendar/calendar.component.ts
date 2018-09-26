import { Component, OnInit } from '@angular/core';
import { EventCalendar } from './model/event.model';
import { CalendarService } from '../service/calendar/calendar.service';
import { Item } from '../user/upload/model/item.model';
import { MatBottomSheet } from '@angular/material';
import { EventDetailComponent } from './event.detail/event.detail.component';
import CollectionUtil from '../util/collection.util';
import DateTimeUtil from '../util/datetime.util';

@Component({
    selector: 'app-calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.css']
})

export class CalendarComponent implements OnInit {
    events: EventCalendar[];
    dates: Date[];
    rangeHour: any;

    constructor(
        private calendarService: CalendarService,
        private bottomSheet: MatBottomSheet
    ) { }

    ngOnInit(): void {
        this.events = [];
        this.dates = [];
        this.rangeHour = [];

        for (let index = 0; index < 7; index++) {
            const date = new Date();
            date.setDate(date.getDate() + index);
            this.dates.push(date);
        }

        for (let index = 0; index < 48; index++) {
            this.rangeHour.push(index);
        }

    }

    private updateEventAfterDropping(event: EventCalendar, elementSelected): void {
        const differentRow = event.time.pointEnd.row - event.time.pointBegin.row;
        event.elementDropped = elementSelected;
        this.calendarService.calculatePosition(event);

        const col = parseInt(elementSelected.getAttribute('data-col'), 10);
        const rowBegin = parseInt(elementSelected.getAttribute('data-row'), 10);
        const time = this.calendarService.createTime(col, rowBegin, rowBegin + differentRow);
        time.date = this.dates[col];
        event.time = time;
    }

    private addEvent(item, elementSelected): void {
        const event = new EventCalendar();
        event.data = item;
        event.elementDropped = elementSelected;
        this.calendarService.calculatePosition(event);

        const col = parseInt(elementSelected.getAttribute('data-col'), 10);
        const rowBegin = parseInt(elementSelected.getAttribute('data-row'), 10);
        const time = this.calendarService.createTime(col, rowBegin, rowBegin + 1);
        time.date = this.dates[col];

        event.time = time;
        this.events.push(event);
    }

    private updateEventAfterChangingDetail(event: EventCalendar): void {
        if (!event) {
            return;
        }
        for (let i = 0; i < this.dates.length; i++) {
            const element = this.dates[i];
            if (DateTimeUtil.compareWithoutTime(element, event.time.date) === 0) {
                event.time.pointBegin.col = i;
                event.time.pointEnd.col = i;
                break;
            }
        }
    }


    onDragDrop(event): void {
        if (event.dragData instanceof Item) {
            this.addEvent(event.dragData, event.mouseEvent.target);
        } else if (event.dragData instanceof EventCalendar) {
            this.updateEventAfterDropping(event.dragData, event.mouseEvent.target);
        }
    }

    onClickModifyEvent(index: number): void {
        const event = this.events[index];
        const eventDetail = this.bottomSheet.open(EventDetailComponent, {
            data: {
                'event': event,
                'fromDate': this.dates[0],
                'toDate': CollectionUtil.getLastElement(this.dates),
            },
        });
        eventDetail.afterDismissed().subscribe((data: EventCalendar) => this.updateEventAfterChangingDetail(data));
    }

}
