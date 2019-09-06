import { TransactionType } from 'ddk.registry/dist/model/common/transaction/type';
import { PAGINATION_SCHEME } from 'ddk.registry/dist/util/validate/scheme/filter';

export const getTransactionByIdScheme = {
    id: 'GET /api/transactions/:id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'id',
        },
    },
    required: ['id'],
};

export const getTransactionsScheme = {
    id: 'POST /api/transactions/getMany',
    type: 'object',
    properties: {
        ...PAGINATION_SCHEME,
    },
    required: ['limit', 'offset'],
};

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
