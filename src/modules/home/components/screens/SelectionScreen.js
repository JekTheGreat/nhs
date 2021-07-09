import React from 'react';
import { ScrollView, SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from '../../customcumponents/Datepicker';
import _ from 'lodash';
import { Colors } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import MapModal from './MapsModal';

export default class SelectionScreen extends React.PureComponent {

    state = { openModalMap: false }

    onPress = () => {

    }

    openMap = () => {
        this.setState({ openModalMap: true })
    }
    closeMap = () => {
        this.setState({ openModalMap: false })
    }

    render() {
        const { home: { selectionData } } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainview}>
                    <Text style={styles.labelStyle}>Date of appointment</Text>
                    <DatePicker {...this.props} />
                </View>

                <View style={styles.mainview}>
                    <Text style={styles.labelStyle}>Select Location</Text>
                    <TouchableOpacity onPress={this.openMap} style={styles.mapcontainer}>
                        <Text style={styles.date}>
                            {""}
                        </Text>
                        <Icon type='font-awesome' name='map-o' size={20} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.onPress} style={styles.btnContainer}>
                    <Text style={styles.btnLabelStyle}>
                        Proceed
                    </Text>
                </TouchableOpacity>

                <MapModal openMap={this.state.openModalMap} closeMap={this.closeMap} {...this.props} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: "white" },
    btnContainer: { width: "50%", height: 50, borderWidth: 1, borderColor: Colors.blue400, borderRadius: 20, alignItems: "center", justifyContent: "center" },
    labelStyle: { fontSize: 20, fontWeight: "bold", color: Colors.black },
    btnLabelStyle: { fontSize: 20, fontWeight: "bold", color: Colors.blue400 },
    mainview: { width: "70%" },
    mapcontainer: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.grey400, justifyContent: "space-between", flexDirection: "row" },

})