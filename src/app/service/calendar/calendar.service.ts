import { Injectable } from '@angular/core';
import { EventCalendar } from '../../calendar/model/event.model';
import { Position } from '../../calendar/model/position.model';
import { TimeCalendar } from '../../calendar/model/time.model';
import { Point } from '../../calendar/model/point.model';
import DateTimeUtil from '../../util/datetime.util';

@Injectable()
export class CalendarService {

    calculatePosition(event: EventCalendar) {
        const elementDropped = event.elementDropped;
        const position = new Position();
        position.width = elementDropped.offsetWidth;
        position.height = elementDropped.offsetHeight;
        position.top = elementDropped.offsetTop;
        position.left = elementDropped.offsetLeft;
        position.firstLeft = position.left - position.width * Math.floor(position.left / position.width);

        event.position = position;
    }

    createTime(col: number, rowBegin: number, rowEnd: number): TimeCalendar {

        const pointBegin = new Point();
        pointBegin.col = col;
        pointBegin.row = rowBegin;

        const pointEnd = new Point();
        pointEnd.col = col;
        pointEnd.row = rowEnd;

        return this.calculateTimeBetweenPoint(pointBegin, pointEnd);
    }

    calculateTimeBetweenPoint(begin: Point, end: Point): TimeCalendar {
        const time = new TimeCalendar();
        time.pointBegin = begin;
        time.pointEnd = end;

        const timeBegin = this.convertNumberRowToTime(begin);
        time.hourBegin = timeBegin.hour;
        time.minuteBegin = timeBegin.minute;

        const timeEnd = this.convertNumberRowToTime(end);
        time.hourEnd = timeEnd.hour;
        time.minuteEnd = timeEnd.minute;
        return time;
    }

    convertNumberRowToTime(point: Point): any {
        const hour = Math.floor(point.row / 2);
        return {
            'hour': hour < 10 ? '0' + hour : hour,
            'minute': point.row % 2 === 0 ? '00' : '30'
        };
    }

    convertTimeStringToNumberRow(timeStr: string): number {
        const time = DateTimeUtil.getTimeDetail(timeStr);
        return time.hour * 2 + (time.minute === 30 ? 1 : 0);
    }

}

