export class Exception extends Error {
    code: number;
  
    constructor(code: ExceptionCode) {
        super();

        this.code = code;
        this.message = ExceptionMessage[code];
    }
}

export type ExceptionCode = 400 | 401 | 500;

const ExceptionMessage: Record<ExceptionCode, string> = {
    400: 'You entered incorrect data',
    401: 'Invalid login or password',
    500: 'Oops! Something went wrong. We\'re already beating up our backend team'
};