/* eslint-disable */
import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import moment from 'moment';
import TouchableComponent from "../TouchableComponent";
import normalize from './normalizeText';
import Resource from "__src/resources";
import styles from "./styles.css";
const {Color} = Resource;

export default class ComposePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      allowPointerEvents: true,
      showContent: false,
      selected: '',
      startDate: null,
      endDate: null,
      date: new Date(),
      focus: 'startDate',
      currentDate: moment()
    };
  }
  isDateBlocked = date => {
    if (this.props.blockBefore) {
      return date.isBefore(moment(), 'day');
    } else if (this.props.blockAfter) {
      return date.isAfter(moment(), 'day');
    }
    return false;
  };
  onDatesChange = event => {
    const { startDate, endDate, focusedInput, currentDate } = event;
    if (currentDate) {
      this.setState({ currentDate });
      return;
    }
    this.setState({ ...this.state, focus: focusedInput }, () => {
      this.setState({ ...this.state, startDate, endDate });
    });
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  getTitleElement() {
    const { placeholder, customStyles = {}, allowFontScaling } = this.props;
    const showContent = this.state.showContent;
    if (!showContent && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles.placeholderText]}
        >
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.contentText, customStyles.contentText]}
      >
        {this.state.selected}
      </Text>
    );
  }

  renderButton = () => {
    const { customButton } = this.props;

    if (customButton) {
      return customButton(this.onConfirm);
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={this.onConfirm}
        style={[
          { width: '80%', marginHorizontal: '3%' },
          this.props.ButtonStyle
        ]}
      >
        <Text style={[{ fontSize: 20 }, this.props.ButtonTextStyle]}>
          {this.props.ButtonText ? this.props.ButtonText : '送出'}
        </Text>
      </TouchableHighlight>
    );
  };

  customComponent = () => {
    return this.props.customComponent(() => this.setModalVisible(true));
  }

  onConfirm = () => {
    const returnFormat = this.props.returnFormat || 'YYYY/MM/DD';
    const outFormat = this.props.outFormat || 'LL';
    if (!this.props.mode || this.props.mode === 'single') {
      this.setState({
        showContent: true,
        selected: this.state.currentDate.format(outFormat)
      });
      this.setModalVisible(false);
      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          currentDate: this.state.currentDate.format(returnFormat),
          formatedDate: this.state.currentDate.format("YYYY-MM-DD"),
        });
      }
      return;
    }

    if (this.state.startDate && this.state.endDate) {
      const start = this.state.startDate.format(outFormat);
      const end = this.state.endDate.format(outFormat);
      this.setState({
        showContent: true,
        selected: `${start} ${this.props.dateSplitter} ${end}`
      });
      this.setModalVisible(false);

      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          startDate: this.state.startDate.format(returnFormat),
          endDate: this.state.endDate.format(returnFormat)
        });
      }
    } else {
      alert('please select correct date');
    }
  };

  render() {
    const { customStyles = {} } = this.props;

    let style = styles.stylish;
    style = this.props.centerAlign ? { ...style } : style;
    style = { ...style, ...this.props.style };

    return (
      <>
        {this.customComponent()}
        <Modal
          animationType="slide"
          onRequestClose={() => this.setModalVisible(false)}
          transparent
          visible={this.state.modalVisible}>
          <View stlye={{ flex: 1, flexDirection: 'column' }}>
            <View style={{height: "50%", backgroundColor: "transparent"}}>

            </View>

            <View style={{flexShrink: 1, height: '50%', backgroundColor: "white", borderTopWidth: 0.5, borderTopColor: Color.AFAAAA }}>
              <DateRange
                headFormat={this.props.headFormat}
                customStyles={customStyles}
                markText={this.props.markText}
                onDatesChange={this.onDatesChange}
                isDateBlocked={this.isDateBlocked}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                focusedInput={this.state.focus}
                onClose={this.onConfirm}
                selectedBgColor={this.props.selectedBgColor || undefined}
                selectedTextColor={this.props.selectedTextColor || undefined}
                mode={this.props.mode || 'single'}
                currentDate={this.state.currentDate}
              />
            </View>
            {/* <View style={styles.viewButton}>
              {this.renderButton()}
            </View> */}
          </View>
        </Modal>
      </>
      // <TouchableHighlight
      //   underlayColor={'transparent'}
      //   onPress={() => this.setModalVisible(true)}
      //   style={[
      //     { width: '100%', height: '100%', justifyContent: 'center' },
      //     style
      //   ]}>
      //   <View>
      //     <View>
      //       <View style={[customStyles.contentInput, styles.contentInput]}>
      //         {this.getTitleElement()}
      //       </View>
      //     </View>
          
      //   </View>
      // </TouchableHighlight>
    );
  }
}

ComposePicker.propTypes = {
  dateSplitter: PropTypes.string
};

ComposePicker.defaultProps = { dateSplitter: '->' };
