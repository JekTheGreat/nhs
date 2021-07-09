import React from "react";
import {Modal} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import PropTypes from "prop-types";
import Loading from "../Loading";

export default class FullScreen extends React.PureComponent {
	render() {
		const {images, visible, onRequestClose} = this.props;

		return (
			<Modal visible={visible} transparent onRequestClose={onRequestClose}>
				<ImageViewer
					onSwipeDown={() => onRequestClose()}
					enableSwipeDown
					loadingRender={() => <Loading size="small" color="white" />}
					onCancel={onRequestClose} imageUrls={images}/>
			</Modal>
		);
	}
}

FullScreen.propTypes = {
	images: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
	visible: PropTypes.bool,
	onRequestClose: PropTypes.func,
};
