'use server';

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {getSession} from "next-auth/react";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {auth} from "@/auth";

const ClockInFormSchema = z.object({
    id: z.string(),
    date: z.string(),
    productivity: z.number()
        .lte(100, {message: 'Please enter an amount less or equal to 100'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0'}),
    hoursWorked: z.number()
        .lte(23, {message: 'Please enter an amount less or equal to 23'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0'}),
    minutesWorked: z.number()
        .lte(59, {message: 'Please enter an amount less or equal to 59'})
        .gte(0, {message: 'Please enter an amount greater or equal to 0'}),
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
    message?: string | null;
};

export async function createClockInEntry(prevState: State, formData: FormData) {

    const session = await auth()
    const userId = session?.user?.id

    console.log(userId, session)

    const validatedFields = CreateClockIn.safeParse({
        hours: formData.get('hours'),
        minutes: formData.get('minutes'),
        description: formData.get('description'),
        productivity: formData.get('productivity')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Clock In.',
        };
    }

    // Prepare data for insertion into the database
    const {hoursWorked, minutesWorked, description, productivity} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

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
                    ,
                    ${date},
                    ${productivity},
                    ${hoursWorked},
                    ${minutesWorked},
                    ${description},
                    ${10}
                );`;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Clock In.',
        };
    }

    // Revalidate the cache for home screen
    revalidatePath('/home');
    redirect('/home');
}
