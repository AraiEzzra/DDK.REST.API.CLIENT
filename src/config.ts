import dotenv from 'dotenv';
import DDK, { WORKSPACE } from 'ddk.registry';

import { DEFAULT_NUMBER_OF_CONFIRMATIONS } from 'src/const';

dotenv.config();

const workspace = WORKSPACE[process.env.WORKSPACE];
if (!workspace) {
    throw new Error(`[Config] Unknown workspace: ${process.env.WORKSPACE}`);
}

export const ON_APPLY_TRANSACTION = process.env.ON_APPLY_TRANSACTION;
export const ON_APPLY_BLOCK = process.env.ON_APPLY_BLOCK;
export const ON_DECLINE_TRANSACTION = process.env.ON_DECLINE_TRANSACTION;

export const NUMBER_OF_CONFIRMATIONS = Number(process.env.NUMBER_OF_CONFIRMATIONS) || DEFAULT_NUMBER_OF_CONFIRMATIONS;

console.log(`[Config] Workspace: ${workspace}`);

DDK.initialize(workspace);

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

if (process.env.NODE_HOST || process.env.NODE_API_PORT) {
    throw `Please, update the list of nodes in .env file by instruction: ` +
    `https://github.com/AraiEzzra/DDK.REST.API.CLIENT/blob/master/docs/environment.md#ddk-node-hosts` +
    `, and remove NODE_HOST, NODE_API_PORT variables`;
}

const NODE_HOSTS_ENV = process.env.NODE_HOSTS;
if (!NODE_HOSTS_ENV) {
    throw new Error(`[Config] NODE_HOSTS is missing`);
} else {
    console.log(`[Config] NODE_HOSTS: ${NODE_HOSTS_ENV}`);
}

export const NODE_HOSTS = NODE_HOSTS_ENV.split(',').map(host => {
    const tmp = host.split(':');

    return {
        ip: tmp[0],
        port: Number(tmp[1]),
    };
});
