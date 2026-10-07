import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import app from './app.js';

dotenv.config();

const port = env.port;

await connectDB();
app.listen(port, () => {
  console.log(`Gonomukti server running on http://localhost:${port}`);
});
