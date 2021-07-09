/* eslint-disable max-len */
import Polyline from "@mapbox/polyline";

const GoogleAPI = {
	getRoutes: async (startLoc, destinationLoc) => {
		try {
			console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyBlwy0fBLUKAN6AD9hw9jwWTbJoKA942ts`);
			const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyBlwy0fBLUKAN6AD9hw9jwWTbJoKA942ts`);
			const respJson = await resp.json();
			const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			const coords = points.map((point) => {
				return  {
					latitude: point[0],
					longitude: point[1],
				};
			});
			
			return coords;
		} catch (e) {
			throw e;
		}
	},
};

export default GoogleAPI;
