'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import {signOut} from "@/auth";

const links = [
    {
        name: 'Home',
        href: '/home',
    },
    {
        name: 'Calendar',
        href: '/home/calendar',
    },
];

export default function NavLinks() {

    const pathname = usePathname();

    return (
        <div className={'flex flex-row mt-5 space-x-10'}>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'h-[48px] text-2xl transition-all',
                            {
                                'font-bold': pathname === link.href,
                            },
                            {
                                'hover:font-medium': pathname !== link.href
                            }
                        )}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}
