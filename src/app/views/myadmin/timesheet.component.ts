import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import {
    startOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
    addHours
} from 'date-fns';

import { CalendarEvent, CalendarEventAction, CalendarDateFormatter, DAYS_OF_WEEK } from 'angular-calendar';

const colors: any = {
    red: {
        primry: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    templateUrl: 'timesheet.component.html',
    styleUrls: ['../../../scss/vendors/angular-calendar/angular-calendar.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimesheetComponent {
    view = 'week';

    viewDate: Date = new Date();

    locale = 'fr';

    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

    actions: CalendarEventAction[] = [{
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
        }
    }, {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
        }
    }];

    events: CalendarEvent[] = [
        {
            start: addHours(startOfDay(new Date()), 5),
            end: addHours(startOfDay(new Date()), 17),
            title: 'Alehos',
            color: colors.red,
            actions: this.actions
        },
        {
            start: addHours(startOfDay(new Date()), 5),
            end: addHours(startOfDay(new Date()), 17),
            title: 'Event 1',
            color: colors.red
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions
        }, {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue
        }];

    activeDayIsOpen = true;

    increment(): void {

        const addFn: any = {
            day: addDays,
            week: addWeeks,
            month: addMonths
        }[this.view];

        this.viewDate = addFn(this.viewDate, 1);

    }

    decrement(): void {

        const subFn: any = {
            day: subDays,
            week: subWeeks,
            month: subMonths
        }[this.view];

        this.viewDate = subFn(this.viewDate, 1);

    }

    today(): void {
        this.viewDate = new Date();
    }

    dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }
}
