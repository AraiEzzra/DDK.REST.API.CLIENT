import dotenv from 'dotenv';
import DDK, { WORKSPACE } from 'ddk.registry';

dotenv.config();

const workspace = WORKSPACE[process.env.WORKSPACE];
if (!workspace) {
    throw new Error(`Unknown workspace: ${process.env.WORKSPACE}`);
}

console.log(`Workspace: ${workspace}`);

DDK.initialize(workspace);

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};
