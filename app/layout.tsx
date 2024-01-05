import './globals.css'
import {inter} from "@/app/ui/fonts";
import Header from "@/app/ui/non-auth/Header";
import Footer from "@/app/ui/non-auth/Footer";
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
        <main className="flex min-h-screen flex-col items-center p-24">
            <Header />

            <div className={'flex flex-row flex-grow w-screen max-w-6xl'}>
                {children}
            </div>

            <div className={'mt-auto'}>
                <Footer />
            </div>
        </main>
        </body>
        </html>
    )
}
