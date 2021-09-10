import Geocode from "react-geocode";

const Loc = {
	ipinfo: async () => {
		const result = await fetch("https://ipinfo.io/json")
			.then((data) => {
				return data.json();
			}).catch((error) => {
				throw error;
			});
		
		return result;
	},
	RetrieveLoc: async (latitude, longitude) => {
		try {
      
			Geocode.setApiKey("AIzaSyBlwy0fBLUKAN6AD9hw9jwWTbJoKA942ts");
			const location = await Geocode.fromLatLng(latitude, longitude).then(
				(response) => {
					return response;
				}
			).catch((err) => {
				throw err;
			});
			
			return location;
		} catch (e) {
			throw e;
		}
	},
};

export default Loc;
