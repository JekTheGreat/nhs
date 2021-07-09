import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import _ from 'lodash';
import Resource from "__src/resources";
const { Res } = Resource;
import { Colors } from 'react-native-paper';

export default class DatePicker extends React.PureComponent {
    state = {
        date: new Date(moment().toDate()),
        mode: "date",
        show: false,
    }

    onChange = (event, selectedDate) => {
        const { actions, home: { selectionData } } = this.props;
        const { date, mode, show } = this.state;
        console.log("mode", date, mode)
        const currentDate = selectedDate || date;
        this.setState({ date: currentDate, show: false })
        if (mode === "date") {
            this.showTimepicker();
        } else {
            const date = _.merge({}, selectionData);
            let param = _.merge({}, date.selectedDate)
            param = moment(currentDate).format('MMMM Do YYYY, h:mm:ss a');
            date.selectedDate = param
            actions.selectionData(date);
        }

    };

    showMode = (currentMode) => {
        this.setState({ show: true, mode: currentMode })
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    render() {
        const { actions, home: { selectionData } } = this.props;
        const { date, mode, show } = this.state;
        const displayed_date = _.isEmpty(selectionData.selectedDate) ? moment(date).format('MMMM Do YYYY, h:mm:ss a')
            : selectionData.selectedDate
        console.log("state", this.state, this.props)
        return (
            <View>
                <TouchableOpacity onPress={this.showDatepicker} style={styles.container}>
                    <Text style={styles.date}>
                        {`${displayed_date}`}
                    </Text>

                    <Image style={styles.dateIcon} source={Res.get("date_icon")} />
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date(moment().toDate())}
                        onChange={this.onChange}
                    />
                )}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.black, justifyContent: "space-between", flexDirection: "row" },
    date: { fontSize: 15, color: Colors.grey600 },
    dateIcon: { width: 20, height: 20, marginLeft: 5, marginRight: 5, },
})