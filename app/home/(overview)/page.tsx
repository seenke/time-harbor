import {ClockInForm} from "@/app/ui/home/clock-in-form";
import {getTodayClockInEntry} from "@/app/lib/clock-in-actions";
import ClockInDateViewer from "@/app/ui/auth/clock-in-date-viewer";
import {getMoneyEarned, getTimeWorked} from "@/app/lib/analytics-actions";
import {getHoursAndMinutesString} from "@/app/ui/utils/date";

export default async function Page() {

    const today = new Date()
    const clockInEntry = await getTodayClockInEntry()
    const timeWorked = await getTimeWorked(today.getMonth().toString(), today.getFullYear().toString())
    const moneyEarned = await getMoneyEarned(today.getMonth().toString(), today.getFullYear().toString())

    return(
        <div className={'flex flex-row items-center'}>
            <div className={'flex flex-col justify-center'}>
                <div className={'max-w-xl'}>
                <span className={'font-mono text-3xl tracking-wide'}>
                    {clockInEntry ? 'You`re clocked in! ⏰' : 'It seems you haven`t clocked in for today! ⏰'}
                </span>
                    <p className={'mt-4 text-xl font-light max-w-lg tracking-wide'}>
                        {clockInEntry ? 'If your plans change or you need to update your entry, feel free to edit your clock-in details below.' : 'Let`s capture your productive day. Enter your hours and share what you accomplished.'}
                    </p>
                </div>
                <div className="mt-10 max-w-xl">
                    <ClockInForm
                        clockInData={clockInEntry}
                    />
                </div>
            </div>

            <div className={'ml-auto mr-auto'}>
                <div>
                    <ClockInDateViewer date={clockInEntry ? clockInEntry.work_date : new Date()} />
                    <div className='mt-10 text-2xl'>
                        This month you`ve worked
                    </div>
                    <div className='text-4xl font-mono mt-4'>
                        {getHoursAndMinutesString(timeWorked)}
                    </div>
                    <div className='mt-10 text-2xl'>
                        This month you`ve earned
                    </div>
                    <div className='text-4xl font-mono mt-4'>
                        {moneyEarned} EUR
                    </div>
                </div>
            </div>
        </div>
    )
}
