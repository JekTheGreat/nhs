/* eslint-disable */
import Cloudinary from "__src/lib/Cloudinary";
import Request from "__src/lib/Request";

export const CloudUpload = new Cloudinary("ups-client", "security.msgApiKey");

// API CLOUDTEST CORE
export const CurrentApi = new Request("https://test-api.unified.ph/v1");
export const CurrentApiForm = new Request("https://test-api.unified.ph/v1", "", "multipart/form-data");

// API TEST CORE
// export const CurrentApi = new Request("http://10.10.20.21/v1");
// export const CurrentApiForm = new Request("http://10.10.20.21/v1", "", "multipart/form-data");

//API LIVE CORE
// export const CurrentApi = new Request("https://api-ups-v3-mla.unified.ph/v1");
// export const CurrentApiForm = new Request("https://api-ups-v3-mla.unified.ph/v1", "", "multipart/form-data");

// LOADING SERVICE
export const Loading = new Request("http://10.10.1.111:1000");
// export const Loading = new Request("http://10.10.20.21:5001");
// export const INTLoading = new Request("http://10.10.20.21:5001/airtime/ding", "a6d4dc4da6bdf848321afa60f3c36eed73455657eae7d4c1b21a6807b72c7b42");
// export const Loading = new Request("https://api-ups-v3-loading.unified.ph");
// export const INTLoading = new Request("https://api-ups-v3-loading.unified.ph/airtime/ding", "a6d4dc4da6bdf848321afa60f3c36eed73455657eae7d4c1b21a6807b72c7b42");

export const COUNTRYCODE = new Request("https://restcountries.eu/rest/v2/all");
// export const Remittance = new Request("http://10.10.1.201:1339/v3/remittance", "ad0add352a23c29d516f6606480342d9");
// export const RemittanceForm = new Request("http://10.10.1.201:1339/v3/remittance", "ad0add352a23c29d516f6606480342d9", "multipart/form-data");

export const Remittance = new Request("http://10.10.20.21:8005/v3/remittance");
export const RemittanceForm = new Request("http://10.10.20.21:8005/v3/remittance", "ad0add352a23c29d516f6606480342d9", "multipart/form-data");
// export const Remittance = new Request("http://35.240.154.204:1339/v3/remittance");
// export const BillsPayment = new Request("http://10.10.1.111:3000");
// export const BillsPayment = new Request("http://10.10.6.14:3003"); 
export const BillsPaymentForm = new Request("http://10.10.20.21:5002", "", "multipart/form-data");
export const BillsPayment = new Request("http://10.10.20.21:5002");
export const BillsPaymentTransact = new Request("http://10.10.20.21");

export const OnlineStore = new Request("http://10.10.1.45:1337");
export const OnlineStoreForm = new Request("http://10.10.1.45:1337", "", "multipart/form-data");

export const Staycation = new Request("http://10.10.1.106:8991", "EB69B5D49ABE1CCAF44FFE5241D7EED33B9C8A003988EBB74B4861BEC4351CD4");

export const Ticketing = new Request("http://10.10.1.119:8008");
// export const Ticketing = new Request("http://10.10.20.23:8008");

export const setToken = (id) => {
	CurrentApi.setToken(id);
	CurrentApiForm.setToken(id);
	BillsPaymentForm.setToken(id);
	Loading.setToken(id);
	BillsPayment.setToken(id);
	BillsPaymentTransact.setToken(id);
	OnlineStore.setToken(id);
	OnlineStoreForm.setToken(id);
	Ticketing.setToken(id);
	Remittance.setToken(id);
	RemittanceForm.setToken(id);
};

export const setFormData = (id) => {
	CurrentApi.setFormData(id);
	CurrentApiForm.setFormData(id);
	BillsPaymentForm.setFormData(id);
	OnlineStoreForm.setFormData(id);
	RemittanceForm.setFormData(id);
};
