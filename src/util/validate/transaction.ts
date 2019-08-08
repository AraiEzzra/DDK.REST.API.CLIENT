import { PAGINATION_SCHEME } from 'src/shared/validate/common';

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
