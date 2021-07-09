import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ActionCreators from "../actions";

import SelectionScreen from "../components/screens/SelectionScreen";

const mapStateToProps = ({ home, }) => ({
    home,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...ActionCreators,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionScreen);
