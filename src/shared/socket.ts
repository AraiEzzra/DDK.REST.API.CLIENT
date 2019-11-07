import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import Message from 'ddk.registry/dist/model/transport/message';

import { DEFAULT_SOCKET_TIMEOUT, DEFAULT_SOCKET_EVENT } from 'src/const';

export interface IEmitter {
    on(event: string, fn: Function): IEmitter;
    emit<T>(event: string, ...args: Array<T>): IEmitter;
}

export interface ISocketClient<Code = string> extends IEmitter {
    send<Data, Response>(code: Code, data: Data): Promise<ResponseEntity<Response>>;
    addCodeListener(code: Code, fn: Function): void;
    removeCodeListener(code: Code): void;
    removeCodeListeners(): void;
    readonly isConnected: boolean;
    readonly uri: string;
}

export abstract class SocketClient<Socket extends IEmitter, Code> implements ISocketClient<Code> {
    protected readonly socket: Socket;
    protected readonly messageListeners: Map<string, (value?: any) => void>;
    protected readonly codeListeners: Map<Code, Array<Function>>;
    protected readonly timeout: number;
    protected readonly event: string;

    constructor(socket: Socket, event: string = DEFAULT_SOCKET_EVENT, timeout: number = DEFAULT_SOCKET_TIMEOUT) {
        this.socket = socket;
        this.event = event;
        this.messageListeners = new Map<string, (value?: any | PromiseLike<any>) => void>();
        this.codeListeners = new Map<Code, Array<Function>>();
        this.timeout = timeout;

        this.socket.on(this.event, (serializedMessage: Message<ResponseEntity<any>, Code>) => {
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

    getSocket(): Socket {
        return this.socket;
    }

    addCodeListener(code: Code, fn: Function): void {
        if (!this.codeListeners.has(code)) {
            this.codeListeners.set(code, []);
        }

        this.codeListeners.get(code).push(fn);
    }

    removeCodeListener(code: Code): void {
        if (!this.codeListeners.has(code)) {
            return;
        }

        this.codeListeners.delete(code);
    }

    removeCodeListeners(): void {
        for (const code of this.codeListeners.keys()) {
            this.removeCodeListener(code);
        }
    }

    abstract send<Data, Response>(code: Code, data: Data): Promise<ResponseEntity<Response>>;
    abstract get isConnected(): boolean;
    abstract get uri(): string;
}
