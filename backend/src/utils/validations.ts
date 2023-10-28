import Joi from 'joi';

export const urlShortenSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })  // Ensure that the URL is valid and uses the HTTP/HTTPS scheme
    .required(),                        // The URL is a required field
});

export const urlRetrieveSchema = Joi.object({
  shortCode: Joi.string()
    .alphanum()                         // The shortcode should be alphanumeric
    .length(parseInt(process.env.SHORT_CODE_LENGTH ?? "5"))  // Ensure that the shortcode is the correct length ( this is optional though since the length can be changed through an environment variable)
    .required(),                        // The shortcode is a required field
});


