/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
import clsx from "clsx";
import {useState} from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}
export function TextArea({ className, ...other } : TextAreaProps) {

    const [textArea, setTextArea] = useState(other.value ?? '')

    return (
        <textarea
            {...other}
            className={clsx(
                'textarea textarea-bordered w-full bg-white text-black',
                className
            )}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
    )
}
