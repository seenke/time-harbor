import LoginForm from "@/app/ui/non-auth/login/login-form";
import LoginCheckList from "@/app/ui/non-auth/login/login-check-list";

export default function Login() {
    return (
        <div className={'flex-col flex max-w5xl'}>
            <div className={'flex-row flex'}>
                <div>
                    <span>
                        Let`s start by
                    </span>
                    <p className={'font-medium text-white text-5xl mt-3'}>
                        Logging You In
                    </p>
                    <LoginForm />
                </div>
                <div className={'ml-[200px]'}>
                    <LoginCheckList/>
                </div>
            </div>
        </div>
    )
}
