import IoSocket from "socket.io";
interface IMessage {
  id: string;
  title: string;
  summary: string;
}

class SocketServiceNotifications {
  private static instance: SocketServiceNotifications;

  public events(socket: IoSocket.Socket): void {
    socket.on("message", (message: string) => {
      console.log("recebi", message);
      //socket.broadcast.emit("message", message); //  Envia pra todo mundo, exceto o emissor
      socket.emit("message", message);
    });
  }
  public notification(socket: IoSocket.Socket): void {
    socket.on("notification-header", (message: string) => {
      console.log("recebi a notificação", message);
      socket.broadcast.emit("message", message);
    });
  }
}
export default SocketServiceNotifications;
