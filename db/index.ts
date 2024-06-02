import { env } from '@/env'
import { Pool } from 'pg'

export async function connect() {
  const pool = new Pool({
    connectionString: env.CONNECTION_STRING,
  })

  const client = await pool.connect()

  if (client) {
    console.log('🌊 Created pool connection')
  }

  const res = await client.query('Select now()')
  console.log(res.rows[0])

  return client
}
