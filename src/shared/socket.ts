import { ResponseEntity } from 'ddk.registry/dist/model/responseEntity';
import Message, { MessageType } from 'ddk.registry/dist/model/transport/message';

import { DEFAULT_SOCKET_TIMEOUT, DEFAULT_SOCKET_EVENT } from 'src/const';

export interface IEmitter {
    on(event: string, fn: Function): IEmitter;
    emit<T>(event: string, ...args: Array<T>): IEmitter;
}

export interface ISocketClient<Code = string, Socket = WebSocket> extends IEmitter {
    send<Data, Response>(code: Code, data: Data): Promise<ResponseEntity<Response>>;
    getSocket(): Socket;
}

export class SocketClient<T extends IEmitter, ActionTypes> implements ISocketClient<ActionTypes, T> {
    private readonly socket: T;
    private readonly listeners: Map<string, (value?: any) => void>;
    private readonly timeout: number;
    private readonly event: string;

    constructor(socket: T, event: string = DEFAULT_SOCKET_EVENT, timeout: number = DEFAULT_SOCKET_TIMEOUT) {
        this.socket = socket;
        this.event = event;
        this.listeners = new Map<string, (value?: any | PromiseLike<any>) => void>();
        this.timeout = timeout;

        this.socket.on(this.event, (serializedMessage: Message<ResponseEntity<any>, ActionTypes>) => {
            const message = Message.deserialize(serializedMessage);

            if (this.listeners.has(message.getId())) {
                this.listeners.get(message.getId())(message.getBody());
                this.listeners.delete(message.getId());
            }
        });
    }

    on(event: string, fn: Function): IEmitter {
        return this.socket.on(event, fn);
    }

    emit(event: string, ...args: Array<any>): IEmitter {
        return this.socket.emit(event, args);
    }

    send<D, R>(code: ActionTypes, data: D): Promise<ResponseEntity<R>> {
        const message = new Message(MessageType.REQUEST, code, data);

        this.socket.emit(this.event, message);

        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                this.listeners.delete(message.headers.id);
                resolve(new ResponseEntity({ errors: ['Socket timeout'] }));
            }, this.timeout);

            this.listeners.set(message.headers.id, (res?: ResponseEntity<R>) => {
                clearTimeout(timeoutId);
                resolve(res);
            });
        });
    }

    getSocket() {
        return this.socket;
    }
}
