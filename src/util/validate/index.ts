import { Request, Response } from 'express';
import Validator from 'ddk.registry/dist/util/validate';

import * as schemas from 'src/util/validate/schema';

const validator: Validator = new Validator({
    noTypeless: true,
    noExtraKeywords: true,
    noEmptyArrays: true,
    noEmptyStrings: true,
});

const isValidSchema: boolean = validator.validateSchema(Object.values(schemas));

if (!isValidSchema) {
    throw new Error('Invalid validation schema');
}

export const validate = (_target: any, _propertyName: string, descriptor: PropertyDescriptor) => {
    let descriptorFn = descriptor.value || descriptor.get();

    return {
        value: (req: Request, res: Response): any => {
            const schemaId = `${req.method} ${req.baseUrl}${req.route.path}`;
            const data = { ...req.params, ...req.query, ...req.body };

            validator.validate(data, schemaId, (errors: Array<Validator.SchemaError>, isValid: boolean) => {
                if (!isValid) {
                    res.send({ errors: [`Invalid arguments`, ...errors.map(err => err.message)] });
                    return;
                }
                return descriptorFn.call(this, req, res);
            });
        },
    };
};
