import config from '../config/config.json';
import moment from 'moment';

export const CheckBusinessHours = (currentInputValue) => {
    const date = moment(new Date(currentInputValue));
    let inBusinessHours = false;
    let nextWorkDay = '';

    if (date._isValid) {
        const mappedDay = GetMappedWeekday(date);
        inBusinessHours = CheckWorkDay(mappedDay) && CheckWorkHours(date, mappedDay);

        if (!inBusinessHours) {
            nextWorkDay = GetNextWorkDay(date);
        }
    }

    return `${inBusinessHours}${nextWorkDay}`;
}

const GetMappedWeekday = (date) => {
    const weekdayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return weekdayMap[date.day()];
}

const CheckWorkDay = (mappedDay) => {
    return config.work_week.some(day => day === mappedDay);
}

const CheckWorkHours = (date, mappedDay) => {
    const businessHours = config.work_hours[mappedDay];

    const inputTime = moment(date, 'HH:mm:ss').format('HH:mm:ss');
    const openTime = moment(businessHours[0], 'HH:mm:ss').format('HH:mm:ss');
    const closeTime = moment(businessHours[1], 'HH:mm:ss').format('HH:mm:ss');

    return inputTime >= openTime && inputTime <= closeTime;
}

const GetNextWorkDay = (date) => {
    let daysToAdd = 1;
    let nextWorkDayFound = false;

    while (!nextWorkDayFound) {
        let nextWorkDay = moment(date).add(daysToAdd, 'days').format('YYYY-MM-DD');
        let mappedDay = GetMappedWeekday(moment(nextWorkDay));

        nextWorkDayFound = CheckWorkDay(mappedDay);
        daysToAdd += 1;

        return `, Next business day is "${nextWorkDay}"`;
    }
}