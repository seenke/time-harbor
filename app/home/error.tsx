'use client';

import { useEffect } from 'react';
import {Button} from "@/app/ui/components/button";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center font-medium text-5xl">Something went wrong!</h2>
            <Button
                className={'mt-10'}
                onClick={() => reset()}
            >
                Try again
            </Button>
        </main>
    );
}
