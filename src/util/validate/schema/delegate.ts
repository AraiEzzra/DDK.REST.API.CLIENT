import { PAGINATION_SCHEME } from 'ddk.registry/dist/util/validate/scheme/filter';

export const getDelegates = {
    id: 'POST /api/delegate/getDelegates',
    type: 'object',
    properties: {
        ...PAGINATION_SCHEME,
        username: {
            type: 'string',
            minLength: 3,
        },
        sort: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['ASC', 'DESC', 'approval', 'publicKey', 'votes', 'username'],
                },
            },
        },
    },
    required: ['limit', 'offset'],
};

export const getActiveDelegates = {

    id: 'POST /api/delegate/getActiveDelegates',
    type: 'object',
    properties: {
        ...PAGINATION_SCHEME,
    },
    required: ['limit', 'offset'],
};


