import FloatingShip from "@/app/ui/lottie/floating-ship";
import Link from "next/link";

export default function Home() {
    return (
        <div className={'flex-col flex'}>
            <div className={'flex-row flex'}>
                <div>
                    <div className={'mt-4 ml-1 max-w-sm'}>
                        <p className={'font-light'}>
                            Drop anchor on inefficiency! TimeHarbor - the harbor of precision, the gateway to
                            productivity.
                        </p>
                        <p className={'mt-4 font-medium'}>
                            Clock in and sail through your workday effortlessly.
                        </p>
                    </div>
                    <div className={'mt-5'}>
                        <Link href={'/login'}>
                            <button className="btn btn-wide btn-outline text-black bg-white">Log In</button>
                        </Link>
                    </div>
                </div>
                <FloatingShip/>
            </div>
        </div>
    )
}
