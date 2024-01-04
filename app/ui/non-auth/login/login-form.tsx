'use client';

import {Button} from "@/app/ui/components/button";
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import {ErrorMessage} from "@/app/ui/components/error_message";

export default function LoginForm() {

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form className={'w-full'} action={dispatch}>
            <div className={'mt-10 w-full'}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-white">Enter your email address</span>
                    </div>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        className="input input-bordered w-full bg-white text-black"
                        required
                    />
                </label>

                <label className="form-control w-full mt-5">
                    <div className="label">
                        <span className="label-text text-white">Enter your password</span>
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        className="input input-bordered w-full bg-white text-black"
                        required
                        minLength={6}
                    />
                </label>
            </div>
            <div className={'mt-5'}>
                <LoginButton/>
            </div>
            <ErrorMessage errorMessage={errorMessage} />
            <div className={'mt-5 font-medium text-sm'}>
                Don`t have an account?
                <p className={'mt-1 font-bold'}>
                    <a href={'mailto:azurkurbasic@gmail.com'}>
                        Write me an email
                    </a>
                </p>
            </div>
        </form>
    )
}

function LoginButton() {
    const {pending} = useFormStatus();

    return (
        <Button className="w-full mt-5" aria-disabled={pending}>
            Log In
        </Button>
    )
}
