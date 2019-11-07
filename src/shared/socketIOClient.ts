import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import Message, { MessageType } from 'ddk.registry/dist/model/transport/message';

import { SocketClient } from 'src/shared/socket';

export class SocketIOClient<ActionTypes> extends SocketClient<SocketIOClient.Socket, ActionTypes> {
    send<D, R>(code: ActionTypes, data: D): Promise<ResponseEntity<R>> {
        const message = new Message(MessageType.REQUEST, code, data);

        this.socket.emit(this.event, message);

        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                this.messageListeners.delete(message.headers.id);
                resolve(new ResponseEntity({ errors: ['Socket timeout'] }));
            }, this.timeout);

            this.messageListeners.set(message.headers.id, (res?: ResponseEntity<R>) => {
                clearTimeout(timeoutId);
                resolve(res);
            });
        });
    }

    get isConnected(): boolean {
        return this.socket.connected;
    }

    get uri(): string {
        return this.socket.io.uri;
    }
}
