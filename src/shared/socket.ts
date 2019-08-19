import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import Message, { MessageType } from 'ddk.registry/dist/model/transport/message';

import { DEFAULT_SOCKET_TIMEOUT, DEFAULT_SOCKET_EVENT } from 'src/const';

export interface IEmitter {
    on(event: string, fn: Function): IEmitter;
    emit<T>(event: string, ...args: Array<T>): IEmitter;
}

export interface ISocketClient<Code = string, Socket = WebSocket> extends IEmitter {
    send<Data, Response>(code: Code, data: Data): Promise<ResponseEntity<Response>>;
    addCodeListener(code: Code, fn: Function): void;
    getSocket(): Socket;
}

export class SocketClient<T extends IEmitter, ActionTypes> implements ISocketClient<ActionTypes, T> {
    private readonly socket: T;
    private readonly messageListeners: Map<string, (value?: any) => void>;
    private readonly codeListeners: Map<ActionTypes, Array<Function>>;
    private readonly timeout: number;
    private readonly event: string;

    constructor(socket: T, event: string = DEFAULT_SOCKET_EVENT, timeout: number = DEFAULT_SOCKET_TIMEOUT) {
        this.socket = socket;
        this.event = event;
        this.messageListeners = new Map<string, (value?: any | PromiseLike<any>) => void>();
        this.codeListeners = new Map<ActionTypes, Array<Function>>();
        this.timeout = timeout;

        this.socket.on(this.event, (serializedMessage: Message<ResponseEntity<any>, ActionTypes>) => {
            const message = Message.deserialize(serializedMessage);

            if (this.messageListeners.has(message.getId())) {
                this.messageListeners.get(message.getId())(message.getBody());
                this.messageListeners.delete(message.getId());
            }
            if (this.codeListeners.has(message.code)) {
                this.codeListeners.get(message.code).forEach(fn => fn(message.body));
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
                this.messageListeners.delete(message.headers.id);
                resolve(new ResponseEntity({ errors: ['Socket timeout'] }));
            }, this.timeout);

            this.messageListeners.set(message.headers.id, (res?: ResponseEntity<R>) => {
                clearTimeout(timeoutId);
                resolve(res);
            });
        });
    }

    getSocket() {
        return this.socket;
    }

    addCodeListener(code: ActionTypes, fn: Function): void {
        if (!this.codeListeners.has(code)) {
            this.codeListeners.set(code, []);
        }

        this.codeListeners.get(code).push(fn);
    }
}
