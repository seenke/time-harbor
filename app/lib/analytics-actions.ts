import {unstable_noStore as noStore} from "next/cache";
import {auth} from "@/auth";
import {sql} from "@vercel/postgres";

/***
 * @project project-harbor
 * @author azurkurbasic on 7. 01. 24
 */
export async function getTimeWorked(month: string, year: string): Promise<number> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email

    try {
        const res = await sql`
        SELECT SUM(hours_worked * 60 + minutes_worked) as hours_worked_sum
        FROM user_hours_worked
        WHERE EXTRACT(YEAR FROM work_date) = ${year} AND user_id = ${userId}
        AND EXTRACT(MONTH FROM work_date) = ${month + 1}`
        console.log(res.rows[0]['hours_worked_sum'])
        return res.rowCount > 0 ? (Number(res.rows[0]['hours_worked_sum']) ?? 0) : 0
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}

export async function getMoneyEarned(month: string, year: string): Promise<number> {
    noStore()
    const session = await auth()
    const userId = session?.user?.email

    try {
        const res = await sql`
        SELECT SUM(hours_worked * hourly_wage) as money_earned
        FROM user_hours_worked
        WHERE EXTRACT(YEAR FROM work_date) = ${year} AND user_id = ${userId}
        AND EXTRACT(MONTH FROM work_date) = ${month + 1}`
        return res.rowCount > 0 ? (Number(res.rows[0]['money_earned']) ?? 0) : 0
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data.')
    }
}
