import React, {PureComponent} from "react";
import Policy from "./Policy";
import TermsCondition from "./TermsCondition";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Content extends PureComponent{

  renderChildren = () => {
  	const { navigation } = this.props;
  	const title = _.has(navigation, "state.params.title") ?
  		navigation.state.params.title : "";
	
  	switch (title){
  	case "Privacy Policy":
  		return <Policy {...this.props}/>;
  	default:
  		return <TermsCondition {...this.props}/>;
  	}
  }
  render(){
  	return this.renderChildren();
  }
}

Content.propTypes = {
	navigation: PropTypes.object,
};
