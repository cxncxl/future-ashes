import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../env/environment";
import { catchError, throwError } from "rxjs";
import { Exception, ExceptionCode } from "../shared/exception/exception";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(
        private http: HttpClient
    ) {}

    public signup(username: string, password: string) {
        return this.http.post<{message: string, token: string}>(`${environment.API_URL}/register`, {
            login: username,
            password: password,
            nickname: username
        }).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => {
                    const exception = new Exception(error.status as ExceptionCode);

                    if (error.status === 400) {
                        exception.message = error.error.message;
                    }

                    return exception;
                });
            })
        )
    }
}