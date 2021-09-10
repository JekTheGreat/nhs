/* eslint-disable */
import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import styles from "../../../styles.css";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from "react-native-maps";
import _ from "lodash";
const { Color } = Resources;

const CUSTOM_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
class FifthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const duration = 500

  //   if (this.props.coordinate !== nextProps.coordinate) {
  //     if (Platform.OS === 'android') {
  //       if (this.marker) {
  //         this.marker._component.animateMarkerToCoordinate(
  //           nextProps.coordinate,
  //           duration
  //         );
  //       }
  //     } else {
  //       this.state.coordinate.timing({
  //         ...nextProps.coordinate,
  //         duration
  //       }).start();
  //     }
  //   }
  // }

  onNext = () => {
    const { actions, staycation: { setInputDetails } } = this.props;
    const geometry = _.has(setInputDetails, "fourth.geometry") ? setInputDetails.fourth.geometry : {};
    const newInput = _.merge({}, setInputDetails);
    newInput.geo = geometry;
    actions.setInputDetails(newInput);
    actions.setStaycationScreen("sixth");
  }

  render() {
    const { actions, staycation: { setInputDetails } } = this.props;
    const geometry = _.has(setInputDetails, "fourth.geometry") ? setInputDetails.fourth.geometry : {};
    return (
      <ScrollView style={styles.padH20}>
        <View style={styles.marT30}>
          <Text style={styles.labelText}>Is the pin in the right place?</Text>
          <Text style={{ fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2, marginTop: 10 }}>
            If needed, you can click "back button" to adjust its location. Only confirmed guests will see this, so they know how to get to your place.
          </Text>
          <Text style={[styles.labelText2, { marginTop: 20, }]}>
            Google Maps
          </Text>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
            <View style={{ marginRight: 5 }}>
              <Icon name='pin' type='entypo' size={17} color={Color.lightBlack} />
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 14, color: Color.red, fontWeight: "bold" }}>
                {setInputDetails.desc}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 5 }}>
            <MapView
              mapType="standard"
              style={{ ...StyleSheet.absoluteFill, height: 300 }}
              // provider={PROVIDER_GOOGLE}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.003,
                longitudeDelta: 0.002,
              }}>

              {/* <Marker.Animated
            coordinate={{
            latitude:geometry.lat,
            longitude:geometry.lng,
            }}>
              <View style={styles2.radius}>
              <View style={styles2.marker} />
              </View>
            </Marker.Animated> */}
            </MapView>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles2 = StyleSheet.create({
  radius: {
    height: 75,
    width: 75,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: 'rgba(0, 112, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 30,
    width: 30,
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: '#007AFF',
  },
});

FifthScreen.propTypes = {
  staycation: PropTypes.object,
};

export default FifthScreen;
