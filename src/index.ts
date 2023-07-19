import dotenv from "dotenv";
import App from "./server";
dotenv.config();
const port = process.env.PORTWS;

const server = new App();

server.server.listen(port, () => {
  console.log(`[Server]: running in port ${port}`);
});
