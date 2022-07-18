import { AnySchema, object } from 'yup';

interface ValidationObject {
  body?: AnySchema;
  params?: AnySchema;
  query?: AnySchema;
}

export function validate(obj: ValidationObject) {
  return async (req, res, next) => {
    try {
      for (const key of Object.keys(obj)) {
        if (['body', 'params'].includes(key)) {
          // validate and assign back only for body & params
          const schema = obj[key];
          console.log(req[key]);
          req[key] = await schema.validate(req[key], { abortEarly: false });
        } else if (['query'].includes(key)) {
          // validate only for query
          const schema = await obj[key];
          schema.validate(req[key], { abortEarly: false });
        }
        next();
      }
    } catch (e) {
      next(e);
    }
  };
}
