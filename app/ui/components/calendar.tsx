/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
import {datesOnSameDay, daysInMonth} from "@/app/ui/utils/date";
import {ClockInDbEntry} from "@/app/lib/definitions";
import clsx from "clsx";
import Link from "next/link";

export interface CalendarProps {
    month: number,
    year: number,
    entries: ClockInDbEntry []
}

export default function Calendar({ month, year, entries }: CalendarProps) {
    return (
        <div className="grid grid-cols-4 gap-7">
            {CalendarGrid(month, year, entries)}
        </div>
    );
}

const CalendarGrid = (month: number, year: number, entries: ClockInDbEntry []) => {

    const today = new Date()
    const entryMap = new Map<string, ClockInDbEntry>()
    entries.forEach((it) => {
        const date = new Date(it.work_date)
        entryMap.set(`${date.getDate()}`, it)
    })

    const daysCount = daysInMonth(month, year);
    const gridItems = [];

    const generateLink = (inPast: boolean, wasClockedIn: boolean, isToday: boolean, entryId: string | undefined, date: Date) => {
        if (isToday) {
            return '/home'
        }
        if (inPast && wasClockedIn) {
            return `/home/calendar/edit/${entryId}`
        }
        if (inPast && !wasClockedIn) {
            return `/home/calendar/new?date=${date.toString()}`
        }
        return ''
    }

    for (let day = 1; day <= daysCount; day++) {
        const d = new Date(year, month, day)
        const inPast = d < today
        const wasClockedIn = entryMap.has(`${day}`)
        const isToday = datesOnSameDay(d, today)

        gridItems.push(
            <Link key={day} className={
                clsx(
                    "w-[150px] h-[150px] transition-all relative justify-center flex items-center rounded-lg",
                    {
                        'hover:bg-green-500/5 border-green-500/10 border-4 hover:cursor-pointer duration-150': wasClockedIn && !isToday,
                        'hover:bg-red-500/5 border-red-500/10 border-4 hover:cursor-pointer duration-150': inPast && !wasClockedIn,
                        'hover:bg-white/5 border-white/60 border-4 hover:cursor-pointer duration-150': isToday
                    }
                )
            }
            href={generateLink(inPast, wasClockedIn, isToday, entryMap.get(`${day}`)?.id, new Date(year, month, day))}
            >
                <div className='absolute top-2 left-2 font-medium text-lg'>
                    {day < 10 ? `0${day}` : day}
                </div>
                <div className={'font-medium text-xl'}>
                    { wasClockedIn ? `${entryMap.get(`${day}`)?.hours_worked}h ${entryMap.get(`${day}`)!.minutes_worked > 0 ? `${entryMap.get(`${day}`)!.minutes_worked}min` : ''}` : inPast ? '0h' : ''}
                </div>
            </Link>
        );
    }

    return gridItems;
};
