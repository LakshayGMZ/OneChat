import { SocketContext } from "./socket";

export default function WSDisconnect() {
    const socket = useContext(SocketContext);

    socket.disconnect();
    
}