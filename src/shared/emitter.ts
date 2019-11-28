export interface IBaseEmitter<EVENT> {
    on(event: EVENT, fn: Function): this;
    emit<T>(event: EVENT, ...args: Array<T>): this;
}

export interface IEmitter<EVENT> extends IBaseEmitter<EVENT> {
    removeListener(event: EVENT, fn: Function): this;
}

export class Emitter<EVENT> implements IEmitter<EVENT> {
    protected readonly listeners: Map<EVENT, Array<Function>>;

    constructor() {
        this.listeners = new Map();
    }

    on(event: EVENT, fn: Function): this {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(fn);

        return this;
    }

    emit<T>(event: EVENT, ...args: T[]): this {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(fn => fn(...args));
        }

        return this;
    }

    removeListener(event: EVENT, fn: Function): this {
        if (this.listeners.has(event)) {
            this.listeners.set(
                event,
                this.listeners.get(event).filter(f => f !== fn),
            );
        }

        return this;
    }
}
