/* eslint-disable */
import Request from "__src/lib/Request";

export const CurrentApi = new Request("https://60e47bc85bcbca001749ea4b.mockapi.io/");

export const setToken = (id) => {
    CurrentApi.setToken(id);
};

export const setFormData = (id) => {
    CurrentApi.setFormData(id);
};
