import * as Types from "./types";
import { Alert } from "react-native";
import API from './api/index'
import _ from "lodash";

export const selectionData = (data) => ({
	type: Types.SELECTION_DATA,
	data,
});


export const getArticles = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			const result = await API.getArticles();
			if (result) {
				dispatch({ type: Types.GET_ARTICLES, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error: error });

		}
	}
);
