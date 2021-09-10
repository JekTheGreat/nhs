/* eslint-disable max-len */
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
	ipinfo2: async () => {
		const result = await fetch("https://api.ipdata.co/?api-key=1f08abc064c2429d95e710644533e208c84fac2942f14983985b2f50")
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
	FacebookLogin: async (userid, token) => {
		const result = await fetch(`https://graph.facebook.com/v3.2/${userid}?fields=id,name,first_name,middle_name,last_name,email&access_token=${token}`)
			.then((data) => {
				return data.json();
			}).catch((error) => {
				throw error;
			});
		
		return result;
	},
};

export default Loc;
