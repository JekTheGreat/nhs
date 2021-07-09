/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Image, Modal, TouchableOpacity, DatePickerAndroid,
	TimePickerAndroid, DatePickerIOS, Platform, Animated, Keyboard} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import Style from "./style";
import Moment from "moment";
import TxtInput from "__src/components/TxtInput";

const { Res} = Resource;
const FORMATS = {
	date: "YYYY-MM-DD",
	datetime: "YYYY-MM-DD HH:mm",
	time: "HH:mm",
};

const SUPPORTED_ORIENTATIONS = ["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"];

class DatePicker extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			date: this.getDate(),
			modalVisible: false,
			animatedHeight: new Animated.Value(0),
			allowPointerEvents: true,
		};

		this.getDate = this.getDate.bind(this);
		this.getDateStr = this.getDateStr.bind(this);
		this.datePicked = this.datePicked.bind(this);
		this.onPressDate = this.onPressDate.bind(this);
		this.onPressCancel = this.onPressCancel.bind(this);
		this.onPressConfirm = this.onPressConfirm.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onPressMask = this.onPressMask.bind(this);
		this.onDatePicked = this.onDatePicked.bind(this);
		this.onTimePicked = this.onTimePicked.bind(this);
		this.onDatetimePicked = this.onDatetimePicked.bind(this);
		this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.date !== this.props.date) {
			this.setState({date: this.getDate(this.props.date)});
		}
	}

	setModalVisible(visible) {
		const {height, duration} = this.props;

		if (visible) {
			this.setState({modalVisible: visible});
			
			return Animated.timing(this.state.animatedHeight, {
				toValue: height,
				duration,
			}).start();
		}
		
		return Animated.timing(this.state.animatedHeight, {
			toValue: 0,
			duration,
		}).start(() => {
			this.setState({modalVisible: visible});
		});
    
	}

	onStartShouldSetResponder() {
		return true;
	}

	onMoveShouldSetResponder() {
		return true;
	}

	onPressMask() {
		if (typeof this.props.onPressMask === "function") {
			this.props.onPressMask();
		} else {
			this.onPressCancel();
		}
	}

	onPressCancel() {
		this.setModalVisible(false);

		if (typeof this.props.onCloseModal === "function") {
			this.props.onCloseModal();
		}
	}

	onPressConfirm() {
		this.datePicked();
		this.setModalVisible(false);

		if (typeof this.props.onCloseModal === "function") {
			this.props.onCloseModal();
		}
	}

	getDate(date = this.props.date) {
		const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;

		// date默认值
		if (!date) {
			const now = new Date();

			if (minDate) {
				const _minDate = this.getDate(minDate);

				if (now < _minDate) {
					return _minDate;
				}
			}

			if (maxDate) {
				const _maxDate = this.getDate(maxDate);

				if (now > _maxDate) {
					return _maxDate;
				}
			}

			return now;
		}

		if (date instanceof Date) {
			return date;
		}

		return Moment(date, format).toDate();
	}

	getDateStr(date = this.props.date) {
		const {mode, format = FORMATS[mode]} = this.props;

		if (date instanceof Date) {
			return Moment(date).format(format);
		}
		
		return Moment(this.getDate(date)).format(format);
    
	}

	datePicked() {
		if (typeof this.props.onDateChange === "function") {
			this.props.onDateChange(this.getDateStr(this.state.date), this.state.date);
		}
	}

	onDateChange(date) {
		this.setState({
			allowPointerEvents: false,
			date,
		});
		const timeoutId = setTimeout(() => {
			this.setState({
				allowPointerEvents: true,
			});
			clearTimeout(timeoutId);
		}, 200);
	}

	onDatePicked({action, year, month, day}) {
		if (action !== DatePickerAndroid.dismissedAction) {
			this.setState({
				date: new Date(year, month, day),
			});
			this.datePicked();
		} else {
			this.onPressCancel();
		}
	}

	onTimePicked({action, hour, minute}) {
		if (action !== DatePickerAndroid.dismissedAction) {
			this.setState({
				date: Moment()
					.hour(hour)
					.minute(minute)
					.toDate(),
			});
			this.datePicked();
		} else {
			this.onPressCancel();
		}
	}

	onDatetimePicked({action, year, month, day}) {
		const {mode, androidMode, format = FORMATS[mode],
			is24Hour = !format.match(/h|a/)} = this.props;

		if (action !== DatePickerAndroid.dismissedAction) {
			const timeMoment = Moment(this.state.date);

			TimePickerAndroid.open({
				hour: timeMoment.hour(),
				minute: timeMoment.minutes(),
				is24Hour,
				mode: androidMode,
			}).then(this.onDatetimeTimePicked.bind(this, year, month, day));
		} else {
			this.onPressCancel();
		}
	}

	onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
		if (action !== DatePickerAndroid.dismissedAction) {
			this.setState({
				date: new Date(year, month, day, hour, minute),
			});
			this.datePicked();
		} else {
			this.onPressCancel();
		}
	}

	onPressDate() {
		if (this.props.disabled) {
			return true;
		}

		Keyboard.dismiss();

		// reset state
		this.setState({
			date: this.getDate(),
		});

		if (Platform.OS === "ios") {
			this.setModalVisible(true);
		} else {
			const {mode, androidMode, format = FORMATS[mode],
				minDate, maxDate, is24Hour = !format.match(/h|a/)} = this.props;

			if (mode === "date") {
				DatePickerAndroid.open({
					date: this.state.date,
					minDate: minDate && this.getDate(minDate),
					maxDate: maxDate && this.getDate(maxDate),
					mode: androidMode,
				}).then(this.onDatePicked);
			} else if (mode === "time") {

				const timeMoment = Moment(this.state.date);

				TimePickerAndroid.open({
					hour: timeMoment.hour(),
					minute: timeMoment.minutes(),
					is24Hour,
				}).then(this.onTimePicked);
			} else if (mode === "datetime") {

				DatePickerAndroid.open({
					date: this.state.date,
					minDate: minDate && this.getDate(minDate),
					maxDate: maxDate && this.getDate(maxDate),
					mode: androidMode,
				}).then(this.onDatetimePicked);
			}
		}

		if (typeof this.props.onOpenModal === "function") {
			this.props.onOpenModal();
		}
		
		return null;
	}

	_renderIcon() {
		const {showIcon, iconSource, iconComponent, customStyles} = this.props;

		if (showIcon) {
			if (iconComponent) {
				return iconComponent;
			}
			
			return <Image style={[Style.dateIcon, customStyles.dateIcon]} source={iconSource} />;
		}

		return null;
	}

	getTitleElement() {
		const {date, placeholder} = this.props;

		if (!date && placeholder) {
			return <Text style={Style.input}>{placeholder}</Text>;
		}
		
		return <Text style={Style.input}>{this.getDateStr()}</Text>;
	}

	renderComponent() {
		const {date, placeholder, err, label, compName, TouchableComponent, renderBase} = this.props;

		if (typeof renderBase === "function") {
  		return renderBase(date ? this.getDateStr() : "",err);
  	}
		
		return (
			<TouchableComponent activeOpacity={0.9} onPress={this.onPressDate}>
				<TxtInput
					value={date ? this.getDateStr() : ""}
					editable={false}
					isText
					placeholder={placeholder}
					err={err}
					label={label}
					compName={compName}/>
			</TouchableComponent>
		)
	}

	renderModal = () => {
		const {mode, customStyles, minDate, maxDate,
			minuteInterval, timeZoneOffsetInMinutes, cancelBtnText,
			TouchableComponent, cancelBtnTestID} = this.props;

		return (
			<Modal
				transparent
				animationType='none'
				visible={this.state.modalVisible}
				supportedOrientations={SUPPORTED_ORIENTATIONS}
				onRequestClose={() => {
					this.setModalVisible(false);
				}} >
				<View style={{flex: 1}}>
					<TouchableComponent style={Style.datePickerMask} activeOpacity={1} underlayColor={"#00000077"} onPress={this.onPressMask}>
						<TouchableComponent underlayColor={"#fff"} style={{flex: 1}}>
							<Animated.View style={[Style.datePickerCon, {height: this.state.animatedHeight}, customStyles.datePickerCon]}>
								<View pointerEvents={this.state.allowPointerEvents ? "auto" : "none"}>
									<DatePickerIOS
										date={this.state.date}
										mode={mode}
										minimumDate={minDate && this.getDate(minDate)}
										maximumDate={maxDate && this.getDate(maxDate)}
										onDateChange={this.onDateChange}
										minuteInterval={minuteInterval}
										timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
										style={[Style.datePicker, customStyles.datePicker]}
									/>
								</View>
								<Text> sample</Text>
								<TouchableComponent  onPress={this.onPressCancel} style={[Style.btnText, Style.btnCancel]} testID={cancelBtnTestID}>
									<Text style={[Style.btnTextText, Style.btnTextCancel]}>{cancelBtnText}</Text>
								</TouchableComponent>
								<TouchableComponent underlayColor={"transparent"} onPress={this.onPressConfirm} style={[Style.btnText, Style.btnConfirm]} >
									<Text style={[Style.btnTextText]}>Done</Text>
								</TouchableComponent>
							</Animated.View>
						</TouchableComponent>
					</TouchableComponent>
				</View>
			</Modal>
		)
	}

	render() {
  	const {disabled, accessible, style} = this.props;
  	
  	return (
  		<View pointerEvents={disabled ? "box-none" : null} style={style} >
  			<TouchableOpacity ref={(button) => (this._button = button)}
  				activeOpacity={0.9}
  				disabled={disabled}
  				accessible={accessible}
  				onPress={this.onPressDate}>
  				{this.renderComponent()}
  			</TouchableOpacity>
  			{Platform.OS === "ios" && this.renderModal()}
  		</View>
  	);
  }
}

DatePicker.defaultProps = {
	mode: "date",
	androidMode: "default",
	date: "",
	// component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
	height: 259,

	// slide animation duration time, default to 300ms, IOS only
	duration: 300,
	confirmBtnText: "Done",
	cancelBtnText: "Cancel",
	iconSource: Res.get("date_icon"),
	customStyles: {},

	// whether or not show the icon
	showIcon: true,
	disabled: false,
	hideText: false,
	placeholder: "",
	TouchableComponent: TouchableOpacity,
	modalOnResponderTerminationRequest: (e) => true,
};

DatePicker.propTypes = {
	mode: PropTypes.oneOf(["date", "datetime", "time"]),
	androidMode: PropTypes.oneOf(["calendar", "spinner", "default"]),
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	format: PropTypes.string,
	minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	height: PropTypes.number,
	duration: PropTypes.number,
	confirmBtnText: PropTypes.string,
	cancelBtnText: PropTypes.string,
	iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	iconComponent: PropTypes.element,
	customStyles: PropTypes.object,
	showIcon: PropTypes.bool,
	disabled: PropTypes.bool,
	onDateChange: PropTypes.func,
	onOpenModal: PropTypes.func,
	onCloseModal: PropTypes.func,
	onPressMask: PropTypes.func,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	modalOnResponderTerminationRequest: PropTypes.func,
	customComponent: PropTypes.func,
	is24Hour: PropTypes.bool,
};

export default DatePicker;
