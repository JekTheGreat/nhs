/* eslint-disable no-useless-escape */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disble */
import { readFile, readdir, writeFile } from "fs";
import { resolve as _resolve, join } from "path";
const svgDir = _resolve(__dirname, "../images/svg");
 
function readfile(filename) {
	return new Promise((resolve, reject) => {
		readFile(join(svgDir, filename), "utf8", (err, data) => {
			console.log(data.replace(/<\?xml.*?\?>|<\!--.*?-->|<!DOCTYPE.*?>/g, ""));
			if (err) {
				reject(err);
			}
			resolve({
				[filename.slice(0, filename.lastIndexOf("."))]: data,
			});
		});
	});
}
 
function readSvgs() {
	return new Promise((resolve, reject) => {
		readdir(svgDir, (err, files) => {
			if (err) {
				reject(err);
			}
			Promise.all(files.map((filename) => readfile(filename)))
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	});
}
 
readSvgs().then((data) => {
	const svgFile = `export default ${JSON.stringify(Object.assign.apply(this, data))}`;

	writeFile(_resolve(__dirname, "./svgs.js"), svgFile, (err) => {
		if (err) {
			throw new Error(err);
		}
	});
}).catch((err) => {
	throw new Error(err);
});
