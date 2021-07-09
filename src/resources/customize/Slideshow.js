
/* eslint-disable */
import React, {Component} from "react";
import {
	Image, Text, View,
	ScrollView, StyleSheet,
	PanResponder, TouchableOpacity, Dimensions,
} from "react-native";
import ElevatedView from "__src/resources/customize/ElevatedView";
import  Comp  from "__src/components";
import Color from "__src/resources";


import PropTypes from "prop-types";
import reactNativePackage from "react-native/package.json";

const splitVersion = reactNativePackage.version.split(".");
const majorVersion = +splitVersion[0];
const minorVersion = +splitVersion[1];

export default class Slideshow extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			position: 0,
			height: Dimensions.get("window").width * (4 / 9),
			width: Dimensions.get("window").width + 20,
			scrolling: false,
		};
	}

	_onRef(ref) {
		this._ref = ref;
		if (ref && this.state.position !== this._getPosition()) {
			this._move(this._getPosition());
		}
	}

	_move(index) {
		const isUpdating = index !== this._getPosition();
		const x = this.state.width * index;

		if (majorVersion === 0 && minorVersion <= 19) {
			this._ref.scrollTo(0, x, true);
		} else {
			this._ref.scrollTo({x: this.state.width * index, y: 0, animated: true});
		}
		this.setState({position: index});
		if (isUpdating && this.props.onPositionChanged) {
			this.props.onPositionChanged(index);
		}
	}

	_getPosition() {
		if (typeof this.props.position === "number") {
			return this.props.position;
		}
		
		return this.state.position;
	}

	_next() {
		const pos = this.state.position === this.props.dataSource.length - 1 ?
			0 : this.state.position + 1;

		this._move(pos);
		this.setState({position: pos});
	}

	_prev() {
		const pos = this.state.position === 0 ?
			this.props.dataSource.length - 1 : this.state.position - 1;

		this._move(pos);
		this.setState({position: pos});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.position !== this.props.position) {
			this._move(this.props.position);
		}
	}

	componentDidMount() {

		const release = (e, gestureState) => {
			const width = this.state.width;
			const relativeDistance = gestureState.dx / width;
			const vx = gestureState.vx;
			let change = 0;

			if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
				change = 1;
			} else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
				change = -1;
			}
			const position = this._getPosition();

			if (position === 0 && change === -1) {
				change = 0;
			} else if (position + change >= this.props.dataSource.length) {
				change = (this.props.dataSource.length) - (position + change);
			}
			this._move(position + change);
			
			return true;
		};

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: release,
			// onPanResponderRelease: release,
			onPanResponderEnd: release,
			// onPanResponderMove: release,
		});

		this._interval = setInterval(() => {
			const newWidth = Dimensions.get("window").width;

			if (newWidth !== this.state.width) {
				this.setState({width: newWidth});
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}
	
	render() {
		const width = this.state.width;
		const height = this.props.height || this.state.height;
		const position = this._getPosition();

		
		return (
			<View style={[ this.props.containerStyle]}>
				<ScrollView
					ref={(ref) => this._onRef(ref)}
					decelerationRate={0.99}
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEnabled={this.props.scrollEnabled}
					{...this._panResponder.panHandlers}
					style={[styles.container]}>

					{this.props.dataSource.map((image, index) => {
						const imageObject = typeof image.url === "string" ? {uri: image.url} : image.url;
						const imageComponentWithOverlay = (
							<View key={index} style={{flexDirection: "column", width}}>
								<Image
									source={imageObject}
									resizeMode="cover"
									style={{height, width}}/>
							</View>
							
						);

						if (this.props.onPress) {
							return (
								<TouchableOpacity
									key={index}
									style={{height, width}}
									onPress={() => this.props.onPress({image, index})}
									delayPressIn={200}>
									{imageComponentWithOverlay}
								</TouchableOpacity>
							);
						}
						
						return imageComponentWithOverlay ;
            
					})}
				</ScrollView>
				<View style={styles.layoutIndicator}>
					{this.props.dataSource.map((image, index) => {
						return (
							<TouchableOpacity
								key={index}
								onPress={() => {
 									return this._move(index);
								}}
								style={[[styles.indicator,
									setIndicatorSize(this.props.indicatorSize),
									setIndicatorColor(this.props.indicatorColor),
								],
								position === index &&
								[
									styles.indicatorSelected,
									setIndicatorColor(this.props.indicatorSelectedColor),
								]]}>
								<View></View>
							</TouchableOpacity>);
					})}
				</View>
			</View>
		);
	}
}

Slideshow.defaultProps = {
	height: 160,
	indicatorSize: 8,
	indicatorColor: "#CCCCCC",
	indicatorSelectedColor: "#222",
	scrollEnabled: true,
	arrowSize: 16,
	loopBothSides: true,
	loop: true,
};

Slideshow.propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
	    title: PropTypes.string,
	    caption: PropTypes.string,
	    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	})).isRequired,
	indicatorSize: PropTypes.number,
	loopBothSides: PropTypes.bool,
	loop: PropTypes.bool,
	indicatorColor: PropTypes.string,
	indicatorSelectedColor: PropTypes.string,
	height: PropTypes.number,
	position: PropTypes.number,
	scrollEnabled: PropTypes.bool,
	containerStyle: PropTypes.object,
	overlay: PropTypes.bool,
	arrowSize: PropTypes.number,
	arrowLeft: PropTypes.object,
	arrowRight: PropTypes.object,
	onPress: PropTypes.func,
	onPositionChanged: PropTypes.func,
};

const setIndicatorSize = function (size) {
	return {
		width: size,
		height: size,
		borderRadius: size / 2,
	};
};

const setIndicatorColor = function (color) {
	return {
		backgroundColor: color,
	};
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row", backgroundColor: "transparent",
	},
	layoutIndicator: {
		height: 15, position: "absolute", bottom: 0,
		left: 0, right: 0, justifyContent: "center",
		alignItems: "center", flexDirection: "row",
		backgroundColor: "transparent",
	},
	indicator: {
		margin: 3, opacity: 0.9,
	},
	indicatorSelected: {
		backgroundColor: "black",
	},
	containerImage: {
		flexDirection: "column", width: Dimensions.get("window").width + 10,
	},
	overlay: {
		backgroundColor: "red",
	},
	layoutText: {
		padding: 10, paddingRight: 30, flexDirection: "column",
		backgroundColor: "white",
	},
	textTitle: {
		fontSize: 12, color: "#333333",
		fontFamily: "Roboto", bottom: 2,
	},
	textCaption: {
		fontWeight: "400", fontSize: 12, color: "#000000",
		fontFamily: "Roboto",
	},
	left: { left: 10 },
	right: { right: 10 },
});
