export class ErrorEntity {
  code: number;
  message: string;
  details?: any;

  constructor(code: number, message: string, details?: any) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}
