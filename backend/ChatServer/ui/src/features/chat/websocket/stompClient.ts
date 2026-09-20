import { Client } from "@stomp/stompjs";

export function createStompClient() {
  return new Client({
    brokerURL: `${import.meta.env.VITE_WS_URL}/ws`,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Websocket connected.");
    },
    onDisconnect: () => {
      console.log("Websocket disconnected.");
    },
    onStompError: (frame) => {
      console.error("STOMP error: ", frame.headers["message"]);
      console.error(frame.body);
    },
  });
}
