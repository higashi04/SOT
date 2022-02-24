const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});


const joi = BaseJoi.extend(extension)

module.exports.InvSchema = joi.object({
    inv: joi.object({
        nombre: joi.string().required().escapeHTML(),
        cantidad: joi.number().required().min(0)
    }).required()
});

module.exports.CompraSchema = joi.object({
    nombre: joi.string().required().escapeHTML(),
    telefono: joi.string().required().escapeHTML()
});