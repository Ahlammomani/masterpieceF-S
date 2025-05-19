const Joi = require('joi');

const validateRegisterInput = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).pattern(/^[A-Za-z]+$/).required(), // فقط حروف إنجليزية وطول أكبر
    lastName: Joi.string().min(4).max(30).pattern(/^[A-Za-z]+$/).required(),
    email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required(), // دومين معين فقط
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')) // لازم تحتوي على حرف كبير، صغير، رقم، ورمز
      .required()
        .messages({
    'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters.',
    'string.max': 'Password must be less than 30 characters.'
  }),
    phoneNumber: Joi.string()
      .pattern(/^\+?[0-9]{10,14}$/) // يبدأ بـ + أو رقم فقط، وطوله بين 10 و 14 رقم
      .required()
  });
  return schema.validate(data);
};

const validateLoginInput = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org'] } }).required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'))
      .required()
  });
  return schema.validate(data);
};

module.exports = { validateRegisterInput, validateLoginInput };
