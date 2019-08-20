import dotenv from 'dotenv';
import DDK, { WORKSPACE } from 'ddk.registry';

dotenv.config();

const workspace = WORKSPACE[process.env.WORKSPACE];
if (!workspace) {
    throw new Error(`Unknown workspace: ${process.env.WORKSPACE}`);
}

export const ON_APPLY_TRANSACTION = process.env.ON_APPLY_TRANSACTION;
export const ON_APPLY_BLOCK = process.env.ON_APPLY_BLOCK;

console.log(`Workspace: ${workspace}`);

DDK.initialize(workspace);

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export const NODE_HOST = process.env.NODE_HOST;
console.log(`NODE_HOST: ${NODE_HOST}`);

if (!NODE_HOST) {
    throw new Error(`NODE_HOST is missing`);
}

export const NODE_API_PORT = Number(process.env.NODE_API_PORT);
console.log(`NODE_API_PORT: ${NODE_API_PORT}`);

if (!NODE_API_PORT) {
    throw new Error(`NODE_API_PORT is missing`);
}
