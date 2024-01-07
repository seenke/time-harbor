import NavLinks from "@/app/ui/auth/nav-links";
import {signOut} from "@/auth";
import {Button} from "@/app/ui/components/button";

export default function TopNav() {

    return (
        <div className={'flex flex-row items-center py-5'}>
            <NavLinks/>
            <form
                className={'h-[48px] text-2xl hover:font-medium hover:cursor-pointer transition-all flex-grow flex justify-end'}
                action={async () => {
                    'use server'
                    await signOut()
                }}
            >
                <Button className={'w-24'}>
                    Sign Out
                </Button>
            </form>
        </div>
)
    ;
}
