import AsyncStorage from "@react-native-community/async-storage";
const SESSION_STORAGE_KEY = "UnifiedAppState:Session";
const FUND_STORAGE_KEY = "UnifiedAppState:Fund";
const states = {};

export async function sessionSnapshot() {
	states.session = await rehydrate(SESSION_STORAGE_KEY);
	states.fetchResponse = await rehydrate(FUND_STORAGE_KEY);

	if (states.hasOwnProperty("session")) {
		return states;
	}

	return null;
}

export async function fundSnapshot() {
	const state = await rehydrate(FUND_STORAGE_KEY);

	if (state) {
		return state;
	}

	return null;
}

export async function saveSnapshot(type, session) {
	if (type ===  1){
		await persist(SESSION_STORAGE_KEY, session);
		
		return;
	}
	console.log(session);
	await persist(FUND_STORAGE_KEY, session);
}

export async function clearSnapshot() {
	await clear();
}

/**
 * Saves provided state object to async storage
 *
 * @returns {Promise}
 */
async function persist(KEY, state) {
	try {
		await AsyncStorage.setItem(KEY, JSON.stringify(state));
	} catch (e) {
		console.error("Error persisting application state", e);
	}
}

/**
 * Reads state object from async storage
 *
 * @returns {Promise}
 */
async function rehydrate(KEY) {
	try {
		const state = await AsyncStorage.getItem(KEY);

		
		return state ? JSON.parse(state) : null;
	} catch (e) {
		console.error("Error reading persisted application state, please re-login.", e);
		
		return null;
	}
}

async function clear() {
	try {
		await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
		await AsyncStorage.removeItem(FUND_STORAGE_KEY);
	} catch (e) {
		console.error("Error clearing peristed application state, please re-login.", e);
	}
}
