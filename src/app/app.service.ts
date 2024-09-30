import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { Exception, ExceptionCode } from "./shared/exception/exception";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private http: HttpClient
    ) {}

    public tokenValid() {
        return this.http.get(`${environment.API_URL}/me`)
                        .pipe(
                            catchError((error) => {
                                return throwError(() => new Exception(error.status as ExceptionCode))
                            })
                        )
    }
}