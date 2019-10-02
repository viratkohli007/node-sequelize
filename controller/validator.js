const joi = require('joi')

export const register = {
    body: {
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    }
}

export const login = {
    body: {
        email: joi.string().required(),
        password: joi.string().required()
    }
}