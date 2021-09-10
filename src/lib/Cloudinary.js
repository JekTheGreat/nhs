import moment from "moment";
import sha1 from "crypto-js/sha1";

class Cloudinary {
	imageUpload (file, access, callback, progress) {
		const timestamp = (Date.now() / 1000 | 0).toString();
		const time = "timestamp=";
		const hashString = time.concat(timestamp, "bugpuRzauKW8dTks2rI9XZvd-Ls");
		const signature = sha1(hashString).toString();

		const cloudres = "https://res.cloudinary.com/";
		const cloudapi = "https://api.cloudinary.com/v1_1/";

		const cloudinaryResult = cloudres.concat("unified",
			"/image/upload");

		const cloudinaryUrl = cloudapi.concat("unified",
			"/image/upload");

		access(cloudinaryResult);
		const formdata = new FormData();

		formdata.append("file", {
			uri: file.data,
			type: file.type,
			name: file.name.concat("-photo"),
		});
		// formdata.append("file", file.data);
		formdata.append("timestamp", timestamp);
		formdata.append("api_key", "734762883283271");
		formdata.append("signature", signature);
		const xhr = new XMLHttpRequest();

		xhr.open("POST", cloudinaryUrl);
		xhr.onload = () => {
			const uploadData = JSON.parse(xhr.responseText);

			callback(uploadData);
		};
		xhr.onprogress = (e) => {
			progress((e.loaded / e.total));
		};

		xhr.send(formdata);
	}

	fileUpload (userId, file, access, callback, progress){
		const timestamp = moment().unix().toString();
		const cloudres = "https://api.cloudinary.com/v1_1/";
		// const cloudapi = "https://api.cloudinary.com/v1_1/";
		const time = "timestamp=";
		const hashString = time.concat(timestamp, "bugpuRzauKW8dTks2rI9XZvd-Ls");
		const signature = sha1(hashString).toString();

		const cloudinaryResult = cloudres.concat("unified",
			"/auto/upload?resource_type=raw");

		access(cloudinaryResult);
		const xhr = new XMLHttpRequest();

		xhr.open("POST", cloudinaryResult);
		xhr.onload = () => {
			const uploadRawFile = JSON.parse(xhr.responseText);

			callback(uploadRawFile);
		};
		xhr.onprogress = (e) => {
			progress((e.loaded / e.total));
		};
		const formdata = new FormData();

		formdata.append("file", {
			uri: file.data,
			type: "raw",
			name: userId.concat("-photo"),
		});
		formdata.append("timestamp", timestamp);
		formdata.append("api_key", "734762883283271");
		formdata.append("signature", signature);
		xhr.send(formdata);
	}

	imageTransform = (url, parameters) => {
		// const baseUrl = "https://res.cloudinary.com/dfye5ppzo/image/upload";
		const baseUrl = "https://res.cloudinary.com/unified/image/upload";

		if (!url || url instanceof Blob){
			return url;
		}

		const checkUrl = url.substring(8, 22);

		if (checkUrl === "res.cloudinary"){
			const filename = url.substring(url.lastIndexOf("/") + 1);

			if (parameters) {
				return `${baseUrl}/${parameters},q_auto/${filename}`;
			}

			return `${baseUrl}/q_auto/${filename}`;
		}

		return url;
	}
}

export default Cloudinary;
