import React, { PureComponent } from 'react';
import { View, Modal, Image, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import Resources from "__src/resources";
import PropTypes from "prop-types";
const { Color, Res } = Resources;
const { width, height } = Dimensions.get('window');
class ViewImageModal extends PureComponent {


    render() {
        const { closeModal, viewImage, imageURL } = this.props;
        console.log("imageURL", imageURL)
        return (
            <Modal
                visible={viewImage}
                transparent
                onRequestClose={closeModal}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ paddingHorizontal: 10, borderRadius: 10, shadowRadius: 5, width: width - 10, height: 225, backgroundColor: "white" }}>
                        <Text onPress={() => closeModal()} style={{ textAlign: "right", fontFamily: "Roboto-Light", fontSize: 14, color: "black", fontWeight: "bold" }}>
                            x
                        </Text>
                        <Image
                            source={{ uri: imageURL }}
                            style={{ marginTop: 5, height: "85%", width: "100%" }}
                            resizeMode={'stretch'} />
                    </View>
                </View>
            </Modal>
        );
    }

}

ViewImageModal.propTypes = {
    billspayment: PropTypes.object,
};

export default ViewImageModal;