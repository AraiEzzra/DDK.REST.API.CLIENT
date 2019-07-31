import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};
