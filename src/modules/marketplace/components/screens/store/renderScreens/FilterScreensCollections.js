import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, SafeAreaView, Easing } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer-menu';
import DrawerComponent from '../DrawerComponent';
import Header from '../Header';
import FromCollectionScreen from './filtercomponents/FromCollectionScreen'
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

export default class FilterScreensCollections extends React.PureComponent {

    state = { activeTab: 0 }

    setTab = (selected) => {
        this.setState({ activeTab: selected });
    }

    renderFilterScreen = () => {
        const { actions, marketplace: { setFilterScreen } } = this.props;
        return <FromCollectionScreen ref={(e) => this.FromCollectionScreen = e} setTab={this.setTab} activeTab={this.state.activeTab} {...this.props} />
    }

    onBack = () => {
        this.Header.onBack();
    }

    openDrawer = () => {
        this.drawer.openRightDrawer();
    }

    closeDrawer = () => {
        this.drawer.closeDrawer();
    }

    render() {
        return (
            <Drawer
                ref={(comp) => { this.drawer = comp; }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                drawerWidth={325}
                drawerContent={<DrawerComponent closeDrawer={this.closeDrawer} {...this.props} />}
                type={Drawer.types.Overlay}
                drawerPosition={Drawer.positions.Right}
                onDrawerOpen={() => { console.log('Drawer is opened'); }}
                onDrawerClose={() => { console.log('Drawer is closed') }}
                easingFunc={Easing.ease} >

                <ScrollView style={{ backgroundColor: "white" }}>
                    <Header isFilterScreen={true}
                        openDrawer={this.openDrawer}
                        ref={(e) => this.Header = e}
                        {...this.props} />
                    {this.renderFilterScreen()}
                </ScrollView>
            </Drawer>
        )
    }
}