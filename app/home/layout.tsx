import TopNav from "@/app/ui/auth/topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-grow">
            <div className={'mt-4'}>
                <TopNav />
            </div>
            <div className={'mt-10 h-full'}>
                {children}
            </div>
        </div>
    );
}
