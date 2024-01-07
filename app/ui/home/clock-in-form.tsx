'use client';

import {useFormState, useFormStatus} from "react-dom";
import {Button} from "@/app/ui/components/button";
import {createClockInEntry, State, updateClockInEntry} from "@/app/lib/clock-in-actions";
import {TextArea} from "@/app/ui/components/text_area";
import {ErrorMessage} from "@/app/ui/components/error_message";
import {SuccessMessage} from "@/app/ui/components/success_message";
import {ClockInDbEntry} from "@/app/lib/definitions";

export interface ClockInFormProps {
    clockInData?: ClockInDbEntry,
    date?: Date
}
export function ClockInForm({ clockInData, date }: ClockInFormProps) {

    const initialState = { message: undefined, errors: {} };
    const onSubmit = async (previousState: State, formData: FormData): Promise<State> => {
        if (clockInData) {
            return await updateClockInEntry(previousState, clockInData.id, formData)
        } else {
            return await createClockInEntry(previousState, formData, date ? date : new Date())
        }
    }
    const [state, dispatch] = useFormState(onSubmit, initialState)

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
                        defaultValue={clockInData ? clockInData.hours_worked : undefined}
                        placeholder="Hours worked"
                        className="input input-bordered w-full bg-white text-black"
                        required
                    />
                    <div id="hours-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.hours &&
                            state.errors.hours.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
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
                        defaultValue={clockInData ? clockInData.minutes_worked : undefined}
                        className="input input-bordered w-full bg-white text-black"
                    />
                    <div id="minutes-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.minutes &&
                            state.errors.minutes.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </label>
                <label className="form-control w-full mt-5">
                    <div className="label">
                    <span className="label-text text-white">
                        Enter short description of what you did today
                    </span>
                    </div>
                    <TextArea
                        id="description"
                        name="description"
                        placeholder="Description of your work"
                        value={clockInData ? clockInData.description : undefined}
                    />
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description &&
                            state.errors.description.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </label>
                <label className="form-control w-full mt-5">
                    <div className="label">
                    <span className="label-text text-white">
                        Rate your productivity
                    </span>
                    </div>
                    <input
                        id="productivity"
                        name="productivity"
                        type="range"
                        min="0"
                        max="100"
                        defaultValue={clockInData ? clockInData.productivity : undefined}
                        className="range range-xs mt-2 range-success"
                    />
                    <div id="productivity-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.productivity &&
                            state.errors.productivity.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </label>
            </div>
            <div className={'mt-10 w-[50%]'}>
                <ClockInButton text={clockInData ? 'Update Clock In' : 'Clock In'} />
            </div>
            { state.message && state.message.type === 'error' ?  (<ErrorMessage errorMessage={state.message.message}/>) : null}
            { state.message && state.message.type === 'success' ? (<SuccessMessage successMessage={state.message.message} />) : null}
        </form>
    )
}

function ClockInButton({text} : {text: string}) {
    const {pending} = useFormStatus();

    return (
        <Button className="w-full mt-5" aria-disabled={pending}>
            { text }
        </Button>
    )
}
