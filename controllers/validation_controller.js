// Validation
const Joi = require('joi');

// validates the register entry
module.exports.registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
    
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        age: Joi.number()
            .greater(13)
            .less(60)
            .required(),
        mv1: Joi.string()
                .required(),
        mv1Rating: Joi.number()
                    .greater(0)
                    .less(6)
                    .required(),
        mv2: Joi.string()
                .required(),
        mv2Rating: Joi.number()
                .greater(0)
                .less(6)
                .required(),
        mv3: Joi.string()
                .required(),
        mv3Rating: Joi.number()
                .greater(0)
                .less(6)
                .required(),
        mv4: Joi.string()
                .required(),
        mv4Rating: Joi.number()
                .greater(0)
                .less(6)
                .required(),
        mv5: Joi.string()
                .required(),
        mv5Rating: Joi.number()
                .greater(0)
                .less(6)
                .required(),
    });
    return schema.validate(data);
}
// validates the login entry
module.exports.loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}