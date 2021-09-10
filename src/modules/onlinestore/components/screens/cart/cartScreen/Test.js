import React from 'react';
import Empty from './EmptyCartScreen';
import Test2 from './Test2';
import { StyleSheet, Dimensions } from 'react-native';
import { Tab, Tabs } from "native-base";
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
var { height, width } = Dimensions.get('window');
const { Res, Color } = Resource;
const tabLabels = ["Pay Bills", "Transaction Logs"];

class Test extends React.PureComponent {

    renderTab = (item) => {
        switch (item) {
            case "Pay Bills":
                return <Empty key={item} tabLabel={item} ref={(e) => this.Paybills = e} {...this.props} />;
            case "Transaction Logs":
                return <Test2 key={item} tabLabel={item} ref={(e) => this.TransactionLogs = e} {...this.props} />;
        }
    }

    render() {
        return (
            <Tabs
                tabBarUnderlineStyle={styles2.tabBarUnderlineStyle}
                style={styles2.TabsStyle}
                locked
                tabBarActiveTextColor={Color.LightBlue}
                tabBarInactiveTextColor={Color.Standard2}>
                {tabLabels.map((item, idx) => {
                    return (
                        <Tab key={`idx ${idx}`}
                            heading={`${item}`}
                            tabStyle={styles2.tabStyle}
                            textStyle={styles2.textStyle}
                            activeTextStyle={{ fontSize: 13, color: Color.LightBlue }}
                            activeTabStyle={{ backgroundColor: Color.white }}>
                            {this.renderTab(item)}
                        </Tab>
                    );
                })}
            </Tabs>);
    }

}

const styles2 = StyleSheet.create({
    tabBarUnderlineStyle: { height: 1, backgroundColor: Color.LightBlue },
    tabStyle: { backgroundColor: Color.white },
    TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 11 },
});

export default Test;