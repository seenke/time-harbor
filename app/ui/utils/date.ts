/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
export function beautifyDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function getDayName(date: Date): string {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayIndex = date.getDay();

    return dayNames[dayIndex];
}

export function getMonthName(date: Date): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthIndex = date.getMonth();

    return monthNames[monthIndex];
}

export const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const datesOnSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
}


export function getHoursAndMinutesString(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (remainingMinutes === 0) {
        return `${hours}h`;
    } else {
        return `${hours}h ${remainingMinutes}min`;
    }
}
