import {ClockInForm} from "@/app/ui/home/clock-in-form";
import ClockInDateViewer from "@/app/ui/auth/clock-in-date-viewer";
import {notFound} from "next/navigation";
import {getClockInEntryByDate} from "@/app/lib/clock-in-actions";

/***
 * @project project-harbor
 * @author azurkurbasic on 7. 01. 24
 */
export default async function Page({ searchParams }: { searchParams: { date: string } }) {

    const date = new Date(searchParams.date)

    if (!date) {
        notFound()
    }

    const clockInEntry = await getClockInEntryByDate(date)
    if (clockInEntry) {
        // Users should be redirected
        notFound()
    }

    return <div className={'flex flex-row items-center'}>
        <div className={'flex flex-col justify-center'}>
            <div className={'max-w-xl'}>
                <span className={'font-mono text-3xl tracking-wide'}>
                    It seems you haven`t clocked in hours for this date ⏰
                </span>
                <p className='mt-4 text-xl font-light max-w-lg tracking-wide'>
                    No worries! You can log your activities and hours for this date now. Fill up the form and keep your records up to date.
                </p>
            </div>
            <div className='mt-10 max-w-xl'>
                <ClockInForm date={date} />
            </div>
        </div>

        <div className='ml-auto mr-auto'>
            <ClockInDateViewer date={date} />
        </div>
    </div>
}
