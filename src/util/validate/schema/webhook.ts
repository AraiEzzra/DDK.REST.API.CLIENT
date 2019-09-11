export const onConfirmTransaction = {
    id: 'POST /api/webhook/subscribe/confirm-transaction',
    type: 'object',
    properties: {
        transactionId: {
            type: 'string',
            format: 'id',
        },
        url: {
            type: 'string',
        },
    },
    required: ['url', 'transactionId'],
};
