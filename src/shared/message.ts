import uuidv4 from 'uuid/v4';

export enum MessageType {
    REQUEST = 1,
    RESPONSE,
    EVENT,
}

export type MessageSchema<Body, Code> = {
    code: Code;
    headers: {
        id: string;
        type: MessageType;
    };
    body: Body;
};

export default class Message<Body, Code> implements MessageSchema<Body, Code> {
    public code: Code;
    public headers: {
        id: string;
        type: MessageType;
    };
    public body: Body;

    constructor(type: MessageType, code: Code, body: Body, id?: string) {
        this.code = code;
        this.headers = {
            id: id || uuidv4(),
            type,
        };
        this.body = body;
    }

    public getId = (): string => this.headers.id;
    public getBody = (): Body => this.body;
    public getCode = (): Code => this.code;

    public serialize = (): MessageSchema<Body, Code> => {
        return {
            code: this.code,
            headers: this.headers,
            body: this.body,
        };
    }

    static deserialize = (message: MessageSchema<any, any>): Message<any, any> => {
        return new Message(message.headers.type, message.code, message.body, message.headers.id);
    }
}
