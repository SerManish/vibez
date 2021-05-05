import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		// Clone the request and replace the original headers with
		// cloned headers, updated with the authorization.
		const token = localStorage.getItem('token');
		const BEARERTOKEN = token==null?'':token;
		const authReq = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${BEARERTOKEN}`)
		});

		
		// send cloned request with header to the next handler.
		return next.handle(authReq);
	}
}