import SelectionScreen from './containers/Selectionscreen';

import reducers from "./reducers";

export const home = reducers;
export default {
    SelectionScreen: {
        screen: SelectionScreen,
        navigationOptions: {
            headerStyle: { backgroundColor: "white" },
            headerTitle: ""
        },
    },
}