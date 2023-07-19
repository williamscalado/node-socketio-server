import IoSocket from "socket.io";
import SocketServiceNotifications from "./notifications";

class SocketService {
  private static instance: SocketService;
  public NotificationService: SocketServiceNotifications;
  public connectedUsers: { [key: string]: string };

  constructor(public io: IoSocket.Server) {
    this.connectedUsers = {};
    this.NotificationService = new SocketServiceNotifications();
  }

  static getInstance(io?: IoSocket.Server) {
    if (!SocketService.instance && io) {
      SocketService.instance = new SocketService(io);
    }

    return SocketService.instance;
  }

  public init(): void {
    this.io.on("connection", (socket) => {
      this.NotificationService.events(socket);
      this.NotificationService.notification(socket);
      const id = "Williams";

      console.log("Usuarios conectados", this.connectedUsers);
      this.connectedUsers[id] = socket.id;

      socket.on("disconnect", () => {
        console.log("desconectado id " + socket.id);
        delete this.connectedUsers[id];
      });
    });
  }
}

export default SocketService;
