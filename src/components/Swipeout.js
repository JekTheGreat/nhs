import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import ToggleSwitch from 'toggle-switch-react-native';
import Resource from "__src/resources";
import _ from 'lodash';
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('window');

export default class Swipeout extends React.PureComponent {

    rightSwipe = () => {
        const { viewButton, deleteButton, editButton } = this.props;
        return (<View style={styles.swipeStyle}>
            <TouchableOpacity onPress={viewButton} style={styles.view}>
                <Text style={styles.swipeTxt}>View</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={deleteButton} style={styles.delete}>
                    <Text style={styles.swipeTxt}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={editButton} style={styles.edit}>
                    <Text style={styles.swipeTxt}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    render() {
        const { data, hasSwitch, onSwitch, isSwitchOn } = this.props;
        const b = _.isString(data.price) ? data.price.split(/[.\-_]/) : [];
        const c = b.map(Number);
        const minPrice = !_.isEmpty(c) && (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const maxPrice = !_.isEmpty(c) && (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} - ${maxPrice}`;
        const price = _.isNumber(data.price) ? Number(parseFloat(data.price).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }) : priceRange;

        return (
            <Swipeable overshootRight={false} renderRightActions={this.rightSwipe} >
                <View style={styles.container}>
                    <View style={styles.dataContainer}>
                        <Image source={{ uri: data.coverImg }} style={styles.imgStyle} />
                        <View>
                            <Text style={styles.txtName}>
                                {`${data.name}`}
                            </Text>
                            <Text style={styles.txtPrice}>
                                ₱ {price}
                            </Text>
                            <Text style={styles.txtQty}>
                                {`x${data.quantity}`}
                            </Text>
                            <Text style={styles.txtStatus}>Status:
                             <Text style={[data.approval_status === "Approved" ? { color: "green" } : { color: "red" }, { fontSize: 10 }]}>
                                    {data.approval_status}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    {hasSwitch &&
                        <View style={styles.switchContainer}>
                            <ToggleSwitch
                                isOn={isSwitchOn}
                                onColor={Color.colorPrimaryMP}
                                offColor={Color.Standard}
                                size={"small"}
                                onToggle={onSwitch} />
                        </View>}
                </View>
            </Swipeable>
        )
    }
}
Swipeout.propTypes = {
    data: PropTypes.object,
    editButton: PropTypes.func,
    deleteButton: PropTypes.func,
    viewButton: PropTypes.func,
    hasSwitch: PropTypes.bool,
    isSwitchOn: PropTypes.bool,
    onSwitch: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: 100,
        width: width - 30,
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    imgStyle: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    txtName: {
        fontSize: 13,
        color: "black",
        fontWeight: "bold"
    },
    txtPrice: {
        fontSize: 12,
        color: Color.colorPrimaryMP,
        fontWeight: "bold"
    },
    txtQty: {
        fontSize: 10,
        color: Color.Standard2,
    },
    txtStatus: {
        fontSize: 10,
        color: Color.Standard2,
    },
    swipeStyle: {
        flexDirection: "row",
    },
    swipeTxt: {
        fontSize: 12,
        color: "white",
    },
    view: {
        backgroundColor: "#8E8E8E",
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    delete: {
        backgroundColor: "red",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    edit: {
        backgroundColor: Color.colorPrimaryMP,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    switchContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },

});

