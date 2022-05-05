const {InvSchema, CompraSchema} = require('./schemas');
const ExpressError = require('./expressError');

module.exports.validaInv = (req, res, next) => {
    const { error } = InvSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
// module.exports.validaCompra = (req, res, next) => {
//     const { error } = CompraSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }