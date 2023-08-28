import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
