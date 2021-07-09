/* eslint-disable */
let instance = null;
import React from "react";
import Color from "./styles/color";
import Elavated from "./customize/ElevatedView";
import ReadMore from "./customize/ReadMore";
import Card from "./images/cards/index";
import Home from "./svg/Home";
import _ from "lodash";

class ImgResource {
	static getInstance() {
		if (!instance) {
			instance = new ImgResource();
		}

		return instance;
	}

	constructor() {

		this.imgs = {
			// COUNTRY FLAG
			none: require("./images/flag/(none).png"),
			ad: require("./images/flag/ad.png"),
			AED: require("./images/flag/AED.png"),
			AFN: require("./images/flag/AFN.png"),
			ALL: require("./images/flag/ALL.png"),
			AMD: require("./images/flag/AMD.png"),
			ANG: require("./images/flag/ANG.png"),
			AOA: require("./images/flag/AOA.png"),
			ARS: require("./images/flag/ARS.png"),
			as: require("./images/flag/as.png"),
			at: require("./images/flag/at.png"),
			AUD: require("./images/flag/AUD.png"),
			AWG: require("./images/flag/AWG.png"),
			ax: require("./images/flag/ax.png"),
			AZN: require("./images/flag/AZN.png"),
			BAM: require("./images/flag/BAM.png"),
			BBD: require("./images/flag/BBD.png"),
			BDT: require("./images/flag/BDT.png"),
			be: require("./images/flag/be.png"),
			bf: require("./images/flag/bf.png"),
			BGN: require("./images/flag/BGN.png"),
			BHD: require("./images/flag/BHD.png"),
			BIF: require("./images/flag/BIF.png"),
			BMD: require("./images/flag/BMD.png"),
			BND: require("./images/flag/BND.png"),
			BOB: require("./images/flag/BOB.png"),
			BRL: require("./images/flag/BRL.png"),
			BSD: require("./images/flag/BSD.png"),
			BTN: require("./images/flag/BTN.png"),
			BWP: require("./images/flag/BWP.png"),
			BYN: require("./images/flag/BYN.png"),
			BYR: require("./images/flag/BYR.png"),
			BZD: require("./images/flag/BZD.png"),
			CAD: require("./images/flag/CAD.png"),
			CDF: require("./images/flag/CDF.png"),
			cf: require("./images/flag/cf.png"),
			cg: require("./images/flag/cg.png"),
			CHF: require("./images/flag/CHF.png"),
			ci: require("./images/flag/ci.png"),
			CKD: require("./images/flag/CKD.png"),
			CLP: require("./images/flag/CLP.png"),
			CNY: require("./images/flag/CNY.png"),
			COP: require("./images/flag/COP.png"),
			CRC: require("./images/flag/CRC.png"),
			CUC: require("./images/flag/CUC.png"),
			CUP: require("./images/flag/CUP.png"),
			CVE: require("./images/flag/CVE.png"),
			cx: require("./images/flag/cx.png"),
			cy: require("./images/flag/cy.png"),
			CZK: require("./images/flag/CZK.png"),
			de: require("./images/flag/de.png"),
			DJF: require("./images/flag/DJF.png"),
			DKK: require("./images/flag/DKK.png"),
			dm: require("./images/flag/dm.png"),
			DOP: require("./images/flag/DOP.png"),
			DZD: require("./images/flag/DZD.png"),
			ec: require("./images/flag/ec.png"),
			ee: require("./images/flag/ee.png"),
			EGP: require("./images/flag/EGP.png"),
			ERN: require("./images/flag/ERN.png"),
			es: require("./images/flag/es.png"),
			ETB: require("./images/flag/ETB.png"),
			EUR: require("./images/flag/EUR.png"),
			fi: require("./images/flag/fi.png"),
			FJD: require("./images/flag/FJD.png"),
			FKP: require("./images/flag/FKP.png"),
			fm: require("./images/flag/fm.png"),
			fr: require("./images/flag/fr.png"),
			ga: require("./images/flag/ga.png"),
			GBP: require("./images/flag/GBP.png"),
			gd: require("./images/flag/gd.png"),
			GEL: require("./images/flag/GEL.png"),
			gg: require("./images/flag/gg.png"),
			GHS: require("./images/flag/GHS.png"),
			GIP: require("./images/flag/GIP.png"),
			gl: require("./images/flag/gl.png"),
			GMD: require("./images/flag/GMD.png"),
			GNF: require("./images/flag/GNF.png"),
			gq: require("./images/flag/gq.png"),
			gr: require("./images/flag/gr.png"),
			gs: require("./images/flag/gs.png"),
			GTQ: require("./images/flag/GTQ.png"),
			gu: require("./images/flag/gu.png"),
			gw: require("./images/flag/gw.png"),
			GYD: require("./images/flag/GYD.png"),
			HKD: require("./images/flag/HKD.png"),
			HNL: require("./images/flag/HNL.png"),
			HRK: require("./images/flag/HRK.png"),
			HTG: require("./images/flag/HTG.png"),
			HUF: require("./images/flag/HUF.png"),
			IDR: require("./images/flag/IDR.png"),
			ie: require("./images/flag/ie.png"),
			ILS: require("./images/flag/ILS.png"),
			INR: require("./images/flag/INR.png"),
			io: require("./images/flag/io.png"),
			IQD: require("./images/flag/IQD.png"),
			IRR: require("./images/flag/IRR.png"),
			ISK: require("./images/flag/ISK.png"),
			it: require("./images/flag/it.png"),
			JMD: require("./images/flag/JMD.png"),
			JOD: require("./images/flag/JOD.png"),
			JPY: require("./images/flag/JPY.png"),
			KES: require("./images/flag/KES.png"),
			KGS: require("./images/flag/KGS.png"),
			KHR: require("./images/flag/KHR.png"),
			ki: require("./images/flag/ki.png"),
			KMF: require("./images/flag/KMF.png"),
			kn: require("./images/flag/kn.png"),
			kp: require("./images/flag/kp.png"),
			KPW: require("./images/flag/KPW.png"),
			KRW: require("./images/flag/KRW.png"),
			KWD: require("./images/flag/KWD.png"),
			KYD: require("./images/flag/KYD.png"),
			KZT: require("./images/flag/KZT.png"),
			LAK: require("./images/flag/LAK.png"),
			LBP: require("./images/flag/LBP.png"),
			LKR: require("./images/flag/LKR.png"),
			LRD: require("./images/flag/LRD.png"),
			LSL: require("./images/flag/LSL.png"),
			LYD: require("./images/flag/LYD.png"),
			MAD: require("./images/flag/MAD.png"),
			MDL: require("./images/flag/MDL.png"),
			MGA: require("./images/flag/MGA.png"),
			MKD: require("./images/flag/MKD.png"),
			MMK: require("./images/flag/MMK.png"),
			MNT: require("./images/flag/MNT.png"),
			MOP: require("./images/flag/MOP.png"),
			MRO: require("./images/flag/MRO.png"),
			MUR: require("./images/flag/MUR.png"),
			MVR: require("./images/flag/MVR.png"),
			MWK: require("./images/flag/MWK.png"),
			MXN: require("./images/flag/MXN.png"),
			MYR: require("./images/flag/MYR.png"),
			MZN: require("./images/flag/MZN.png"),
			NAD: require("./images/flag/NAD.png"),
			NGN: require("./images/flag/NGN.png"),
			NIO: require("./images/flag/NIO.png"),
			NOK: require("./images/flag/NOK.png"),
			NPR: require("./images/flag/NPR.png"),
			NZD: require("./images/flag/NZD.png"),
			OMR: require("./images/flag/OMR.png"),
			PAB: require("./images/flag/PAB.png"),
			PEN: require("./images/flag/PEN.png"),
			PGK: require("./images/flag/PGK.png"),
			PHP: require("./images/flag/php.png"),
			PKR: require("./images/flag/PKR.png"),
			PLN: require("./images/flag/PLN.png"),
			PYG: require("./images/flag/PYG.png"),
			QAR: require("./images/flag/QAR.png"),
			RON: require("./images/flag/RON.png"),
			RSD: require("./images/flag/RSD.png"),
			RUB: require("./images/flag/RUB.png"),
			RWF: require("./images/flag/RWF.png"),
			SAR: require("./images/flag/SAR.png"),
			SBD: require("./images/flag/SBD.png"),
			SCR: require("./images/flag/SCR.png"),
			SDG: require("./images/flag/SDG.png"),
			SEK: require("./images/flag/SEK.png"),
			SGD: require("./images/flag/SGD.png"),
			SHP: require("./images/flag/SHP.png"),
			si: require("./images/flag/si.png"),
			sk: require("./images/flag/sk.png"),
			SLL: require("./images/flag/SLL.png"),
			sm: require("./images/flag/sm.png"),
			SOS: require("./images/flag/SOS.png"),
			SRD: require("./images/flag/SRD.png"),
			SSP: require("./images/flag/SSP.png"),
			STD: require("./images/flag/STD.png"),
			SYP: require("./images/flag/SYP.png"),
			SZL: require("./images/flag/SZL.png"),
			THB: require("./images/flag/THB.png"),
			TJS: require("./images/flag/TJS.png"),
			TMT: require("./images/flag/TMT.png"),
			TND: require("./images/flag/TND.png"),
			TOP: require("./images/flag/TOP.png"),
			TRY: require("./images/flag/TRY.png"),
			TTD: require("./images/flag/TTD.png"),
			TWD: require("./images/flag/TWD.png"),
			TZS: require("./images/flag/TZS.png"),
			UAH: require("./images/flag/UAH.png"),
			UGX: require("./images/flag/UGX.png"),
			USD: require("./images/flag/USD.png"),
			UYU: require("./images/flag/UYU.png"),
			UZS: require("./images/flag/UZS.png"),
			va: require("./images/flag/va.png"),
			vc: require("./images/flag/vc.png"),
			VEF: require("./images/flag/VEF.png"),
			vg: require("./images/flag/vg.png"),
			vi: require("./images/flag/vi.png"),
			VND: require("./images/flag/VND.png"),
			VUV: require("./images/flag/VUV.png"),
			wf: require("./images/flag/wf.png"),
			WST: require("./images/flag/WST.png"),
			XAF: require("./images/flag/XAF.png"),
			XCD: require("./images/flag/XCD.png"),
			XOF: require("./images/flag/XOF.png"),
			XPF: require("./images/flag/XPF.png"),
			YER: require("./images/flag/YER.png"),
			yt: require("./images/flag/yt.png"),
			yu: require("./images/flag/yu.png"),
			ZAR: require("./images/flag/ZAR.png"),
			ZMW: require("./images/flag/ZMW.png"),
			zw: require("./images/flag/zw.png"),
			date_icon: require("./images/date_icon.png"),
		};

		this.string = {
			// PHP: "Philippine Wallet",
			// HKD: "Hongkong Wallet",
			// SGD: "Singapore Wallet",
			// AED: "United States Emirate Wallet",
		};

		this.svg = {
			// BOTTOM TABBAR
			Home: <Home />,
		};
	}

	get(name) {
		return this.imgs[name];
	}

	get(name) {
		return this.imgs[name];
	}

	getString(name) {
		return this.string[name];
	}

	getSVG(name) {
		return this.svg[name];
	}
}

const Resource = {
	Color, Elavated, Card,
	ReadMore, Res: ImgResource.getInstance(),
};

export default Resource;
