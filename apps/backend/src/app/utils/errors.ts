export class ServerError extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message);
  }
}
