import { PAGINATION_SCHEME } from 'ddk.registry/dist/util/validate/scheme/filter';

export const geBlockByIdScheme = {
    id: 'GET /api/blocks/:id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'id',
        },
    },
    required: ['id'],
};

export const getblocksScheme = {
    id: 'POST /api/blocks/getMany',
    type: 'object',
    properties: {
        ...PAGINATION_SCHEME,
    },
    required: ['limit', 'offset'],
};
