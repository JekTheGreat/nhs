import React, {PureComponent} from "react";
import Loading from "__src/components/Loading";
import {Card} from "native-base";
import {StyleSheet, Dimensions, View, Text,
	TouchableWithoutFeedback, FlatList,
	TouchableOpacity, Modal} from "react-native";
import PropTypes from "prop-types";

export default class ModalDropdown extends PureComponent {
  static propTypes = {
  	disabled: PropTypes.bool,
  	scrollEnabled: PropTypes.bool,
  	defaultIndex: PropTypes.number,
  	defaultValue: PropTypes.string,
  	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  	accessible: PropTypes.bool,
  	animated: PropTypes.bool,
  	showsVerticalScrollIndicator: PropTypes.bool,
  	keyboardShouldPersistTaps: PropTypes.string,
    
  	renderBase: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
  	renderSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
  	style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  	textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  	dropdownStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  	dropdownTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  	dropdownTextHighlightStyle: PropTypes.oneOfType([ PropTypes.number,
  		PropTypes.object,
  		PropTypes.array]),

  	adjustFrame: PropTypes.func,
  	renderRow: PropTypes.func,
  	renderSeparator: PropTypes.func,
  	renderButtonText: PropTypes.func,

  	onDropdownWillShow: PropTypes.func,
  	onDropdownWillHide: PropTypes.func,
  	onSelect: PropTypes.func,
  	frameWidth: PropTypes.object,
  };

  static defaultProps = {
  	disabled: false,
  	scrollEnabled: true,
  	defaultIndex: -1,
  	defaultValue: "Please select...",
  	options: null,
  	animated: true,
  	showsVerticalScrollIndicator: true,
  	keyboardShouldPersistTaps: "never",
  };

  constructor(props) {
  	super(props);

  	this._button = null;
  	this._buttonFrame = null;
  	this._nextValue = null;
  	this._nextIndex = null;

  	this.state = {
  		accessible: !!props.accessible,
  		loading: !props.options,
  		showDropdown: false,
  		buttonText: props.defaultValue,
  		selectedIndex: props.defaultIndex,
  	};
  }
	
  static getDerivedStateFromProps(props, state){
  	let {buttonText, selectedIndex} = state;
  	const {defaultIndex, defaultValue, options} = props;

  	buttonText = this._nextValue === null ? buttonText : this._nextValue;
  	selectedIndex = this._nextIndex === null ? selectedIndex : this._nextIndex;
  	if (selectedIndex < 0) {
  		selectedIndex = defaultIndex;
  		if (selectedIndex < 0) {
  			buttonText = defaultValue;
  		}
  	}
  	this._nextValue = null;
  	this._nextIndex = null;
		
  	return {
  		loading: !options,
  		buttonText,
  		selectedIndex,
  	};
  }

  defaultIndex(){
	  this.props.defaultIndex = -1 ;
  }

  render() {
  	const {disabled, accessible} = this.props;
  	
  	return (
  		<View pointerEvents={disabled ? "box-none" : null} {...this.props}>
  			<TouchableOpacity ref={(button) => (this._button = button)}
  				activeOpacity={0.9}
  				disabled={disabled}
  				accessible={accessible}
  				onPress={this._onButtonPress}>
  				{this._renderButton()}
  			</TouchableOpacity>
  			{this._renderModal()}
  		</View>
  	);
  }

  _updatePosition(callback) {
  	if (this._button && this._button.measure) {
  		this._button.measure((fx, fy, width, height, px, py) => {
  			this._buttonFrame = {x: px, y: py, w: width, h: height};
  			callback && callback();
  		});
  	}
  }

  show() {
  	this._updatePosition(() => {
  		this.setState({
  			showDropdown: true,
  		});
  	});
  }

  hide() {
  	this.setState({
  		showDropdown: false,
  	});
  }

  select(idx) {
  	const {defaultValue, options, defaultIndex, renderButtonText} = this.props;
  	let value = defaultValue;

  	if (idx === null || !options || idx >= options.length) {
  		idx = defaultIndex;
  	}

  	if (idx >= 0) {
  		value = renderButtonText ? renderButtonText(options[idx]) : options[idx].toString();
  	}

  	this._nextValue = value;
  	this._nextIndex = idx;

  	this.setState({
  		buttonText: value,
  		selectedIndex: idx,
  	});
  }

  _renderButton() {
  	const {renderBase, textStyle} = this.props;
  	const {buttonText} = this.state;

  	if (typeof renderBase === "function") {
  		return renderBase({...this.props});
  	}
  	
  	return (
  		<View style={styles.button}>
  			<Text style={[styles.buttonText, textStyle]} numberOfLines={1}>
  				{buttonText}
  			</Text>
  		</View>
  	);
  }

  _onButtonPress = () => {
  	const {onDropdownWillShow} = this.props;

  	if (!onDropdownWillShow || onDropdownWillShow() !== false) {
  		this.show();
  	}
  };

  renderSearch() {
  	const {renderSearch} = this.props;
		
  	if (typeof renderSearch === "function") {
  		return renderSearch({...this.props});
  	}
  	
  	return null;
  }

  _renderModal() {
  	const {animated, accessible, dropdownStyle, frameWidth} = this.props;
  	const {showDropdown, loading} = this.state;

  	if (showDropdown && this._buttonFrame) {
  		const frameStyle = this._calcPosition();
  		const animationType = animated ? "fade" : "none";
  		
  		return (
  			<Modal animationType={animationType} visible transparent
  				onRequestClose={this._onRequestClose}
  				supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}>
  				<TouchableWithoutFeedback
  					accessible={accessible}
  					disabled={!showDropdown}
  					onPress={this._onModalPress}>
  					<View style={styles.modal}>
  						<Card style={[styles.dropdown, dropdownStyle, frameStyle, frameWidth]}>
  							{this.renderSearch()}
  							{loading ? this._renderLoading() : this._renderDropdown()}
  						</Card>
  					</View>
  				</TouchableWithoutFeedback>
  			</Modal>
  		);
  	}
  }

  _calcPosition() {
  	const {dropdownStyle, style, adjustFrame} = this.props;

  	const dimensions = Dimensions.get("window");
  	const windowWidth = dimensions.width;
  	const windowHeight = dimensions.height;

  	const dropdownHeight = (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
      StyleSheet.flatten(styles.dropdown).height;

  	const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
  	const rightSpace = windowWidth - this._buttonFrame.x;
  	const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
  	const showInLeft = rightSpace >= this._buttonFrame.x;

  	const positionStyle = {
		  height: dropdownHeight,
		  width: this._buttonFrame.w,
  		top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h :
  			Math.max(0, this._buttonFrame.y - dropdownHeight),
  	};

  	if (showInLeft) {
  		positionStyle.left = this._buttonFrame.x;
  	} else {
  		const dropdownWidth = (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
      (style && StyleSheet.flatten(style).width) || -1;

  		if (dropdownWidth !== -1) {
  			positionStyle.width = dropdownWidth;
  		}
		  positionStyle.right = rightSpace - this._buttonFrame.w;
  	}
	  
  	return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
  }

  _onRequestClose = () => {
  	const {onDropdownWillHide} = this.props;

  	if (!onDropdownWillHide || onDropdownWillHide() !== false) {
  		this.hide();
  	}
  };

  _onModalPress = () => {
  	const {onDropdownWillHide} = this.props;

  	if (!onDropdownWillHide || onDropdownWillHide() !== false) {
  		this.hide();
  	}
  };

  _renderLoading() {
  	return <Loading color="#000" size='small' />;
  }

  _renderDropdown() {
  	const {scrollEnabled,
  		renderSeparator, options,
  		showsVerticalScrollIndicator,
  		keyboardShouldPersistTaps} = this.props;
			
  	return (
  		<FlatList
  			keyExtractor={(item, idx) => `row_${idx}`}
  			enableEmptySections
  			scrollEnabled={scrollEnabled}
  			style={styles.list}
  			data={options}
  			renderItem={this._renderRow}
  			ItemSeparatorComponent={renderSeparator}
  			automaticallyAdjustContentInsets={false}
  			showsVerticalScrollIndicator={showsVerticalScrollIndicator}
  			keyboardShouldPersistTaps={keyboardShouldPersistTaps}
  		/>
  	);
  }

  _renderRow = ({item, index}) => {
  	const {renderRow, dropdownTextStyle, dropdownTextHighlightStyle, accessible} = this.props;
  	const {selectedIndex} = this.state;
  	const key = `row_${index}`;
  	const highlighted = index === selectedIndex;
		
  	const row = renderRow ?
  		renderRow(item, index, highlighted) :
  		(<Text style={[styles.rowText,
  			dropdownTextStyle,
  			highlighted && styles.highlightedRowText,
  			highlighted && dropdownTextHighlightStyle]}> {item}</Text>);
  	const preservedProps = {
  		key,
  		accessible,
  		onPress: () => this._onRowPress(item, index),
  	};
  	
  	return <TouchableOpacity  {...preservedProps}>{row}</TouchableOpacity>;
  };

  _onRowPress(item, index) {
  	const {onSelect, renderButtonText, onDropdownWillHide} = this.props;

  	if (!onSelect || onSelect(index, item) !== false) {
  		this._nextValue = item;
  		this._nextIndex = index;
  		this.setState({
  			buttonText: (renderButtonText && renderButtonText(item)) || item.toString(),
  			selectedIndex: index,
  		});
  	}
  	if (!onDropdownWillHide || onDropdownWillHide() !== false) {
  		this.setState({
  			showDropdown: false,
  		});
  	}
  }
}

const styles = StyleSheet.create({
	button: { justifyContent: "center" },
	buttonText: { fontSize: 12 },
	modal: { flexGrow: 1 },
	dropdown: { width: 400, position: "absolute",
		height: (33 + StyleSheet.hairlineWidth) * 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "lightgray", borderRadius: 2,
		backgroundColor: "white", justifyContent: "center" },
	list: { marginTop: 3 },
	rowText: { paddingHorizontal: 6, paddingVertical: 10,
		fontSize: 11, color: "gray", backgroundColor: "white",
		textAlignVertical: "center" },
	highlightedRowText: { fontWeight: "bold" },
});
