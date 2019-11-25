import fetch from 'node-fetch';

export enum WebhookAction {
    APPLY_TRANSACTION = 'APPLY_TRANSACTION',
}

export interface ISubscriber<Action> {
    subscribe(action: Action, url: string): void;
    unsubscribe(action: Action, url: string): void;
}

export class WebhookService<Action> implements ISubscriber<Action> {
    private readonly actions: Map<Action, Array<string>>;

    constructor() {
        this.actions = new Map();
    }

    subscribe(action: Action, url: string): void {
        if (!this.actions.has(action)) {
            this.actions.set(action, [url]);
        } else {
            this.actions.get(action).push(url);
        }
    }

    unsubscribe(action: Action, url: string): void {
        const urls = this.actions.get(action);
        if (!urls) {
            return;
        }

        const index = urls.findIndex(_url => url === _url);
        if (index === -1) {
            return;
        }

        urls.splice(index, 1);
    }

    on(action: Action, data: any): void {
        if (!this.actions.has(action)) {
            return;
        }

        this.actions.get(action).forEach(url => {
            fetch(url, { method: 'post', body: JSON.stringify(data) });
        });
    }
}
