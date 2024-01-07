import {FaceFrownIcon} from "@heroicons/react/24/solid";

/***
 * @project project-harbor
 * @author azurkurbasic on 7. 01. 24
 */
export default function NotFound() {
    return (
        <main className="flex my-auto w-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-48 text-white" />
            <h2 className="text-5xl font-semibold mt-10">404 Not Found</h2>
        </main>
    );
}
