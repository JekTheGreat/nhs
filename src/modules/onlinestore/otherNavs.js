import reducers from "./reducers";
import MyPurchases from "./containers/profile/myPurchases";
import Cart from "./containers/cartContainer";
import { createStackNavigator } from "react-navigation-stack";

import navigationOptions from "__src/components/navOpt";
export const onlinestore = reducers;


export default {
    MyPurchases: {
        screen: MyPurchases,
        navigationOptions,
    },
    Cart: {
        screen: Cart,
        navigationOptions,
    },
    // General: {
    // 	screen: General,
    // 	navigationOptions,
    // },
    // Setting: {
    // 	screen: Setting,
    // 	navigationOptions,
    // },
    // Terms: {
    // 	screen: Terms,
    // 	navigationOptions,
    // },
    // MyProfile: {
    // 	screen: MyProfile,
    // 	navigationOptions,
    // },
    // Verification: {
    // 	screen: Verification,
    // 	navigationOptions,
    // },

    // SecuritySetting: {
    // 	screen: SecuritySetting,
    // 	navigationOptions,
    // },
    // ...Accounts,
};
