export const getAccountScheme = {
    id: 'GET /api/accounts/:address',
    type: 'object',
    properties: {
        address: {
            type: 'string',
            format: 'address',
        },
    },
    required: ['address'],
};

export const getAccountBalanceScheme = {
    id: 'GET /api/accounts/:address/balance',
    type: 'object',
    properties: {
        address: {
            type: 'string',
            format: 'address',
        },
    },
    required: ['address'],
};
