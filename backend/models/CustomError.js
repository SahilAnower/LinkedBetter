export class CustomError extends Error {
  constructor(message, errorCode) {
    super();
    this.name = this.constructor.name;
    this.timeStamp = new Date().toISOString();
    this.errorCode = errorCode;
    this.originalError = null;
    this.message = message;
  }
}
