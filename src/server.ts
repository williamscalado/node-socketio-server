import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Server, createServer } from "http";
import { Server as Io } from "socket.io";
import SocketService from "./services/websocket";
dotenv.config();
const port = process.env.PORTWS;

class App {
  public app: express.Application;
  public server: Server;
  private socketIo: Io;
  private socketService: SocketService;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.socketIo = new Io(this.server, {
      cors: {
        origin: "*",
      },
    });
    this.socketService = SocketService.getInstance(this.socketIo);
    this.socketService.init();
    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }
}
export default App;
