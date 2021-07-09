/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import Resource from "__src/resources";
import Loading from "__src/components/Loading";
import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import returnsseller from "../modules/marketplace/containers/returnsseller";

const { Color, Res } = Resource;

export default class TxtInput extends PureComponent {
	borderInput() {
		const { returnKeyType, value, errIcon, onRef, onChangeText,
			refname, style, isFocus, err, style3, style4 } = this.props;
		const error = err ? { color: Color.red, borderColor: Color.red } : { color: Color.Standard };
		const style2 = isFocus ? { borderColor: Color.colorPrimary } : null;

		return (
			<View style={style}>
				<View accessible style={[styles.views_bi, style2, style3, error]}>
					<TextInput
						ref={(e) => onRef ? onRef(e) : null}
						autoCorrect={false}
						onBlur={this.props.onBlur}
						onFocus={this.props.onFocus}
						autoCapitalize="none"
						{...this.props}
						style={[styles.textfields2, styles.padmar0]}
						underlineColorAndroid="transparent"
						value={value}
						placeholderTextColor={Color.Standard}
						onChangeText={onChangeText}
						returnKeyType={returnKeyType}
						onSubmitEditing={() => {
							refname ? refname.focus() : null;
						}} />
					{this._renderComponent()}
				</View>
				{ err ?
					<View style={[styles.errStyle, style4]}>
						{errIcon && this.renderErrIcon()}
						<Text style={styles.errTextStyle}>{err}</Text>
					</View>
					: null}
			</View>
		);
	}

	loginInput() {
		const { returnKeyType, value, onRef, errIcon, onChangeText, viewPass, onSubmitEditing,
			style, isFocus, err, icon, icon2, style3, style4, secureTextEntry, placeholder } = this.props;
		const error = err ? { color: Color.red, borderColor: Color.red } : { color: Color.Standard };
		const style2 = isFocus ? { borderColor: Color.colorPrimary } : null;

		return (
			<View style={style}>
				<View accessible style={[styles.views_bi3, style2, style3, error]}>
					{icon ? <Image style={styles.image} source={Res.get(icon)} /> : null}
					<TextInput
						ref={(e) => onRef ? onRef(e) : null}
						autoCorrect={false}
						onBlur={this.props.onBlur}
						onFocus={this.props.onFocus}
						autoCapitalize="none"
						placeholder={placeholder}
						placeholderTextColor={Color.Standard}
						style={[styles.textfields, styles.padmar0]}
						secureTextEntry={secureTextEntry}
						underlineColorAndroid="transparent"
						value={value}
						onChangeText={onChangeText}
						returnKeyType={returnKeyType}
						onSubmitEditing={onSubmitEditing} />
					{icon2 ? <TouchableOpacity onPress={viewPass}>
						<Image style={styles.image} source={Res.get(icon2)} />
					</TouchableOpacity> : null}
				</View>
				{ err ?
					<View style={[styles.errStyle, style4]}>
						{errIcon && this.renderErrIcon()}
						<Text style={styles.errTextStyle}>{err}</Text>
					</View>
					: null}
			</View>
		);
	}

	underlineInput() {
		const { label, err, onChangeText, style, returnKeyType, isText, secureTextEntry,
			value, inputStyles, onRef, style3, style4, errIcon, onSubmitEditing, placeholder, maxLength,
			keyboardType, isFocus, autoCapitalize, labelStyle2 } = this.props;
		const error = err ? {
			color: Color.red,
			borderBottomColor: Color.red
		} : { color: Color.Standard };
		const style2 = isFocus ? { borderBottomColor: Color.colorPrimary } : null;
		const hasplaceholder = placeholder ? { opacity: 0.45 } : null;

		return (
			<View style={style}>
				{label ? <Text style={[styles.labelStyle, labelStyle2, error]}>{label}</Text> :
					null}
				<View accessible style={[styles.views_bi2, style2, style3, error]}>
					{isText ?
						<Text
							style={[styles.input, value ? null : hasplaceholder, inputStyles]}>
							{value || placeholder}
						</Text> : <TextInput
							ref={(e) => onRef ? onRef(e) : null}
							returnKeyType={returnKeyType}
							onBlur={this.props.onBlur}
							onFocus={this.props.onFocus}
							{...this.props}
							autoCapitalize={autoCapitalize || "none"}
							secureTextEntry={secureTextEntry}
							style={[styles.input, styles.padmar0, inputStyles]}
							onChangeText={onChangeText}
							value={value}
							maxLength={maxLength}
							placeholderTextColor={Color.Standard}
							keyboardType={keyboardType}
							underlineColorAndroid='transparent'
							onSubmitEditing={onSubmitEditing} />}
					{this._renderComponent()}
				</View>
				{ err ?
					<View style={[styles.errStyle, style4]}>
						{errIcon && this.renderErrIcon()}
						<Text style={styles.errTextStyle}>{err}</Text>
					</View>
					: null}
			</View>

		);
	}

	renderErrIcon() {
		switch (this.props.errIcon) {
			case "Warning":
				return (<Icon
					name='exclamation'
					type='evilicon'
					color='red'
					size={25} />);

			default:
				return null;
		}
	}

	_renderComponent() {
		switch (this.props.compName) {
			case "Loading":
				return (
					<View style={styles.load}>
						<Loading size="small" />
					</View>);
			case "Validated":
				return (
					<Icon
						name='check'
						type='evilicon'
						color='#2C932C'
						size={27}
					/>
				);
			case "Error":
				return (
					<Icon
						name='close-o'
						type='evilicon'
						color="red"
						size={27}
					/>
				);
			case "Date":
				return (
					<Icon
						name='calendar'
						type='evilicon'
						color="black"
						size={27}
					/>
				);

			case "ArrowDown":
				return (
					<Icon
						name='chevron-down'
						type='evilicon'
						color="black"
						size={27}
					/>
				);
			case "ArrowUp":
				return (
					<Icon
						name='chevron-up'
						type='evilicon'
						color="black"
						size={27}
					/>
				);

			case "Search":
				return (
					<Icon
						name='search'
						color="black"
						size={27}
					/>
				);
			case "Search2":
				return (
					<TouchableOpacity activeOpacity={0.7} onPress={this.props.onSearch}>
						<Image style={styles.image2} source={Res.get("ic_search")} />
					</TouchableOpacity>
				);

			case "Password":
				return (
					<TouchableOpacity onPress={this.props.onPass}>
						<Image style={styles.image2} source={Res.get("view_icon")} />
					</TouchableOpacity>
				);

			case "Currency":
				return (
					<Text style={styles.currency}>{this.props.Currency}</Text>
				);

			default:
				return null;
		}
	}

	render() {
		const { round, logintype } = this.props;

		if (logintype) {
			return (
				<View>
					{this.loginInput()}
				</View>
			);
		}

		return (
			<View>
				{round ? this.borderInput() : this.underlineInput()}
			</View>
		);
	}
}

TxtInput.propTypes = {
	label: PropTypes.string, value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	iconName: PropTypes.string, returnKeyType: PropTypes.string,
	viewPass: PropTypes.func, onChangeText: PropTypes.func,
	onRef: PropTypes.func, onPress: PropTypes.func,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), inputStyles: PropTypes.object,
	placeholder: PropTypes.string, refname: PropTypes.object,
	onFocus: PropTypes.func, icon: PropTypes.string,
	icon2: PropTypes.string, onBlur: PropTypes.func, isText: PropTypes.bool,
	round: PropTypes.bool, secureTextEntry: PropTypes.bool, errIcon: PropTypes.string,
	logintype: PropTypes.bool, isFocus: PropTypes.bool, err: PropTypes.string,
	compName: PropTypes.string, onSubmitEditing: PropTypes.func,
	style3: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	style4: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), onPass: PropTypes.func, onSearch: PropTypes.func,
	autoCapitalize: PropTypes.string, labelStyle2: PropTypes.object, Currency: PropTypes.string,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), keyboardType: PropTypes.string,
};

const styles = StyleSheet.create({
	labelStyle: { color: Color.Standard, fontSize: 14, fontFamily: "Roboto-Light" },
	errTextStyle: { flex: 1, color: Color.red, fontSize: 12, fontWeight: "normal", fontFamily: "Roboto-Light", alignSelf: "center", backgroundColor: "transparent" },
	errStyle: { backgroundColor: "transparent", marginTop: 5, flexDirection: "row" },
	input: { flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0, backgroundColor: Color.transparent, color: "black" },
	load: { width: 15, height: 15, margin: 7 },

	// Round
	views_bi3: { flexDirection: "row", width: "100%", alignItems: "center", height: 40, backgroundColor: "white", borderColor: "#404040", borderWidth: 0.6, borderRadius: 4 },
	views_bi2: { flexDirection: "row", backgroundColor: "transparent", alignItems: "center", width: "100%", height: 40, borderBottomColor: "#404040", borderBottomWidth: 0.6 },
	views_bi: {
		flexDirection: "row", alignItems: "center", width: "100%", height: 40, borderColor: "#404040",
		paddingHorizontal: 5, borderWidth: 0.6, borderRadius: 3,
	},
	textfields: { flex: 1, fontSize: 14, fontFamily: "Roboto-Light", color: "black" },
	textfields2: { marginLeft: 5, flex: 1, fontSize: 14, paddingVertical: 0, fontFamily: "Roboto-Light", width: "99%", color: "black" },
	image: { width: 18, height: 18, margin: 10, resizeMode: "contain" },
	image2: { width: 18, height: 18, padding: 10 },
	currency: { fontFamily: "Roboto-Light", fontSize: 15, color: Color.LightBlue },
	padmar0: { paddingBottom: 0, paddingTop: 0, marginTop: 0, marginBottom: 0 },
});
