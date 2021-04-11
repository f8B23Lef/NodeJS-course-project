export default class BadRequestError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.code = 400;
  }
}
