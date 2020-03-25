import moment from 'moment';

// This function calls all relevant functions to get a output response
export const CheckBusinessHours = (currentInputValue, config) => {
    const date = moment(new Date(currentInputValue));
    let inBusinessHours = false;
    let nextOpenTime = '';
    
    if (date._isValid) {
        const { workWeek, workHours, publicHolidays, workBreaks } = config;
        const mappedDay = GetMappedWeekday(date);

        inBusinessHours = CheckWorkDay(mappedDay, workWeek)
            && CheckWorkHours(date, mappedDay, workHours)
            && !CheckPublicHolidays(date, publicHolidays);

        if (!inBusinessHours) {
            nextOpenTime = GetNextWorkDay(date, workWeek, publicHolidays);
        }
        else {
            nextOpenTime = GetNextOffBreakTime(date, mappedDay, workBreaks);

            if (nextOpenTime !== '') {
                inBusinessHours = false;
            }
        }
    }

    return `${inBusinessHours}${nextOpenTime}`;
}

// Maps the input date to a day string used in the config
const GetMappedWeekday = (date) => {
    const weekdayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return weekdayMap[date.day()];
}

// Checks if the input day is a work day
const CheckWorkDay = (mappedDay, workWeek) => {
    return workWeek.some(day => day === mappedDay);
}

// Checks if the input time falls within work hours
const CheckWorkHours = (date, mappedDay, workHours) => {
    const businessHours = workHours[mappedDay];

    const inputTime = moment(date, 'HH:mm:ss').format('HH:mm:ss');
    const openTime = moment(businessHours[0], 'HH:mm:ss').format('HH:mm:ss');
    const closeTime = moment(businessHours[1], 'HH:mm:ss').format('HH:mm:ss');

    return inputTime >= openTime && inputTime <= closeTime;
}

// Check if the input date falls on a public holiday
const CheckPublicHolidays = (date, publicHolidays) => {
    // Format the holidays for easier comparison later
    const formattedHolidays = publicHolidays.map(holiday => {
        return moment(new Date(holiday)).year(moment(date).year()).format('YYYY-MM-DD');
    })
    
    return formattedHolidays.some(holiday => holiday === moment(date).format('YYYY-MM-DD'));
}

// Loops to find the next valid work day
const GetNextWorkDay = (date, workWeek, publicHolidays) => {
    let daysToAdd = 1;
    let nextWorkDayFound = false;
    let nextWorkDay = '';

    // Keep adding 1 day until a valid work day is returned
    while (!nextWorkDayFound) {
        nextWorkDay = moment(date).add(daysToAdd, 'days').format('YYYY-MM-DD');
        let mappedDay = GetMappedWeekday(moment(nextWorkDay));

        nextWorkDayFound = CheckWorkDay(mappedDay, workWeek) && !CheckPublicHolidays(nextWorkDay, publicHolidays);
        daysToAdd += 1;
    }

    return `, Next business day is "${nextWorkDay}"`;
}

// Returns the next off break time, if required to
const GetNextOffBreakTime = (date, mappedDay, workBreaks) => {
    const breakTimes = workBreaks[mappedDay];
    let workBreaksResponse = '';

    if (breakTimes) {
        let inBreak = false;

        breakTimes.forEach(breakTime => {
            if (!inBreak) {
                const inputTime = moment(moment(date).format('HH:mm:ss'), 'HH:mm:ss');
                const breakStart =  moment(breakTime[0], 'HH:mm:ss');
                const breakEnd =  moment(breakTime[1], 'HH:mm:ss');

                inBreak = inputTime.isBetween(breakStart, breakEnd);

                if (inBreak) {
                    workBreaksResponse = `, We're just on a break. We'll be back at "${breakEnd.format('HH:mm:ss')}"`
                }
            }
        });
    }

    return workBreaksResponse;
}