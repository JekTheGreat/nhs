import React from "react";
import { StyleSheet, View, Modal,
} from "react-native";
import PropTypes  from "prop-types";
import {Spinner} from "native-base";

class LoaderModal extends React.PureComponent{
	render() {
		const {loading, color} = this.props;

		return (
			<Modal
				transparent
				animationType={"none"}
				visible={loading}
				onRequestClose={() => {
					console.log("close modal") ;
				}}>
				<View style={styles.modalBackground}>
					<View style={styles.activityIndicatorWrapper}>
						<Spinner
							color={color || "black"}
							size="small"
							animating={loading} />
					</View>
				</View>
			</Modal>
		);
	}
};

LoaderModal.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
	loading: PropTypes.bool,
};

const styles = StyleSheet.create({
	modalBackground: { flex: 1, alignItems: "center", justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)" },
	activityIndicatorWrapper: { backgroundColor: "white", width: 40, height: 40, borderRadius: 20,
		alignItems: "center", justifyContent: "center" },
});

export default LoaderModal;
