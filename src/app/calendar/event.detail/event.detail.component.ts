import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { EventCalendar } from '../model/event.model';
import { CalendarService } from '../../service/calendar/calendar.service';

@Component({
    selector: 'app-event-detail',
    templateUrl: 'event.detail.component.html',
    styleUrls: ['event.detail.component.scss']
})

export class EventDetailComponent {

    event: EventCalendar;

    timeBegin: any;
    timeEnd: any;
    fromDate: Date;
    toDate: Date;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private calendarService: CalendarService,
        public bottomSheetRef: MatBottomSheetRef<EventDetailComponent>
    ) {
        this.event = Object.assign({}, data.event);
        this.fromDate = data.fromDate;
        this.toDate = data.toDate;

        const begin = this.calendarService.convertNumberRowToTime(this.event.time.pointBegin);
        this.timeBegin = begin.hour + ':' + begin.minute;

        const end = this.calendarService.convertNumberRowToTime(this.event.time.pointEnd);
        this.timeEnd = end.hour + ':' + end.minute;
    }

    onClickSubmit() {
        // this.data = this.event;
        const dateSelected = this.event.time.date;
        this.event.time.pointBegin.row = this.calendarService.convertTimeStringToNumberRow(this.timeBegin);
        this.event.time.pointEnd.row = this.calendarService.convertTimeStringToNumberRow(this.timeEnd);
        const time = this.calendarService.calculateTimeBetweenPoint(this.event.time.pointBegin, this.event.time.pointEnd);
        time.date = dateSelected;
        this.event.time = time;
        this.bottomSheetRef.dismiss(this.event);
        event.preventDefault();
    }

    onClickCancel(event: MouseEvent) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

}
