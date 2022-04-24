import * as Joi from 'joi';

import { commonValidator } from '../common/common.validator';

// @ts-ignore
// @ts-ignore
export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('Email not valid'), trim(),
        password: Joi.string().required(),min().message('Password not valid').trim()
    })
};