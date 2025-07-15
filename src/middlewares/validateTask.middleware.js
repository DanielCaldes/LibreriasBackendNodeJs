const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
        .messages({
        'string.base': `"title" debe ser una cadena`,
        'string.empty': `"title" no puede estar vacío`,
        'string.min': `"title" debe tener al menos {#limit} caracteres`,
        'any.required': `"title" es obligatorio`
        }),
    
    limitDate: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required()
        .messages({
        'string.pattern.base': `"limitDate" debe tener el formato YYYY-MM-DD`,
        'any.required': `"limitDate" es obligatorio`
        }),
    
    description: Joi.string()
        .default(''),

    completed: Joi.boolean()
        .default(false)
})

function validateTask(req, res, next) {
  const { error, value } = taskSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return next(error);
  req.body = value;
  next();
}

module.exports = validateTask;