export default function Header () {
    return <>
        <div className="z-10 max-w-5xl w-full justify-between flex-col font-mono text-sm lg:flex">
            <div
                className="fixed bottom-0 left-0 flex h-48 w-full items-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://www.linkedin.com/in/azur-kurba%C5%A1i%C4%87-8189791b0?originalSubdomain=si"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {'Developed by Azur Kurbašić'}
                </a>
            </div>
            <div className={'mt-10 mr-auto max-w-5xl'}>
                <h1 className={'font-medium text-6xl'}>
                    Time Harbor
                </h1>
            </div>
        </div>
    </>
}
