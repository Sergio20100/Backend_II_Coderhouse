import { config } from "dotenv";

config();
const env = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  persistence: process.env.PERSISTENCE
}
export default env;
