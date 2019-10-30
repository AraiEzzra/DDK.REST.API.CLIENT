import io from 'socket.io-client';

import { DEFAULT_SSL_PORT } from 'src/const';

export const initSocketIOClient = (ip: string, port: number): SocketIOClient.Socket => {
    const protocol = port === DEFAULT_SSL_PORT ? 'wss' : 'ws';

    console.log(`[Service][Socket] Connecting to ${protocol}://${ip}:${port}`);

    return io(`${protocol}://${ip}:${port}`, {
        timeout: 2000,
    });
};
