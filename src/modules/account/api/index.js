/*eslint-disable*/
import * as globals from "__src/globals";

const Account = {

	postPassword: async (param) => {
		try {
			const result = await globals.CurrentApi.post(`/users/requests/change/password`, {...param});
			return result;
		} catch (e) {
			throw e;
		}
  },
  postPin: async (param) => {
		try {
			const result = await globals.CurrentApi.post(`/users/pins`, {...param});
			return result;
		} catch (e) {
			throw e;
		}
	},
};
export default Account;
