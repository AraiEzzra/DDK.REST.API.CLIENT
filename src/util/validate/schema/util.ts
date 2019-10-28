export const makeKeyPair = {
    id: 'POST /api/utils/make-key-pair',
    type: 'object',
    properties: {
        secret: {
            type: 'string',
            format: 'secret',
        },
    },
    required: ['secret'],
};
