export const createResponse = (
  data,
  code = 200,
  message?: string,
  error?: any
) => {
  return {
    data,
    code: code,
    message: message,
    error
  };
};
