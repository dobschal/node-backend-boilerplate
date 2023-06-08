import * as fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

export let database: Pool

export function initDatabase (): void {
  database = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })
}

export async function runDatabaseMigrations (): Promise<void> {
  const migrationTableName = '__migrations'
  await database.query(`
      create table if not exists ${migrationTableName}
      (
          migration_file VARCHAR(255) UNIQUE NOT NULL,
          created_on     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
  `)
  const pathToMigrationScripts = path.join(__dirname, '../../', 'db-migrations')
  const filenames = fs.readdirSync(pathToMigrationScripts)
  for (const filename of filenames) {
    const results = await database.query(`
      select * from ${migrationTableName} where migration_file='${filename}'
    `)
    if (results.rows.length === 0) {
      const query = fs.readFileSync(path.join(pathToMigrationScripts, filename), 'utf-8')
      await database.query(query)
      await database.query(`
          insert into ${migrationTableName} (migration_file)
          values ('${filename}')
      `)
      console.log(`✅[database] Ran migration script ${filename}`)
    }
  }
  console.log('👌[database]: Migration done.')
}
