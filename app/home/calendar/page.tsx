/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
import Calendar from "@/app/ui/components/calendar";
import {notFound} from "next/navigation";
import {getClockInEntries} from "@/app/lib/clock-in-actions";
import Paginator from "@/app/ui/calendar/paginator";
import {beautifyDate, getHoursAndMinutesString, getMonthName} from "@/app/ui/utils/date";
import PdfReportGenerator, {PdfReportItem} from "@/app/ui/calendar/report-generator";
import {ClockInDbEntry} from "@/app/lib/definitions";

export default async function Page({ searchParams }: { searchParams: { month: string|undefined, year: string|undefined }}) {

    const { _year, _month} = extractYearAndMonth(searchParams)
    const result = await getClockInEntries((_month + 1).toString(), _year.toString())

    return <>
        <div className={'flex flex-row items-center justify-center'}>
            <div className={'mt-10'}>
                <div className={'flex flex-row'}>
                    <Paginator year={_year} month={_month} />
                    <div className={'ml-auto'}>
                        <PdfReportGenerator items={clockInEntriesToReportData(result)} />
                    </div>
                </div>
                <div className={'mt-10'}>
                    <span>Showing data for</span>
                    <p>
                        <span className='font-mono text-3xl font-medium'>{getMonthName(new Date(_year, _month))}</span>, <span
                        className='font-mono text-3xl font-medium ml-2'>{(new Date(_year, _month)).getFullYear()}</span>
                    </p>
                </div>
                <div className={'mt-10'}>
                    <Calendar
                        entries={result}
                        month={_month}
                        year={_year}
                    />
                </div>
            </div>
        </div>
    </>
}

const extractYearAndMonth = (searchParams: { month: string|undefined, year: string|undefined }) => {
    let _year: number | undefined = undefined
    let _month: number | undefined = undefined

    if (!searchParams.month && !searchParams.year) {
        const today = new Date()
        _month = today.getMonth()
        _year = today.getFullYear()
    } else if (!searchParams.month || !searchParams.year) {
        notFound()
    } else {
        _year = parseInt(searchParams.year)
        _month = parseInt(searchParams.month)
    }

    if (_year == undefined || _month == undefined) {
        notFound()
    }

    return {
        _year,
        _month
    }
}

const clockInEntriesToReportData = (items: ClockInDbEntry []) : PdfReportItem [] => {
    let minuteSum = 0
    const pdfItems = items.sort((a, b) => a.work_date > b.work_date ? 1 : -1).map((it) => {
        minuteSum += it.minutes_worked
        minuteSum += it.hours_worked * 60
        return {
            title: beautifyDate(it.work_date),
            content: getHoursAndMinutesString(it.hours_worked * 60 + it.minutes_worked)
        }
    })

    return  [
        ...pdfItems,
        { title: 'Total hours worked', content: getHoursAndMinutesString(minuteSum) }
    ]
}
