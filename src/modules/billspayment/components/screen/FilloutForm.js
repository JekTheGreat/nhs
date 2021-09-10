/* eslint-disable */
import React from "react";
import { View, Text, ScrollView, FlatList, Image, Alert, TouchableOpacity, Dimensions } from "react-native";
import DatePicker from "__src/components/datepicker";
import MonthPicker from 'react-native-month-year-picker';
import TxtInput from "__src/components/TxtInput";
import Dropdown from "__src/components/Dropdown";
import { Icon } from "react-native-elements";
import _ from "lodash";
import validator from "validator";
import ImagePicker from "react-native-image-picker";
import moment from "moment";
import Resources from "__src/resources";
import PropTypes from "prop-types";
import { Colors } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";
const { Color, Res } = Resources;
const { height, width } = Dimensions.get("window");
class FilloutFormScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      holder: {},
      error: {},
      isShowing: true,
      text: "",
      date: "",
      image: "",
      showMonthPicker: false,
      monthDate: new Date(),
    }
  }

  componentDidMount() {
    // const {actions, login: {currentAccount, session}, billspayment: {setInputDetails}} = this.props;
    // const billerId = _.has(setInputDetails, "chooseBillers.id")? setInputDetails.chooseBillers.id: {};
    // const userlevel = session.role;
    // actions.getRates(billerId, "retailer");
  }

  componentDidUpdate(prevProps, prevState) {
    const { actions, login: { session },
      billspayment: { transactionFailed, validateFields, getFields, getRates, setInputDetails, uploadImage, setBillsPaymentScreen, transactionInProgress } } = this.props;
    const { error, holder } = this.state;
    // let holder;
    const field = _.has(setInputDetails, `filloutform${[holder]}`) ? setInputDetails.filloutform[holder] : {};
    const updateInput = _.merge({}, setInputDetails);
    const param = _.merge({}, updateInput.filloutform);
    const image = _.has(setInputDetails, "imageFileName") ? setInputDetails.imageFileName : {};
    console.log("componentDidUpdate: ", !_.isEqual(prevState.holder, holder), prevState.holder, holder);

    //ETO YUNG UPDATE FOR IMAGE
    if ((!_.isEqual(prevProps.billspayment.uploadImage, uploadImage)) && !_.isEmpty(uploadImage)) {
      _.filter(getFields.fields, parent => {
        if (parent.field.input === "image") {
          param[parent.field.varname] = uploadImage.url;
          updateInput.filloutform = param;
          this.setState({ holder: parent.field.varname });
          actions.setInputDetails(updateInput);
        }
      });
    }
    if (!_.isEmpty(holder) && !_.isEqual(prevState.holder, holder)) {
      if ((_.isEqual(setInputDetails.filloutform[holder], uploadImage.url)) && !_.isEmpty(uploadImage)) { //CONDITION DITO AYUSIN
        this.setState({ holder: "" });
        actions.validateFields(JSON.stringify(setInputDetails.chooseBillers.id), setInputDetails.filloutform);
      }
    }

    //ETO YUNG ORIG NA AYOS
    if (!_.isEmpty(validateFields) && !_.isEqual(prevProps.billspayment.validateFields, validateFields)) {
      if (_.has(validateFields, "statusCode")) {
        Alert.alert("Error", validateFields.message);
        delete validateFields.statusCode;
      }
      else {
        delete this.props.billspayment.getRates;
        actions.getRates(setInputDetails.filloutform.amount, setInputDetails.chooseBillers.id, session.role);
      }
    }
    if (!_.isEmpty(getRates) && !_.isEqual(prevProps.billspayment.getRates, getRates)) {
      actions.setBillsPaymentScreen("summary");
    }

  }


  onNext = (item, item2) => {
    const { error } = this.state;
    const { actions, billspayment: { setBillsPaymentScreen, setInputDetails, getFields, transactionFailed, validateFields }, login: { session } } = this.props;
    const newErr = _.merge({}, error);
    const field = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : {};
    const image = _.has(setInputDetails, "imageFileName") ? setInputDetails.imageFileName : {};
    if (!_.isEmpty(image)) {
      _.map(getFields.fields, (parent) => {
        _.map(parent.validations.values, (item,) => {
          if ((_.isUndefined(field[parent.field.varname]) || _.isEmpty(field[parent.field.varname])).toString() === item.ruleValue) {
            newErr[parent.field.varname] = item.error;
          }
        })
        if (_.isUndefined(field[parent.field.varname]) || _.isEmpty(field[parent.field.varname])) {
          this.setState({ error: newErr });
        }
      });
      if (_.isEmpty(newErr)) {
        actions.uploadImage(image, session);
      }
    }
    else {
      _.map(getFields.fields, (parent) => {
        _.map(parent.validations.values, (item, index) => {
          switch (item.rule) {
            case "regex":
            case "pattern":
              const rule = item.ruleValue.replace("/g", "").replace("/", "");
              const ruleRegex = new RegExp(rule, "g");
              if (!_.isUndefined(field[parent.field.varname]) || !_.isEmpty(field[parent.field.varname])) {
                if (field[parent.field.varname] && !field[parent.field.varname].match(ruleRegex)) {
                  newErr[parent.field.varname] = item.error;
                }
              }
              break;
            case "required":
              if ((_.isUndefined(field[parent.field.varname]) || _.isEmpty(field[parent.field.varname])).toString() === item.ruleValue) {
                newErr[parent.field.varname] = item.error;
              }
              break;
            case "len":
              const len = field[parent.field.varname] || "";
              if (!_.isUndefined(field[parent.field.varname]) || !_.isEmpty(field[parent.field.varname])) {
                if (_.toNumber(item.ruleValue) !== len.length && !_.isEqual(len.length, 0)) {
                  newErr[parent.field.varname] = item.error;
                }
              }
              break;
            case "type":
              if (!_.isUndefined(field[parent.field.varname]) || !_.isEmpty(field[parent.field.varname])) {
                if (!validator.isEmail(field[parent.field.varname])) {
                  newErr[parent.field.varname] = item.error;
                }
              }
              break;
          }
        })
        this.setState({ error: newErr });
        // if ((_.isUndefined(field[parent.field.varname]) || _.isEmpty(field[parent.field.varname])).toString() === item.ruleValue) {
        //   newErr[parent.field.varname] = item.error;
        // }
        // })
        // if (_.isUndefined(field[parent.field.varname]) || _.isEmpty(field[parent.field.varname])) {
        //   this.setState({ error: newErr });
        // }
      });
      // console.log("TEST:", newErr)
      if (_.isEmpty(newErr)) {
        actions.validateFields(session, JSON.stringify(setInputDetails.chooseBillers.id), setInputDetails.filloutform);
      }
    }
  }

  _onChangeDate = parent => (value) => {
    const { actions, billspayment: { setInputDetails } } = this.props;
    const { error } = this.state;
    const newErr = ({}, error);
    const date = _.merge({}, setInputDetails);
    const params = _.merge({}, date.filloutform);
    params[parent.field.varname] = _.isEqual(parent.field.input, "Year") ? moment(value).format("YYYY-MM") : value;
    date.filloutform = params;
    actions.setInputDetails(date);
    delete newErr[parent.field.varname];
  }

  _onChangeMonthYear = parent => (event, newDate) => {
    console.log("ASDFASDF", parent, event, moment(newDate).format("YYYY-MM"))
    this.setState({ showMonthPicker: false })
    if (event === "dateSetAction") {
      const { actions, billspayment: { setInputDetails } } = this.props;
      const { error } = this.state;
      const newErr = ({}, error);
      const date = _.merge({}, setInputDetails);
      const params = _.merge({}, date.filloutform);
      params[parent.field.varname] = moment(newDate).format("YYYY-MM");
      date.filloutform = params;
      actions.setInputDetails(date);
      delete newErr[parent.field.varname];
      this.setState({ showMonthPicker: false, monthDate: newDate })
    }
  }

  _onChangeText = namefield => (value) => {
    const { error } = this.state;
    const { actions, billspayment: { setInputDetails } } = this.props;
    const newErr = ({}, error);
    const newInput = _.merge({}, setInputDetails);
    const params = _.merge({}, newInput.filloutform);
    params[namefield.varname] = value;
    newInput.filloutform = params;
    actions.setInputDetails(newInput);
    delete newErr[namefield.varname];
  }
  _onChangeDP = namefield => (value) => {
    const { error } = this.state;
    const { actions, billspayment: { setInputDetails } } = this.props;
    const newErr = ({}, error);
    const newInput = _.merge({}, setInputDetails);
    const params = _.merge({}, newInput.filloutform);
    const params2 = _.merge({}, newInput.getDP);
    params[namefield.varname] = value.value;
    params2[namefield.varname] = value.key;
    newInput.filloutform = params;
    newInput.getDP = params2;
    actions.setInputDetails(newInput);
    delete newErr[namefield.varname];
  }
  onLeave = async (parent) => {
    const { billspayment: { setInputDetails } } = this.props;
    const { error } = this.state;
    const newErr = _.merge({}, error);
    const fields = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : {};
    delete newErr[parent.field.varname];
    await _.map(parent.validations.values, item => {
      switch (item.rule) {
        case "regex":
        case "pattern":
          const rule = item.ruleValue.replace("/g", "").replace("/", "");
          const ruleRegex = new RegExp(rule, "g");
          if (!_.isUndefined(fields[parent.field.varname]) || !_.isEmpty(fields[parent.field.varname])) {
            if (fields[parent.field.varname] && !fields[parent.field.varname].match(ruleRegex)) {
              newErr[parent.field.varname] = item.error;
            }
          }
          break;
        case "required":
          if ((_.isUndefined(fields[parent.field.varname]) || _.isEmpty(fields[parent.field.varname])).toString() === item.ruleValue) {
            newErr[parent.field.varname] = item.error;
          }
          break;
        case "len":
          const len = fields[parent.field.varname] || "";
          if (!_.isUndefined(fields[parent.field.varname]) || !_.isEmpty(fields[parent.field.varname])) {
            if (_.toNumber(item.ruleValue) !== len.length && !_.isEqual(len.length, 0)) {
              newErr[parent.field.varname] = item.error;
            }
          }
          break;
        case "type":
          if (!_.isUndefined(fields[parent.field.varname]) || !_.isEmpty(fields[parent.field.varname])) {
            if (!validator.isEmail(fields[parent.field.varname])) {
              newErr[parent.field.varname] = item.error;
            }
          }
          break;
      }
    })
    this.setState({ error: newErr });
  }

  renderBase(item, itemErr) {
    const { billspayment: { setInputDetails, getFields } } = this.props;
    const { error } = this.state;
    const propColor = (!_.isEmpty(item)) ? { color: Color.black } : { color: Color.Standard };
    // _.map(getFields.fields, (item) => {
    //     _.map(item, (err) => {
    //       console.log("ERROR: ", error[err.varname]);
    //     })
    // })
    return (
      <View style={[{
        flexDirection: "row", width: "100%", height: 40, alignItems: "center",
        borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7
      },
      error.item ? { borderColor: Color.red } : { borderColor: Color.Standard }]}>
        <Text style={[{ flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingLeft: 5 }, error.item ? { color: Color.red } : propColor]}>
          {_.isEmpty(item) ? "" : item}
        </Text>
        <Icon type='material' name='expand-more' color={error.item ? Color.red : "black"} size={27} />
      </View>
    );
  }

  renderRow(rowData, rowID, highlighted) {
    const { error } = this.state;
    return (
      <View style={[{ paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
      highlighted && { backgroundColor: Color.highlight }]}>
        <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
          highlighted]}>
          {`${rowData.key} `}
        </Text>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    const { actions, billspayment: { setInputDetails, uploadImage } } = this.props;
    const fields = _.has(setInputDetails, "filloutform") ? setInputDetails.filloutform : {};
    const dpLabel = _.has(setInputDetails, "getDP") ? setInputDetails.getDP : {};
    const imageFileName = _.has(setInputDetails, "imageFileName") ? setInputDetails.imageFileName : {};
    const namefield = item.field;
    const { error } = this.state;
    if (namefield.input === "image") {
      // if (!_.isEmpty(uploadImage.url)) {
      //   const newErr = ({}, error);
      //   const newInput = _.merge({}, setInputDetails);
      //   const params = _.merge({}, newInput.filloutform);
      //   params[namefield.varname] = uploadImage.url;
      //   newInput.filloutform = params;
      //   actions.setInputDetails(newInput);
      //   delete newErr[namefield.varname];
      // }
    }
    switch (namefield.input) {
      case "Dropdown":
        return (
          <View style={{ marginTop: 10 }} key={`${index} `}>
            <Text style={{ fontFamily: 'Roboto-Light', color: Color.black, fontWeight: "bold" }}>{namefield.name}:</Text>
            <Dropdown
              animated={true}
              showsVerticalScrollIndicator={true}
              renderBase={this.renderBase.bind(this, dpLabel[namefield.varname], error[namefield.varname])}
              dropdownStyle={{ height: 100, }}
              options={namefield.values}
              renderButtonText={this._onChangeDP(namefield)}
              renderRow={this.renderRow.bind(this)}
              renderSeparator={null} />
          </View>
        );
      case "Calendar":
        return (
          <View key={`${index} `} style={{ backgroundColor: Color.white, marginTop: 15 }}>
            <Text style={{ marginBottom: 15, marginTop: 5, fontFamily: 'Roboto-Light', color: Color.black, fontWeight: "bold" }}>{namefield.name}</Text>
            <DatePicker
              date={fields[namefield.varname]}
              mode="date"
              compName="Date"
              format="YYYY-MM-DD"
              err={error[namefield.varname] || ""}
              onDateChange={this._onChangeDate(item)} />
          </View>
        );
      case "monthpicker":
      case "Month":
        console.log("QEEQE", this.state.showMonthPicker)
        return (
          <View key={`${index} `} style={{ backgroundColor: Color.white, marginTop: 15 }}>
            <Text style={{ marginBottom: 15, marginTop: 5, fontFamily: 'Roboto-Light', color: Color.black, fontWeight: "bold" }}>{item.hint}</Text>
            <TouchableOpacity onPress={() => this.setState({ showMonthPicker: true })}
              style={[error[namefield.varname] ? { borderBottomColor: "red" } : { borderBottomColor: Color.Standard2 }, {
                borderBottomWidth: .7, flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "center"
              }]}>
              <Text style={[_.isUndefined(fields[namefield.varname]) ? { color: Colors.grey500 } : { color: Color.black },
              { marginBottom: 10, marginLeft: 5, fontFamily: 'Roboto-Light' }]} >
                {_.isUndefined(fields[namefield.varname]) ? namefield.name : fields[namefield.varname]}
              </Text>
              <Icon name='calendar' type='evilicon' color="black" size={27} containerStyle={{ marginBottom: 10, marginRight: 5 }} />
            </TouchableOpacity>
            {error[namefield.varname] &&
              <Text style={{ marginTop: 5, fontFamily: 'Roboto-Light', color: "red", fontSize: 13 }}>{error[namefield.varname]}</Text>}
            {this.state.showMonthPicker && (
              <MonthPicker
                onChange={this._onChangeMonthYear(item)}
                value={this.state.monthDate} />
            )}


            {/* <DatePicker
              date={fields[namefield.varname]}
              mode="date"
              compName="Date"
              // minDate={moment().format("YYYY-MM")}
              minDate={moment().format("YYYY")}
              format="YYYY-MM"
              err={error[namefield.varname] || ""}
              onDateChange={this._onChangeDate(item)}
            /> */}
          </View>
        );
      case "Year":
        return (
          <View key={`${index} `} style={{ backgroundColor: Color.white, marginTop: 15 }}>
            <Text style={{ marginBottom: 15, marginTop: 5, fontFamily: 'Roboto-Light', color: Color.black, fontWeight: "bold" }}>{item.hint}</Text>
            <DatePicker
              date={fields[namefield.varname]}
              mode="date"
              compName="Date"
              minDate={moment().format("YYYY")}
              format="YYYY"
              err={error[namefield.varname] || ""}
              onDateChange={this._onChangeDate(item)}
            />
          </View>
        );
      case "image":
        return (
          <View>
            <TouchableOpacity onPress={() => this.upload(namefield)} style={{ marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", padding: 5, borderWidth: 1, borderRadius: 5, borderColor: Color.Standard }}>
              <Icon name='upload' type='font-awesome' color='black' size={15} />
              <Text style={{ fontFamily: 'Roboto-Light', color: Color.black, }}> Click to Upload {namefield.name}</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
              <Text style={[error[namefield.varname] ? { color: "red" } : { color: "black", fontSize: 12 }, { marginTop: 5, fontFamily: 'Roboto-Light' }]}>
                {error[namefield.varname] || imageFileName.fileName}
              </Text>
              {_.isEmpty(imageFileName.fileName) || _.isUndefined(imageFileName.fileName) ? null :
                <Icon onPress={() => this.deleteImage()} name='trash-o' type='font-awesome' color='black' size={13} />}
            </View>
          </View>

        );
      case "Number":
      case "Text":
      case "Email":
      default:
        return (
          <View style={{ marginTop: 10 }} key={`${index} `}>
            <Text style={{ fontFamily: 'Roboto-Light', color: Color.black, fontWeight: "bold" }}>{namefield.name}:</Text>
            <TxtInput
              style={{ backgroundColor: Color.white, marginTop: 10 }}
              style3={{ borderColor: Color.Standard }}
              err={error[namefield.varname] || ""}
              compName={error[namefield.varname] ? "Error" : ""}
              keyboardType={namefield.input === "Number" ? "phone-pad" : null}
              value={fields[namefield.varname]}
              placeholder={namefield.name}
              onBlur={() => this.onLeave(item)}
              onChangeText={this._onChangeText(namefield)}
            />
          </View>
        );
    }
  }
  deleteImage = () => {
    const { billspayment: { setInputDetails } } = this.props;
    delete setInputDetails.imageFileName;
    this.forceUpdate();
  }

  upload = async (itemField) => {
    const { error } = this.state;
    const { actions, billspayment: { setInputDetails }, login: { session } } = this.props;
    const newErr = ({}, error);
    const newInput = _.merge({}, setInputDetails);
    const param2 = _.merge({}, newInput.filloutform);
    ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log("didCancel", response.didCancel);
      }
      else if (response.error) {
        console.log("error", response.error);
      }
      else if (response.customButton) {
        console.log("error", response.customButton);
      }
      else {
        param2[itemField.varname] = response.fileName;
        newInput.imageFileName = response;
        newInput.filloutform = param2;
        actions.setInputDetails(newInput);
      }
    });

    delete newErr[itemField.varname];
  }

  render() {
    const { billspayment: { setInputDetails, getFields, transactionInProgress } } = this.props;
    const fields = _.has(getFields, "fields") ? getFields.fields : {};
    const billers = _.has(setInputDetails, "chooseBillers.biller") ? setInputDetails.chooseBillers.biller : null;
    // const imageSrc = getFields.logo === "" ? require('../../../../resources/images/logo/ups_logo.png')
    //   : { uri: getFields.logo };
    const imageSrc = !_.isEmpty(getFields.logo) && !_.isEqual(getFields.logo, " ") ? { uri: getFields.logo } :
      !_.isEmpty(getFields.billerCode.logo) ? { uri: getFields.billerCode.logo } : require('../../../../resources/images/logo/ups_logo.png');
    // const serviceCharge = Number(getRates.serviceCharge).toFixed(2);
    console.log("ERROR:", this.state.error, this.state.image);
    return (
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, }}>Pay your bills easier than before.</Text>
          <Text style={{ marginTop: 10, fontFamily: "Roboto-Light", fontSize: 16, }}>
            Choose to our biller partner you want to pay to.
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <Text style={{ flex: 1, fontFamily: "Roboto-Light", fontSize: 20 }}>{getFields.name}</Text>
            <Image style={{ width: 50, height: 50 }} resizeMode={"contain"} source={imageSrc} />
          </View>
          <FlatList
            data={fields}
            extraData={{ ...this.billspayment }}
            keyExtractor={(item, index) => `idx${index} `}
            renderItem={this._renderItem} />
          <View style={{ height: 20, marginTop: 10 }} />
        </View>
        {/* <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", marginTop:30}}>
            <View>
              <Text style={{fontFamily: "Roboto-Light",  color: Color.Standard2, fontWeight:"bold"}}> Service Fee </Text>
            </View>
            <View>
              <Text style={{fontFamily: "Roboto-Light",  color: Color.Standard2, fontWeight:"bold"}}> PHP {serviceCharge} </Text>
            </View>
          </View> */}
      </ScrollView>
    );
  }
}

FilloutFormScreen.propTypes = {
  billspayment: PropTypes.object,
};

export default FilloutFormScreen;