const {db} = require('@vercel/postgres')
const {
    users,
    hoursWorked
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const {create} = require("node:domain");

async function dropAll(client) {
    try {
        await client.sql`DROP SCHEMA public CASCADE;`
        console.log('Dropped all tables !')
    } catch (error) {
        console.error('Error dropping all tables:', error)
        throw error
    }
}

async function createSchema(client) {
    try {
        await client.sql`CREATE SCHEMA public;`
        console.log('Created public schema')
    } catch (error) {
        console.error('Error creating public schema: ', error)
        throw error
    }
}

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        console.log(users)
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedHoursRecords(client) {
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS user_hours_worked (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    work_date DATE NOT NULL,
    productivity INT NOT NULL,
    hours_worked INT NOT NULL,
    minutes_worked INT NOT NULL,
    description TEXT,
    hourly_wage DECIMAL(10, 2) NOT NULL,
    
    CONSTRAINT unique_user_date_pair UNIQUE (user_id, work_date));`

        console.log('Created "user_hours_worked" table')

        // Insert data into the "user_horus_worked" table
        //
        const insertedHoursWorked = await Promise.all(
            hoursWorked.map(
                (hoursWorkedLog) => client.sql`
                INSERT INTO user_hours_worked (
                    user_id,
                    work_date,
                    productivity,
                    hours_worked,
                    minutes_worked,
                    description,
                    hourly_wage
                ) VALUES (
                    ${hoursWorkedLog.userId},
                    ${hoursWorkedLog.workDate},
                    ${hoursWorkedLog.productivity},
                    ${hoursWorkedLog.hoursWorked},
                    ${hoursWorkedLog.minutesWorked},
                    ${hoursWorkedLog.description},
                    ${hoursWorkedLog.hourlyWage}
                );`
            )
        )

        console.log(`Seeded ${insertedHoursWorked.length} user_hours_worked`)

        return {
            createTable,
            userHoursWorked: insertedHoursWorked
        }

    } catch (error) {
        console.error("Error seeding hours record:", error)
        throw error
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client)
    await seedHoursRecords(client)

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err
    )
})
