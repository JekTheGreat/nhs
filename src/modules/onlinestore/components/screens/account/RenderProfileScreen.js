import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import Profile from './Profile'
import RenderTabs from './customer/RenderTabs';
import _ from 'lodash';

export default class RenderProfileScreen extends React.PureComponent {

    componentDidMount() {
        const { actions, login: { session } } = this.props;
        actions.fetchReasonsToCancel();
        actions.fetchPurchaseList(session);
    }

    constructor(props) {
        super(props);
        this.state = {
            initialPage: 0,
            arrayData: [],
            label: "",
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, onlinestore: { patchTransaction }, login: { session } } = this.props;
        if (!_.isEqual(prevProps.onlinestore.patchTransaction, patchTransaction) && !_.isEmpty(patchTransaction)) {
            actions.fetchPurchaseList(session);
            delete this.props.onlinestore.patchTransaction.status;
        }
    }

    setInitialPage = (page) => {
        this.setState({ initialPage: page });
    }

    dataFrom = (data) => {
        this.setState({ arrayData: data })
    }

    label = (labelFrom) => {
        this.setState({ label: labelFrom });

    }
    renderProfileScreen = () => {
        const { actions, onlinestore: { setProfileScreen } } = this.props;
        switch (setProfileScreen) {
            case "renderTabs":
                if (_.isEmpty(this.state.arrayData)) {
                    actions.setProfileScreen("profile");
                } else {
                    return <RenderTabs label={this.state.label} listData={this.state.arrayData} initialPage={this.state.initialPage} {...this.props} />
                }
            case "profile":
            default:
                return <Profile label={this.label} setInitialPage={this.setInitialPage} dataFrom={this.dataFrom} {...this.props} />
        }

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {this.renderProfileScreen()}
                <SafeAreaView />
            </View>
        )
    }
}

RenderProfileScreen.propTypes = {
    onlinestore: PropTypes.object,
    login: PropTypes.object,
}