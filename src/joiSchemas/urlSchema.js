import joi from "joi";

// FIX: VERIFICAR URI VÁLIDAS E TALVES REGEX
export const longUrlSchema = joi.object({
    url: joi.string().uri().required()
});