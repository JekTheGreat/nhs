import DeviceInfo from "react-native-device-info";

let instance = null;

class DeviceID {
	static getInstance() {
		if (!instance) {
			instance = new DeviceID();
		}
		
		return instance;
	}
        
	getDevid(){
		return DeviceInfo.getUniqueId();
	}
}

export default DeviceID.getInstance();

// F640DEAF-7179-453B-ABC6-8137330AB358
// F640DEAF-7179-453B-ABC6-8137330AB358
// F640DEAF-7179-453B-ABC6-8137330AB358
// 812dc179da9eb51a1176afae8daa52df
