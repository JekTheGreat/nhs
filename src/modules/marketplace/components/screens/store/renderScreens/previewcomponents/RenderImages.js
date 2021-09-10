import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Share, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');



export default class RenderImages extends React.PureComponent {
    state = {
        currentImage: 0,
        favorite: false,
        favoritesList: [],
    }

    componentDidUpdate(prevProps) {
        const { actions, login: { session }, marketplace: { getFavorites, addToFavorites }, productDetails } = this.props;
        if (!_.isEmpty(addToFavorites) && !_.isEqual(prevProps.marketplace.addToFavorites, addToFavorites)) {
            delete addToFavorites.status;
            actions.getFavorites(session);
        }
        if (!_.isEmpty(getFavorites) && !_.isEqual(prevProps.marketplace.getFavorites, getFavorites)) {
            delete getFavorites.total;
            const test = _.filter(getFavorites.data, fav => {
                if (_.isEqual(productDetails.id, fav.id)) {
                    return fav.id;
                }
            })
            this.setState({ favoritesList: test });
        }
    }

    _renderImages = ({ item, index }) => {
        return (
            <View key={`img_id ${item.id}`} style={{}} >
                {/* <Image source={{ uri: item.url }} style={{ width: width, height: height / 2.5 }} /> */}
                <View style={{ backgroundColor: "pink", width: width, height: height / 2.5 }} />
            </View>
        )
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Share with: ',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    onFavorites = (id) => {
        const { actions, login: { session }, marketplace: { setFavorites } } = this.props;
        const isFavorite = !_.isEmpty(this.state.favoritesList) ? true : false;
        if (!isFavorite) {
            actions.addToFavorites(session, id);
        }
        else {
            actions.removeFromFavorites(session, id);
            actions.getFavorites(session);
        }
    }


    render() {
        const { images, productDetails, marketplace: { getFavorites, setUserSide } } = this.props;
        let onScrollEnd = (e) => {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            let pageNum = Math.floor(contentOffset.x / viewSize.width);
            this.setState({ currentImage: pageNum })
        }
        const isFavorite = !_.isEmpty(this.state.favoritesList) ? true : false;
        return (
            <View>
                <FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    onMomentumScrollEnd={onScrollEnd}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(img) => { `img_id ${img.id}` }}
                    renderItem={this._renderImages} />
                <View style={{
                    position: "absolute", width: 40, height: 20, borderRadius: 10, backgroundColor: Color.colorPrimaryMP,
                    right: 25, bottom: 15, justifyContent: "center", alignItems: "center",
                }}>
                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 12 }}>{`${this.state.currentImage + 1}/${images.length}`}</Text>
                </View>
                <View style={{
                    position: "absolute", width: 40, height: 20,
                    right: 25, top: 15, justifyContent: "center", alignItems: "center",
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={!setUserSide ? this.onShare : console.log("")} disabled={!setUserSide ? false : true}
                            style={{ paddingHorizontal: 5, paddingVertical: 13, justifyContent: "center", borderRadius: 15, marginRight: 5, backgroundColor: Color.colorPrimaryMP, }}>
                            <Icon type='evilicon' name="share-google" color="white" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={!setUserSide ? () => this.onFavorites(productDetails.id) : console.log("")} disabled={!setUserSide ? false : true}
                            style={{ paddingHorizontal: 5, paddingVertical: 13, justifyContent: "center", borderRadius: 15, marginRight: 5, backgroundColor: Color.colorPrimaryMP, }}>
                            <Icon type='font-awesome' name={isFavorite ? "heart" : "heart-o"} color={isFavorite ? "red" : "white"} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}