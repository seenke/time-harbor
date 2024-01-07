import {ClockInForm} from "@/app/ui/home/clock-in-form";
import {getClockInEntryById} from "@/app/lib/clock-in-actions";
import {notFound} from "next/navigation";
import ClockInDateViewer from "@/app/ui/auth/clock-in-date-viewer";

/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
export default async function Page({ params }: { params: { id: string } }) {

    const clockInEntry = await getClockInEntryById(params.id)
    if (!clockInEntry) {
        notFound()
    }

    return <div className={'flex flex-row items-center'}>
        <div className={'flex flex-col justify-center'}>
            <div className={'max-w-xl'}>
                <span className={'font-mono text-3xl tracking-wide'}>
                    It seems you`ve already clocked in for this date ⏰
                </span>
                <p className={'mt-4 text-xl font-light max-w-lg tracking-wide'}>
                    No worries! You can edit your activities and hours for this date. Fill up the form and keep your records up to date
                </p>
            </div>
            <div className={'mt-10 max-w-xl'}>
                <ClockInForm clockInData={clockInEntry} date={clockInEntry.work_date} />
            </div>
        </div>
        <div className={'ml-auto mr-auto'}>
            <ClockInDateViewer date={clockInEntry.work_date} />
        </div>
    </div>
}
