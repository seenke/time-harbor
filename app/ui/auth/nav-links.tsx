'use client';

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
    {
        name: 'Home',
        href: '/home',
        icon: HomeIcon
    },
    {
        name: 'Invoices',
        href: '/home/hours',
        icon: DocumentDuplicateIcon,
    },
    {
        name: 'Customers',
        href: '/dashboard/customers',
        icon: UserGroupIcon
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
                            'h-[48px] text-xl font-light hover:font-medium transition-all',
                            {
                                'font-bold': pathname === link.href,
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
