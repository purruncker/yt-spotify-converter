import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorOwn } from "./http.interceptor";


export const interceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorOwn, multi: true }
]