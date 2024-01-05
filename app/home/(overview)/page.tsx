import Clock from "@/app/ui/lottie/clock";
import {Input} from "postcss";
import LoginForm from "@/app/ui/non-auth/login/login-form";
import {ClockInForm} from "@/app/ui/home/form";

export default function Page() {
    return(
        <div className={'flex flex-col justify-center'}>
            <div className={'max-w-xl'}>
                <span className={'font-mono text-3xl tracking-wide'}>
                    It seems you haven`t clocked in for today! ⏰
                </span>
                <p className={'mt-4 text-xl font-light max-w-lg tracking-wide'}>
                    Let`s capture your productive day. Enter your hours and share what you accomplished.
                </p>
            </div>
            <div className="mt-10 max-w-xl">
                <ClockInForm />
            </div>
        </div>
    )
}
