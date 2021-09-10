/* eslint-disable no-throw-literal */
import axios from "axios";

class Request {
	constructor(host, apiSecret, contentype) {
		this.host = host;
		this.secret = apiSecret;
		this.contentype = contentype;
	}

	setToken = (token) => {
		this.token = token;
	}

	setFormData = (formdata) => {
		this.formdata = formdata;
	}

	get = (route) => this._request(route, "GET");

	post = (route, body) => this._request(route, "POST", body);

	patch = (route, body) => this._request(route, "PATCH", body);

	delete = (route) => this._request(route, "DELETE");

	_request = async (route, method, body) => {
		try {
			console.debug(method, this.host, route, this.formdata);
			const payload = {
				method,
				headers: {
					Accept: "application/json",
					"Content-Type": this.contentype || "application/json",
					"x-app-name": "com.ups.mobile",
					// "x-app-token": "1QdEOk4JB7cyOdlpr55r0fhisx90jLwH",
					"x-app-token": "ZLa82ZDfVY8m8AEBzzwlLbTbXMjEebL8",
				},
			};

			if (method !== "GET" && method !== "HEAD") {
				if (this.contentype) {
					payload.body = this.formdata;
				} else {
					payload.body = JSON.stringify(body);
				}
			}

			if (this.token) {
				payload.headers.Authorization = `Bearer ${this.token}`;
				payload.headers.token = this.token;
				payload.headers["x-account-token"] = `${this.token}`;
			}

			const url = `${this.host}${route}`;

			return await this._sendHttpRequest(url, payload);

		} catch (e) {
			throw e;
		}
	}

	_sendHttpRequest = async (url, payload) => {
		payload.url = url;
		console.log("REQUEST PAYLOAD");
		console.log(payload);

		const response = await fetch(url, payload);
		console.log("response", response);

		if (response.ok === false) {
			throw await response.json();
		}

		return response.json().catch(() => {
			return { message: "Success" };
		});
	}

	_sendHttpRequest3 = async (url, payload) => {
		payload.url = url;
		// payload.crossDomain = true;
		console.log("REQUEST PAYLOAD");
		console.log(payload);

		const response = await axios(payload);

		if (response.status === 400 || response.status === 401 ||
			response.status === 402 || response.status === 403 || response.status === 404) {
			throw await "asf";
		}

		return response;

		// throw await {code: response.status,
		// 	data: response.data};
	}
}

export default Request;
