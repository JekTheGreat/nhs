import * as Enums from "../commons/enums";

class Network {
	_checkType = (type) => {
		let points = 0;

		switch (type) {
		case Enums.UNIFIED_GLOBAL_DEALER:
			points = 1500;
			break;
		case Enums.UNIFIED_PINOY_DEALER:
			points = 750;
			break;
		case Enums.UNIFIED_SUBDEALER:
			points = 500;
			break;
		case Enums.UNIFIED_RETAILER:
		default:
			points = 50;
			break;
		}

		return points;
	}

	_checkIndirectType = (type) => {
		let points = 0;

		switch (type) {
		case Enums.UNIFIED_GLOBAL_DEALER:
			points = 60;
			break;
		case Enums.UNIFIED_PINOY_DEALER:
			points = 30;
			break;
		case Enums.UNIFIED_SUBDEALER:
			points = 20;
			break;
		case Enums.UNIFIED_RETAILER:
		default:
			points = 0;
			break;
		}

		return points;
	}

	_checkDirectType = (type) => {
		let points = 0;

		switch (type) {
		case Enums.UNIFIED_GLOBAL_DEALER:
			points = 1000;
			break;
		case Enums.UNIFIED_PINOY_DEALER:
			points = 500;
			break;
		case Enums.UNIFIED_SUBDEALER:
			points = 300;
			break;
		case Enums.UNIFIED_RETAILER:
		default:
			points = 100;
			break;
		}

		return points;
	}

	checkPoints = (upline, downline, ptype) => {
		let up = 0;
		let dp = 0;
		let points = 0;

		switch (ptype) {
		case "LRPOINTS":
			up = this._checkType(upline.subType);
			dp = this._checkType(downline.subType);
			break;
		case "DIRECT":
			up = this._checkDirectType(upline.subType);
			dp = this._checkDirectType(downline.subType);
			break;
		case "INDIRECT":
		default:
			up = this._checkIndirectType(upline.subType);
			dp = this._checkIndirectType(downline.subType);
			break;
		}

		if (dp === up) {
			points = dp || up;
		} else if (dp > up) {
			points = up;
		} else if (dp < up) {
			points = dp;
		}

		return points;
	}
}

export default Network;
