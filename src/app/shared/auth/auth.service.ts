import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

import { environment } from "../../../env/environment";
import { Exception, ExceptionCode } from "../exception/exception";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token?: string;

    get logined() {
        return !!this._token;
    }

    constructor(
        private http: HttpClient
    ) {
        const savedToken = localStorage.getItem('token');

        if (savedToken) this._token = savedToken;
    }

    public getToken(): string {
        if (!this._token) throw new Exception(401);

        return this._token;
    }

    public setToken(token: string) {
        this._token = token;
        localStorage.setItem('token', token);
    }

    public login(username: string, password: string) {
        return this.http.post<{message: string, token: string}>(`${environment.API_URL}/login`, {
            login: username,
            password: password
        })
        .pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Exception(error.status as ExceptionCode));
            })
        );
    }
}