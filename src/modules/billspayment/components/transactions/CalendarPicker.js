/* eslint-disable */
import React, {PureComponent} from "react";
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, Platform } from "react-native";
import PropTypes from "prop-types";
import { Calendar, defaultStyle } from 'react-native-calendars';
import Resources from "__src/resources";
import _ from "lodash";

const {height, width} = Dimensions.get("screen");
const {Color} = Resources;
const XDate = require('xdate');
class CalendarPicker extends PureComponent{
  constructor(props){
    super(props);
      this.state = {
      }
  }

  componentDidMount() { 
    this.setupInitialRange() 
  }

  onDayPress = (day) => {
    const { onSuccess, actions, billspayment: {setTransactionDates} } = this.props;
    const params = _.merge({}, setTransactionDates);
    if (!setTransactionDates.isFromDatePicked || (setTransactionDates.isFromDatePicked && setTransactionDates.isToDatePicked)) {
      this.setupStartMarker(day)
    } else if (!setTransactionDates.isToDatePicked) {
      let markedDates = {...setTransactionDates.markedDates}
      let [mMarkedDates, range] = this.setupMarkedDates(setTransactionDates.fromDate, day.dateString, markedDates)
      if (range >= 0) {
        params.isFromDatePicked = true;
        params.isToDatePicked = true;
        params.markedDates = mMarkedDates;
        actions.setTransactionDates(params);
        {()=> onSuccess(setTransactionDates.fromDate, day.dateString)}
      } else {
        this.setupStartMarker(day)
      }
    }
  }

  setupStartMarker = (day) => {
    const { theme, actions, billspayment: {setTransactionDates}} = this.props;
    let markedDates = {[day.dateString]: {startingDay: true, startDate: day.dateString, color: theme.markColor, textColor: theme.markTextColor}}
    const params = _.merge({}, setTransactionDates);
    params.isFromDatePicked = true;
    params.isToDatePicked = false;
    params.fromDate = day.dateString;
    params.markedDates = markedDates;
    actions.setTransactionDates(params);
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    const { theme } = this.props;
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: theme.markColor, textColor: theme.markTextColor}}
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {color: "lightskyblue", inBetweenDates: tempDate, textColor: theme.markTextColor}
          } else {
            markedDates[tempDate] = {endingDay: true, endDate: tempDate, color: theme.markColor, textColor: theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }

  setupInitialRange = () => {
    const {initialRange, theme, actions, billspayment: {setTransactionDates}} = this.props;
    if (!initialRange) return
    let [fromDate, toDate] = initialRange
    let markedDates = {[fromDate]: {startingDay: true, color: theme.markColor, textColor: theme.markTextColor}}
    let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates);
    const params = _.merge({}, setTransactionDates);
    params.markedDates = mMarkedDates;
    params.fromDate = fromDate;
    actions.setTransactionDates(params);
  }

  render() {
    const {openCalendar, closeCalendar, actions, billspayment: {setTransactionDates}} = this.props;
    return (
    <View>
      <Modal 
      visible={openCalendar}
      transparent
      onRequestClose={closeCalendar}>
        <TouchableWithoutFeedback onPress={closeCalendar}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.2)'}}>
            <TouchableWithoutFeedback onPress={()=> console.log("")}>
              <View style={Platform.OS === 'ios'? {padding: 10, borderRadius: 10, shadowRadius: 5, width: width-20, height: height/2.5, backgroundColor: "white"}: {}}>
                <Calendar {...this.props}
                  markingType={'period'}
                  current={setTransactionDates.fromDate}
                  markedDates={setTransactionDates.markedDates}
                  onDayPress={(day) => this.onDayPress(day)}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    )
  }
}

CalendarPicker.defaultProps = {
  theme: { markColor: Color.LightBlue, markTextColor: '#ffffff' }
};

CalendarPicker.propTypes = {
  billspayment: PropTypes.object,
  initialRange: PropTypes.array,
  onSuccess: PropTypes.func,
}

export default CalendarPicker