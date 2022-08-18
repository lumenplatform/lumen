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
    error,
  };
};

export const sendJSON = (res, code = 200, message?: string, error?: any) => {
  return (data) => res.json(createResponse(data, code, message, error));
};
