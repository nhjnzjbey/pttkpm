export default class DateTimeUtil {

    /**
     * return current date time as milisecond
     */
    static now() {
        return Math.round(new Date().getTime() / 1000.0);
    }

    /**
     * return object containing only Hour and Minute from string 'hh:mm'
     * @param time
     */
    static getTimeDetail(time: string) {
        const splitted = time.split(':');
        return {
            'hour': parseInt(splitted[0], 10),
            'minute': parseInt(splitted[1], 10)
        };

    }

    /**
     * compare two date by setting time to zero
     * https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
     * @param date1
     * @param date2
     */
    static compareWithoutTime(date1: Date, date2: Date): number {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        return date1.getTime() - date2.getTime();
    }

}

