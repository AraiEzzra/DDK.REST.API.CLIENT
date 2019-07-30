import io from 'socket.io-client';

import { DEFAULT_SSL_PORT } from 'src/const';
import { SocketClient } from 'src/shared/socket';

const initSocketIOClient = (ip: string, port: number): SocketIOClient.Socket => {
    const protocol = port === DEFAULT_SSL_PORT ? 'wss' : 'ws';

    return io(`${protocol}://${ip}:${port}`);
};

const socketIOClient = initSocketIOClient(process.env.NODE_HOST, Number(process.env.NODE_API_PORT));

export const socketClient = new SocketClient(socketIOClient);
