'use client';

import {useFormState, useFormStatus} from "react-dom";
import {Button} from "@/app/ui/components/button";
import {ErrorMessage} from "@/app/ui/components/error_message";
import {createClockInEntry} from "@/app/lib/clock-in-actions";

export function ClockInForm() {

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createClockInEntry, initialState)

    return (
        <form className={"w-full"} action={dispatch}>
            <div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">
                            Enter hours worked
                        </span>
                    </div>
                    <input
                        id="hours"
                        type="number"
                        name="hours"
                        max={23}
                        min={0}
                        placeholder="Hours worked"
                        className="input input-bordered w-full bg-white text-black"
                        required
                    />
                </label>
                <label className="form-control w-full mt-5">
                    <div className="label">
                        <span className="label-text text-white">
                            Enter minutes worked
                        </span>
                    </div>
                    <input
                        id="minutes"
                        type="number"
                        name="minutes"
                        placeholder="Minutes worked"
                        max={59}
                        min={0}
                        className="input input-bordered w-full bg-white text-black"
                        required
                    />
                </label>
                <label className="form-control mt-5">
                    <div className="label">
                    <span className="label-text text-white">
                        Enter short description of what you did today
                    </span>
                    </div>
                    <textarea
                        id="description"
                        className="textarea textarea-bordered w-full bg-white text-black"
                        placeholder="Description of your work"
                    >
                </textarea>
                </label>

                <label className="form-control mt-5">
                    <div className="label">
                    <span className="label-text text-white">
                        Rate your productivity
                    </span>
                    </div>
                    <input
                        id="productivity"
                        type="range"
                        min="0"
                        max="100"
                        className="range range-xs mt-2 range-success"
                    />
                </label>
            </div>
            <div className={'mt-10 w-[50%]'}>
                <ClockInButton/>
            </div>
            <ErrorMessage errorMessage={''}/>
        </form>
    )
}

function ClockInButton() {
    const {pending} = useFormStatus();

    return (
        <Button className="w-full mt-5" aria-disabled={pending}>
            Clock In
        </Button>
    )
}
