export class AuthError {
  private code: string;
  private message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
