/***
 * @project project-harbor
 * @author azurkurbasic on 7. 01. 24
 */
import {beautifyDate, getDayName} from "@/app/ui/utils/date";
import Clock from "@/app/ui/lottie/clock";

interface ClockInDateViewerProps {
    date: Date
}
export default function ClockInDateViewer({ date } : ClockInDateViewerProps) {
    return (
        <>
            <h1 className={'text-6xl font-medium'}>
                {beautifyDate(date)}
            </h1>
            <h1 className={'text-4xl mt-5 font-light'}>
                {getDayName(date)}
            </h1>
            <div className={'w-[150px] h-[150px] mt-5'}>
                <Clock/>
            </div>
        </>
    )
}
