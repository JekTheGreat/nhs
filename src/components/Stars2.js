import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, } from "react-native";
import Resource from "__src/resources";
const { Color } = Resource;

export default class Stars2 extends Component {



    get stars() {
        const { rates, size, color, toRate, iconStyle } = this.props;
        const starsNumber = parseInt(rates);
        const starElements = [];
        for (let i = 1; i < 6; i++) {
            starElements.push(
                <Icon
                    key={`star-${i}`}
                    onPress={() => toRate(i)}
                    name={starsNumber >= i ? "star" : "star-o"}
                    size={size}
                    color={starsNumber >= i ? color : Color.colorPrimaryMP}
                    style={iconStyle} />,
            );
        }
        return starElements;
    }

    render() {
        const { rates, txtVote, labelStyle, style } = this.props;

        return (
            <View style={style || styles.wrapper}>
                <View style={styles.stars}>
                    {this.stars}
                    {txtVote ? (
                        <Text style={labelStyle || styles.votesNumber}>
                            {rates}
                        </Text>
                    ) : null}
                </View>
            </View>
        );
    }
}

Stars2.propTypes = {
    rates: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    txtVote: PropTypes.bool,
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    star: {
        marginRight: 10,
    },
    stars: {
        flexDirection: "row",
        alignItems: "center",
    },
    votesNumber: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 1,
        marginLeft: 3,
    },
});
