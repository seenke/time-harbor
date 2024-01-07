'use client';
import clsx from "clsx";
import {useRef, useState} from "react";
import {useOnClickOutside} from "usehooks-ts";

/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */

export interface DropDownProps<T> extends React.DetailsHTMLAttributes<HTMLDetailsElement>{
    items: DropDownItem<T> [],
    selectedItem?: T,
    title: string,
    onItemSelect: (item: T) => void
}
export interface DropDownItem<T> {
    displayName: string
    value: T
}

export default function DropDown<T>(props: DropDownProps<T>) {

    const [open, setOpen] = useState(false)

    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpen(false))

    const handleClick = (value: T) => {
        props.onItemSelect(value)
        setOpen(() => false)
    }

    return <>
        <div
            className={clsx('dropdown', props.className, { 'dropdown-open': open })}
            ref={ref}
        >
            <label
                className="btn btn-outline text-black bg-white"
                onClick={() => setOpen((prev) => !prev)}
            >
                {props.title}
            </label>
            <ul className={clsx('shadow menu dropdown-content z-[1] w-full bg-white rounded-box max-h-100 text-black', { 'hidden': !open })}>
                {props.items.map((item) => {
                    return <li onClick={() => handleClick(item.value)} key={`${item.value}`}>
                        <a>{item.displayName}</a>
                    </li>
                })}
            </ul>
        </div>
    </>
}
