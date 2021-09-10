const env = process.env.NODE_ENV || "development";


const security = {
	development: {
		currentSecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViamVjdCI6IlNPRlQiLCJpYXQiOjE1NjcwNjgzMTF9.vd_mXB0YfjJrXfMx75Ut3dU-xyqPt4G-7HVE60s0gXE",
		currentApiUrl: "https://api-ups-v3-mla.unified.ph/v1",
		// currentApiUrl: "http://10.10.20.21/v1",
		redirectUri: "https://beta.unified.ph/login",
		loadingApiUrl: "https://api-ups-v3-loading.unified.ph/airtime",
		loadingSecret: "a6d4dc4da6bdf848321afa60f3c36eed73455657eae7d4c1b21a6807b72c7b42",
		remittance: "http://10.10.1.201:1339/v3/remittance/",
	},

	test: {
		currentSecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViamVjdCI6IlNPRlQiLCJpYXQiOjE1NjcwNjgzMTF9.vd_mXB0YfjJrXfMx75Ut3dU-xyqPt4G-7HVE60s0gXE",
		currentApiUrl: "https://api-ups-v3-mla.unified.ph/v1",
		redirectUri: "https://unified-v3-test.firebaseapp.com/#/login",
		loadingApiUrl: "https://api-ups-v3-loading.unified.ph/airtime",
		loadingSecret: "a6d4dc4da6bdf848321afa60f3c36eed73455657eae7d4c1b21a6807b72c7b42",
		remittance: "https://remittance-staging.unified.ph/v3/remittance/",
	},

	production: {
		currentSecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViamVjdCI6IlNPRlQiLCJpYXQiOjE1NjcwNjgzMTF9.vd_mXB0YfjJrXfMx75Ut3dU-xyqPt4G-7HVE60s0gXE",
		currentApiUrl: "https://api-ups-v3-mla.unified.ph/v1",
		redirectUri: "https://beta.unified.ph/login",
		loadingApiUrl: "https://api-ups-v3-loading.unified.ph/airtime",
		loadingSecret: "a6d4dc4da6bdf848321afa60f3c36eed73455657eae7d4c1b21a6807b72c7b42",
		remittance: "https://remittance.unified.ph/v3/remittance/",
	},
};

export default security[env];
