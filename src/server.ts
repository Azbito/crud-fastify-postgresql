import { app } from '@/app'
import { env } from '@/env'
import { connect } from 'db'

// db connection
connect();

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🎈 HTTP Server running')
  })
