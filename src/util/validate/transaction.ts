import { HTTP_PAGINATION_SCHEME } from 'src/shared/validate/common';

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
    id: 'GET /api/transactions/',
    type: 'object',
    properties: {
        ...HTTP_PAGINATION_SCHEME,
    },
    required: ['limit', 'offset'],
};
