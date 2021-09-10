/* eslint-disable */
import React, { PureComponent } from "react";
import { ScrollView, View, Text, Linking, RefreshControl } from "react-native";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import { Table, Row, Rows, TableWrapper, Cell } from "react-native-table-component";
import Dropdown from "__src/components/Dropdown";
import TxtInput from "__src/components/TxtInput";
import { Colors } from "react-native-paper";
import { Icon } from "react-native-elements";
import Resources from "__src/resources";
import CalendarPicker from "./transactions/CalendarPicker";
import _ from "lodash";
import moment from "moment";
const { Color } = Resources;
const filterBy = ["Tracking No", "Amount", "Wallet Currency"];

class TransactionLogs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      isCalendarShowing: false,
      filterText: "",
      filterDP: "",
      tableHead: ['Platform', 'Currency', 'Amount', 'Remarks', 'Transaction Number', 'Date Entry', 'Status'],
      tableBody: [],
    }
  }

  componentWillMount() {
    const { filterText, tableBody, isCalendarShowing } = this.state;
    const { actions, billspayment: { setTransactionDates, setInputDetails, getTransactions }, login: { session } } = this.props;
    _.filter(getTransactions.data, (item) => {
      tableBody.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
    })
    this.setState({ tableBody: tableBody.reverse() })
  }

  componentDidUpdate(prevProps) {
    const { billspayment: { getTransactions } } = this.props;
    const { tableBody } = this.state;
    let tableData = [];
    if (!_.isEmpty(getTransactions) && !_.isEqual(prevProps.billspayment.getTransactions.total, getTransactions.total)) {
      this.setState({ tableBody: [] })
      _.filter(getTransactions.data, (item) => {
        tableData.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
      })
      this.setState({ tableBody: tableData.reverse() })
    }
  }

  renderBase() {
    const { filterDP } = this.state;
    return (
      <View style={{
        flexDirection: "row", width: 125, height: 35, alignItems: "center", borderColor: Colors.grey400,
        borderWidth: .5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingHorizontal: 5, marginTop: 7, justifyContent: "space-between"
      }}>
        <Text ellipsizeMode='tail' style={[_.isEmpty(filterDP) ? { color: Colors.grey400 } : "black", { flex: 1, fontFamily: "Roboto-Light", fontSize: 15, paddingLeft: 5 }]}>
          {filterDP || "Filter By"}
        </Text>
        <Icon type='material' name='expand-more' color={"black"} size={27} />
      </View>
    );
  }

  renderRow(rowData, rowID, highlighted) {
    return (
      <View style={[{
        paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center",
        justifyContent: "space-between", backgroundColor: "white"
      }, highlighted && { backgroundColor: Color.highlight }]}>
        <Text style={[{ margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center" },
          highlighted]}>
          {`${rowData}`}
        </Text>
      </View>
    );
  }

  onChange = (e) => {
    this.setState({ filterDP: e });
  }

  _filterByText = (val) => {
    const { actions, billspayment: { setInputDetails } } = this.props;
    const newInput = _.merge({}, setInputDetails);
    newInput.filterByText = val;
    actions.setInputDetails(newInput);
  }

  _closeCalendar = () => {
    this.setState({ isCalendarShowing: false });
  }

  _onSearch = () => {
    const { filterDP, tableBody } = this.state;
    const { actions, billspayment: { setInputDetails, getTransactions, setTransactionDates } } = this.props;
    const data = [];
    const coveredDates = _.has(setTransactionDates, "markedDates") ? Object.keys(setTransactionDates.markedDates) : {};

    if (_.isEmpty(filterDP) && !(_.isEmpty(setInputDetails.filterByText))) {
      this.setState({ tableBody: data });
    }
    else if (_.isEqual(filterDP, "Tracking No")) {
      if (_.isEmpty(setInputDetails.filterByText)) {
        _.filter(getTransactions.data, (item) => {
          data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
        })
        this.setState({ tableBody: data.reverse() })
      }
      else {
        _.filter(getTransactions.data, (item) => {
          if (_.isEqual(setInputDetails.filterByText, item.transactionNumber)) {
            data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
          }
        })
        this.setState({ tableBody: data.reverse() })
      }
    }
    else if (_.isEqual(filterDP, "Amount")) {
      if (_.isEmpty(setInputDetails.filterByText) && _.isEmpty(coveredDates)) {
        _.filter(getTransactions.data, (item) => {
          data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
        })
        this.setState({ tableBody: data.reverse() })
      }
      else if (_.isEmpty(setInputDetails.filterByText) && !(_.isEmpty(coveredDates))) {
        _.map(coveredDates, dates => {
          _.filter(getTransactions.data, (item) => {
            if (_.isEqual(moment(dates).format('MM/DD/YYYY'), moment(item.createdAt).format('MM/DD/YYYY'))) {
              data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
            }
          })
          this.setState({ tableBody: data.reverse() })
        })
      }
      else if (!_.isEmpty(setInputDetails.filterByText) && (_.isEmpty(coveredDates))) {
        _.filter(getTransactions.data, (item) => {
          if (_.isEqual(setInputDetails.filterByText, `${_.toNumber(item.amount)}`)) {
            data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
          }
        })
        this.setState({ tableBody: data.reverse() })
      }
      else {
        _.map(coveredDates, dates => {
          _.filter(getTransactions.data, (item) => {
            if (_.isEqual(setInputDetails.filterByText, `${_.toNumber(item.amount)}`) && _.isEqual(moment(dates).format('MM/DD/YYYY'), moment(item.createdAt).format('MM/DD/YYYY'))) {
              data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
            }
          })
          this.setState({ tableBody: data.reverse() })
        })
      }
    }
    else if (_.isEqual(filterDP, "Wallet Currency")) {
      if (_.isEmpty(setInputDetails.filterByText) && _.isEmpty(coveredDates)) {
        _.filter(getTransactions.data, (item) => {
          data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
        })
        this.setState({ tableBody: data.reverse() })
      }
      else if (_.isEmpty(setInputDetails.filterByText) && !(_.isEmpty(coveredDates))) {
        _.map(coveredDates, dates => {
          _.filter(getTransactions.data, (item) => {
            if (_.isEqual(moment(dates).format('MM/DD/YYYY'), moment(item.createdAt).format('MM/DD/YYYY'))) {
              data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
            }
          })
          this.setState({ tableBody: data.reverse() })
        })
      }
      else {
        _.map(coveredDates, dates => {
          _.filter(getTransactions.data, (item) => {
            if (_.isEqual(setInputDetails.filterByText.toUpperCase(), item.currency.toUpperCase()) && _.isEqual(moment(dates).format('MM/DD/YYYY'), moment(item.createdAt).format('MM/DD/YYYY'))) {
              data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
            }
          })
          this.setState({ tableBody: data.reverse() })
        })
      }
    }
    else if (_.isEmpty(filterDP) && !(_.isEmpty(coveredDates) && _.isEmpty(setInputDetails.filterByText))) {
      _.map(coveredDates, dates => {
        _.filter(getTransactions.data, (item) => {
          if (_.isEqual(moment(dates).format('MM/DD/YYYY'), moment(item.createdAt).format('MM/DD/YYYY'))) {
            data.push([item.channel, item.currency, Number(parseFloat(item.amount).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 }), item.remarks, item.transactionNumber, moment(item.createdAt).format('MMMM Do YYYY, h:mm a'), item.referenceNumber])
          }
          this.setState({ tableBody: data })
        })
      })
    }
  }

  getReceipt = (data) => {
    Linking.openURL(`http://10.10.20.21:5002/v1/receipts/${data[6]}`);
  }
  refresh = () => {
    const { actions, billspayment: { getTransactions }, login: { session } } = this.props;
    const { tableBody, refresh } = this.state;
    this.setState({ refresh: true }, () => { this.updateTable() });
  }
  updateTable = () => {
    const { actions, billspayment: { getTransactions }, login: { session } } = this.props;
    const { tableBody, refresh } = this.state;
    this.wait(1000).then(() => {
      this.setState({ refresh: false })
    })
  }
  wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    })
  }

  render() {
    const { filterText, tableBody, isCalendarShowing } = this.state;
    const { screenProps, billspayment: { setTransactionDates, setInputDetails, getTransactions } } = this.props;
    const filterendDate = _.filter(setTransactionDates.markedDates, (item) => {
      if (!(_.isEmpty(item.endDate))) {
        return item.endDate;
      }
    })
    const mapendDate = _.map(filterendDate, item => {
      return item.endDate;
    })
    const endDate = moment(mapendDate[0]).format('MM/DD/YYYY');
    const startDate = moment(setTransactionDates.fromDate).format('MM/DD/YYYY');
    let tomorrow = moment(startDate).add(1, 'day').format('MM/DD/YYYY')
    const date = _.isEmpty(setTransactionDates.fromDate) ? "" : _.isEqual(_.map(setTransactionDates.markedDates).length, 1) ? `${startDate} ~ ${tomorrow}`
      : `${startDate} ~ ${endDate}`;
    const element = (data, index) => (
      <TouchableOpacity style={{ width: 100, alignSelf: "center", backgroundColor: Colors.green50, borderWidth: 1, borderColor: Colors.greenA700, borderRadius: 2 }}
        onPress={() => this.getReceipt(data)}>
        <Text style={{ textAlign: 'center', color: Colors.greenA700 }}>Get Receipt</Text>
      </TouchableOpacity>
    );
    console.log("STATE:")
    return (
      <ScrollView style={{ height: "100%", width: "100%", padding: 20 }}
        refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this.refresh} />}>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            <Dropdown
              animated={true}
              showsVerticalScrollIndicator={true}
              renderBase={this.renderBase.bind(this)}
              dropdownStyle={{ height: 125 }}
              options={filterBy}
              renderButtonText={(e) => this.onChange(e)}
              renderRow={this.renderRow.bind(this)}
              renderSeparator={null} />
            <TxtInput
              style={{ backgroundColor: Color.white, marginTop: 7, width: 200 }}
              style3={{ height: 35, borderColor: Colors.grey400, borderWidth: .5, paddingLeft: 5 }}
              // multiline
              // err= {error[namefield.varname] || ""}
              // compName={error[namefield.varname] ? "Error": ""}
              // keyboardType={namefield.input === "Number"? "phone-pad": null}
              value={setInputDetails.filterByText}
              // placeholder={""}
              onChangeText={this._filterByText}
            />
            <TouchableOpacity onPress={this._onSearch} style={{
              paddingVertical: 7, marginTop: 7, paddingHorizontal: 10, borderRadius: 5, borderColor: Colors.grey400, borderWidth: 1,
              flexDirection: "row", justifyContent: "center", alignItems: "center"
            }}>
              <Icon type='evilicon' name='search' color={"black"} size={23} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ isCalendarShowing: !isCalendarShowing })}
              style={{
                paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, borderColor: Colors.grey400, borderWidth: 1,
                flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15
              }}>
              <Text style={{ fontFamily: "Roboto-Light", fontSize: 15, marginRight: 5 }}>
                {date}
              </Text>
              <Icon type='evilicon' name='calendar' color={Colors.grey400} size={27} />
            </TouchableWithoutFeedback>
          </View>

          <ScrollView nestedScrollEnabled style={{ marginTop: 10, backgroundColor: 'white', flex: 1 }}>
            <ScrollView nestedScrollEnabled horizontal>
              <Table borderStyle={{ marginTop: 10, borderWidth: .5, borderColor: Colors.grey400 }}>
                <TableWrapper style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                  {
                    this.state.tableHead.map((rowData, index) => (
                      <Cell key={index} data={rowData}
                        textStyle={[_.isEqual(index, 3) || _.isEqual(index, 4) || _.isEqual(index, 5) ?
                          { width: 200, } : { width: 90, }, { textAlign: "center", fontWeight: "bold", margin: 5 }]} />
                    ))
                  }
                </TableWrapper>
                {
                  tableBody.map((rowData, index) => (
                    <TableWrapper key={index} style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={_.isEqual(cellIndex, this.state.tableHead.length - 1) ? element(rowData, index) : cellData}
                            textStyle={[_.isEqual(cellIndex, 3) || _.isEqual(cellIndex, 4) || _.isEqual(cellIndex, 5) ?
                              { width: 200, } : { width: 90, }, { margin: 5 }]} />
                        ))
                      }

                    </TableWrapper>
                  ))
                }
              </Table>
            </ScrollView>
            {_.isEmpty(tableBody) ? <Text style={{ marginTop: 10, justifyContent: "center", textAlign: "center" }}>Data Not Found</Text> : <Text></Text>}
          </ScrollView>
        </View>

        <CalendarPicker {...this.props}
          openCalendar={isCalendarShowing}
          closeCalendar={this._closeCalendar} />
      </ScrollView>
    )
  }
}
TransactionLogs.propTypes = {
  billspayment: PropTypes.object,
}

export default TransactionLogs;