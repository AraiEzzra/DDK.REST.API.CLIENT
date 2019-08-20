import fetch from 'node-fetch';

export enum WebhookAction {
    APPLY_TRANSACTION,
    APPLY_BLOCK,
}

export class WebhookService<Action> {
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

    on(action: Action, data: any): void {
        if (!this.actions.has(action)) {
            return;
        }

        this.actions.get(action).forEach(url => {
            fetch(url, { method: 'post', body: JSON.stringify(data) });
        });
    }
}
