export class ServerException extends Error {
  constructor(public message: string, public statusCode = 500) {
    super(message);
  }
}

export class NotFoundException extends ServerException {
  constructor(message: string) {
    super(message, 404);
  }
}
