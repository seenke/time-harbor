/***
 * @project project-harbor
 * @author azurkurbasic on 4. 01. 24
 */
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type ClockInDbEntry = {
    id: string;
    work_date: Date;
    user_id: string;
    productivity: number;
    hours_worked: number;
    minutes_worked: number;
    description: string;
    hourly_wage: string
}
