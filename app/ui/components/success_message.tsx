/***
 * @project project-harbor
 * @author azurkurbasic on 6. 01. 24
 */
import {CheckCircleIcon} from "@heroicons/react/24/outline";

export function SuccessMessage({ successMessage }: {successMessage: string | undefined}) {
    return <>
        <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
        >
            {successMessage && (
                <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500"/>
                    <p className="text-sm text-green-500">{successMessage}</p>
                </>
            )}
        </div>
    </>
}
