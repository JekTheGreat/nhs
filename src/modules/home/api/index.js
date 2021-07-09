/* eslint-disable max-len */
import * as globals from "__src/globals";
import _ from 'lodash';

const API = {
    getArticles: async () => {
        try {
            const result = await globals.CurrentApi.get(`articles?page=1&limit=10`);
            return result;
        } catch (e) {
            throw e;
        }
    },
};

export default API;
