'use server';

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";
import {ClockInDbEntry} from "@/app/lib/definitions";
import { unstable_noStore as noStore } from 'next/cache';
import {datesOnSameDay} from "@/app/ui/utils/date";
import {redirect} from "next/navigation";

const ClockInFormSchema = z.object({
    id: z.string(),
    date: z.string(),
    productivity: z.coerce.number()
        .lte(100, {message: 'Please enter an amount less or equal to 100'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0'}),
    hoursWorked: z.coerce.number()
        .lte(23, {message: 'Please enter an amount less or equal to 23.'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0.'}),
    minutesWorked: z.coerce.number()
        .lte(59, {message: 'Please enter an amount less or equal to 59.'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0.'}),
    description: z.string()
});

const CreateClockIn = ClockInFormSchema.omit({id: true, date: true});

export type State = {
    errors?: {
        hours?: string[];
        minutes?: string[];
        description?: string[];
        productivity?: string[];
    };
    message?: {
        type: 'success' | 'error',
        message: string
    };
};

export async function updateClockInEntry(prevState: State, id: string, formData: FormData): Promise<State> {
    const session = await auth()
    const userId = session?.user?.email

    const validatedFields = CreateClockIn.safeParse({
        hoursWorked: formData.get('hours'),
        minutesWorked: formData.get('minutes'),
        description: formData.get('description'),
        productivity: formData.get('productivity')
    })

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: {
                message: 'Missing Fields. Failed to Clock In.',
                type: 'error'
            }
        };
    }

    const {hoursWorked, minutesWorked, description, productivity} = validatedFields.data;

    try {
        await sql`UPDATE user_hours_worked
                  SET productivity=${productivity}, hours_worked=${hoursWorked}, minutes_worked=${minutesWorked}, description=${description}
                  WHERE id=${id};
                  `
    } catch (e) {
        console.log(e)
        return {
            errors: {},
            message: {
                message: 'Database Error: Failed to update.',
                type: 'error'
            }
        };
    }

    revalidatePath('/home');

    return {
        message: {
            message: 'You have successfully updated Clock in entry.',
            type: 'success'
        },
        errors: {}
    }
}

export async function createClockInEntry(prevState: State, formData: FormData, date: Date): Promise<State> {

    const session = await auth()
    const userId = session?.user?.email

    const validatedFields = CreateClockIn.safeParse({
        hoursWorked: formData.get('hours'),
        minutesWorked: formData.get('minutes'),
        description: formData.get('description'),
        productivity: formData.get('productivity')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: {
                message: 'Missing Fields. Failed to Clock In.',
                type: 'error'
            }
        };
    }

    // Prepare data for insertion into the database
    const {hoursWorked, minutesWorked, description, productivity} = validatedFields.data;
    const dateString = date.toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`INSERT INTO user_hours_worked (
                    user_id,
                    work_date,
                    productivity,
                    hours_worked,
                    minutes_worked,
                    description,
                    hourly_wage
                ) VALUES (
                    ${userId},
                    ${dateString},
                    ${productivity},
                    ${hoursWorked},
                    ${minutesWorked},
                    ${description},
                    ${13}
                );`;
    } catch (error) {
        console.log(error)
        return {
            errors: {},
            message: {
                message: 'Database Error: Failed to Clock In.',
                type: 'error'
            }
        };
    }

    revalidatePath('/home');
    revalidatePath('/home/calendar');

    // Revalidate the cache for home screen
    if (!datesOnSameDay(date, new Date())) {
        // It's not today's date
        redirect('/home/calendar')
    }

    return {
        message: {
            message: 'You have successfully clocked in.',
            type: 'success'
        },
        errors: {}
    }
}

export async function getTodayClockInEntry(): Promise<ClockInDbEntry | undefined> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email
    const todayDate = new Date().toISOString().split('T')[0];

    try {
        const res = await sql<ClockInDbEntry>`SELECT * FROM user_hours_worked WHERE user_id=${userId} AND work_date=${todayDate}`;
        if (res.rowCount === 0) {
            return undefined
        } else {
            return res.rows[0]
        }
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}

export async function getClockInEntries(month: string, year: string): Promise<ClockInDbEntry []> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email
    try {
        const res = await sql<ClockInDbEntry>`
            SELECT * FROM user_hours_worked WHERE user_id=${userId}
            AND EXTRACT(YEAR FROM work_date) = ${year}
            AND EXTRACT(MONTH FROM work_date) = ${month}
            `
        return res.rows
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}

export async function getClockInEntryById(id: string): Promise<ClockInDbEntry | undefined> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email

    try {
        const res = await sql<ClockInDbEntry>`
        SELECT * FROM user_hours_worked WHERE user_id=${userId}
        AND id = ${id}`

        return res.rowCount > 0 ? res.rows[0] : undefined
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}

export async function getClockInEntryByDate(date: Date): Promise<ClockInDbEntry | undefined> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    try {
        const res = await sql<ClockInDbEntry>`
        SELECT * FROM user_hours_worked WHERE user_id=${userId}
        AND EXTRACT(YEAR FROM work_date) = ${year}
        AND EXTRACT(MONTH from work_date) = ${month}
        AND EXTRACT(DAY from work_date) = ${day}
        `
        return res.rows.length > 0 ? res.rows[0] : undefined
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}
