'use client';
import DropDown, {DropDownItem} from "@/app/ui/components/dropdown";
import {usePathname, useRouter} from "next/navigation";

/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */

export interface PaginatorProps {
    year: number,
    month: number

}

export default function Paginator({year, month}: PaginatorProps) {

    const pathname = usePathname();
    const router = useRouter()

    const createPageURL = (month: number, year: number) => {
        const params = new URLSearchParams({
            year: year.toString(),
            month: month.toString()
        });

        return `${pathname}?${params.toString()}`;
    };

    const onMonthSelect = (m: number) => {
        const url = createPageURL(
            m,
            year
        )
        router.push(url)
    }

    const onYearSelect = (y: number) => {
        const url = createPageURL(
            month,
            y
        )
        router.push(url)
    }

    return (
        <>
            <DropDown
                items={getAvailableYears()}
                selectedItem={year}
                title='Select year'
                onItemSelect={(y) => onYearSelect(y)}
            />
            <DropDown
                items={getAvailableMonths()}
                title={'Select month'}
                selectedItem={month}
                className={'ml-5'}
                onItemSelect={(m) => onMonthSelect(m)}
            />
        </>
    )
}

const getAvailableYears = (): DropDownItem<number> []  => {
    const startYear = new Date().getFullYear();
    const endYear = 2020

    const yearsArr: number [] = Array.from({ length: startYear - endYear + 1 }, (_, index) => endYear + index)

    return yearsArr.map((year) => {
        return {
            displayName: `${year}`,
            value: year
        }
    })
}

const getAvailableMonths = (): DropDownItem<number> [] => {
    const monthsArray: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthsArray.map((month, index) => {
        return {
            displayName: `${month}`,
            value: index
        }
    })
}
