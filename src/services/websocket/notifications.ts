import IoSocket from "socket.io";
interface IModuleNotification {
  title: string;
  new: boolean;
  date: Date;
}

const modules: IModuleNotification[] = [];
class SocketServiceNotifications {
  public events(socket: IoSocket.Socket): void {
    socket.on("message", (message: string) => {
      console.log("recebi", message);
      socket.broadcast.emit("message", message); //  Envia pra todo mundo, exceto o emissor
      socket.emit("message", message);
    });
  }
  public notification(socket: IoSocket.Socket): void {
    socket.on("notification-header", (message: string) => {
      const newNotification: IModuleNotification = {
        title: message,
        new: true,
        date: new Date(),
      };

      modules.push(newNotification);
      socket.to(socket.id).emit("notification-header", modules);
      socket.broadcast.emit("notification-header", modules);
    });
  }
}
export default SocketServiceNotifications;
