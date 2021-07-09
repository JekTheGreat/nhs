import React from 'react';
import { ScrollView, SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Colors } from 'react-native-paper';

export default class Hospital extends React.PureComponent {

    componentDidMount() {
        const { actions } = this.props;
        actions.getArticles();
    };


    onPress = () => {
        const { navigation } = this.props;
        navigation.navigate("SelectionScreen");
    }

    render() {
        const { home } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={this.onPress} style={styles.btnContainer}>
                    <Text style={styles.labelStyle}>
                        Select an appointment
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
    btnContainer: { width: "70%", height: 60, borderWidth: 1, borderColor: Colors.blue400, borderRadius: 20, alignItems: "center", justifyContent: "center" },
    labelStyle: { fontSize: 20, fontWeight: "bold", color: Colors.blue400 },
})