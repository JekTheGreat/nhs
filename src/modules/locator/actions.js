/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import _ from "lodash";
import GoogleAPI from "./api/index";
import * as Types from "./types";

export const setEnableFollowUser = (data) => ({
	type: Types.SET_FOLLOW_USER_ENABLE,
	data,
});

export const setCoordinate = (origin, destination) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SET_COORDINATION_LOAD });

			console.log("setCoordinate", origin, destination);


			const response = await GoogleAPI.getRoutes(origin, destination);

			if (!_.isEmpty(response)) {
				dispatch({ type: Types.SET_COORDINATION, data: response });
				dispatch(setEnableFollowUser(true));
			}
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.SET_COORDINATION_FAILED });
		}
	}
);

