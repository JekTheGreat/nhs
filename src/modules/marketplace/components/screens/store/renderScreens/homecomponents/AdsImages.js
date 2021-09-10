import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class AdsImages extends React.PureComponent {


    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        },
            this.timer = 0;
    }

    componentDidMount = () => {
        const { getAdsImages } = this.props
        let imagesLength;
        _.map(getAdsImages, img => {
            imagesLength = img.gallery.length
        })
        this.timer = setInterval(() => {
            this.setState(prev => ({ selectedIndex: prev.selectedIndex === imagesLength - 1 ? 0 : prev.selectedIndex + 1 }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: width * this.state.selectedIndex
                    })
                }
            )
        }, 3000);
    }

    setSelectedIndex = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectedIndex });
    }

    render() {
        const { getAdsImages } = this.props
        const { selectedIndex } = this.state;
        return (
            <View style={{ width: "100%" }}>
                <ScrollView ref={this.scrollRef}
                    pagingEnabled
                    horizontal
                    style={{ borderRadius: 15, }}
                    onMomentumScrollEnd={this.setSelectedIndex} >
                    {getAdsImages.map(image => (
                        image.gallery.map(item => (
                            <TouchableOpacity key={item.id}  >
                                <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        height: 180,
                                        width: width,
                                        resizeMode: 'cover'
                                    }}
                                />
                            </TouchableOpacity>
                        ))
                    ))}
                </ScrollView>
                <View style={{
                    position: "absolute", bottom: 15, height: 10, width: "100%", display: "flex",
                    flexDirection: "row", justifyContent: "center", alignItems: "center"
                }}>
                    {getAdsImages.map(image => (
                        image.gallery.map((item, i) => (
                            <View key={item.id}
                                style={{ width: 6, height: 6, borderRadius: 3, marginHorizontal: 5, backgroundColor: Colors.white, opacity: i === selectedIndex ? 1 : 0.5 }} />
                        ))
                    ))}
                </View>
            </View>
        );
    }
}