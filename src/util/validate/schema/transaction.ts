import { TransactionType } from 'ddk.registry/dist/model/common/transaction/type';

export const createTransactionScheme = {
    id: 'POST /api/transactions/',
    type: 'object',
    properties: {
        transaction: {
            type: 'object',
            properties: {
                type: {
                    type: 'integer',
                    enum: Object.values(TransactionType),
                },
                asset: {
                    type: 'object', // TODO: add asset validation
                },
            },
            required: ['type', 'asset'],
        },
        secret: {
            type: 'string',
            format: 'secret',
        },
        secondSecret: {
            type: 'string',
            format: 'secret',
        },
    },
    required: ['transaction', 'secret'],
};
