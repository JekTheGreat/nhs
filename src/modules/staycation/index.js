/* eslint-disable */

// import Staycation from "./containers/Home";
// import Selected from "./containers/Selected";
import UserScreen from "./containers/User";
import ProfileScreen from "./containers/search/Profile";
import SearchList from "./containers/search/SearchList";
import ChooseDate from "./containers/search/ChooseDate";
import GuestScreen from "./containers/search/Guest";
import BookSuccess from "./containers/search/BookSuccess";
import BookSummary from "./containers/search/BookSummary";
import navigationOptions from "__src/components/navOpt";
import {createStackNavigator, TransitionSpecs, CardStyleInterpolators} from "react-navigation-stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import reducers from "./reducers";

export const staycation = reducers;

import {Easing, Animated} from 'react-native';

const fade = (props) => {
  const {index, current: {progress}} = props

  const translateX = 0
  const translateY = 0

  const opacity = progress.interpolate({
      inputRange: [index - 0.7, index, index + 0.7],
      outputRange: [0.3, 1, 0.3]
  })

  return {
      opacity,
      transform: [{translateX}, {translateY}]
  }
}

export const Stack1 = createStackNavigator(
	{
    ChooseDate: {
      screen: ChooseDate,
      navigationOptions
    },
    GuestScreen: {
      screen: GuestScreen,
      navigationOptions
    },
    BookSummary: {
      screen: BookSummary,
      navigationOptions
    },
    BookSuccess: {
      screen: BookSuccess,
      navigationOptions
    },
	},{
    // mode: "modal",
    defaultNavigationOptions: {
      // cardStyleInterpolator: (props) => fade(props),
      cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: "transparent"
      },
    },
  }
);

export default createStackNavigator(
	{
    UserScreen: {
      screen: UserScreen,
      navigationOptions
    },
    SearchList: {
      screen: SearchList,
      navigationOptions
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions
    },
    ChooseDate: {
      screen: ChooseDate,
      navigationOptions: {
        ...navigationOptions,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent"
        },
      }
    },
    GuestScreen: {
      screen: GuestScreen,
      navigationOptions: {
        ...navigationOptions,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: "transparent"
        },
      }
    },
    BookSummary: {
      screen: BookSummary,
      navigationOptions
    },
    BookSuccess: {
      screen: BookSuccess,
      navigationOptions
    },
	},{
    // mode: "modal",
    defaultNavigationOptions: {
      cardStyleInterpolator: (props) => fade(props),
      // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      // cardStyleInterpolator: ({ current: { progress } }) => {
      //   const translateX = 0
      //   const translateY = 0

      // //   const opacity = progress.interpolate({
      // //     inputRange: [index - 0.7, index, index + 0.7],
      // //     outputRange: [0.3, 1, 0.3]
      // // })

      //   const opacity = progress.interpolate({
      //     inputRange: [0, 0.5],
      //     outputRange: [0, 1],
      //     extrapolate: "clamp"
      //   })
      //   return { cardStyle: { opacity, transform: [{translateX}, {translateY}] } };
      // },
      gestureEnabled: false,
      // cardStyle: {
      //   backgroundColor: "transparent"
      // },
      transitionSpec: {
        open: TransitionSpecs.FadeInFromBottomAndroidSpec,
        close: TransitionSpecs.FadeOutToBottomAndroidSpec,
      },
      // transitionSpec: {
      //   timing: Animated.spring,
      //   tension: 10,
      //   useNativeDriver: true,
      // }
    },
  //   transitionConfig: () => ({
  //     screenInterpolator: (props) => {
  //         return fade(props)
  //     }
  // }),
  }
);

