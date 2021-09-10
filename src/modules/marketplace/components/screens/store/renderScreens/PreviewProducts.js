import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import _ from 'lodash';
import { HeaderBackButton } from "react-navigation-stack";
import Button from "__src/components/Button";
import { Icon } from 'react-native-elements';
import RenderProductDetails from './previewcomponents/RenderProductDetails';
import OptionsModal from './previewcomponents/OptionsModal';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');


export default class PreviewProducts extends React.PureComponent {

    // constructor(props) {
    //     super(props);
    //     this.moveAnimation = new Animated.ValueXY({ x: -50, y: 180 })
    // }

    // _moveBall = () => {
    //     Animated.spring(this.moveAnimation, {
    //         toValue: { x: 400, y: -50 },
    //     }).start()
    // }

    state = {
        isModalShowing: false,
        buttonType: "",
    }

    componentWillUnmount() {
        const { actions } = this.props;
        // actions.setSelectedItems({});
        actions.setProductOptions({});
    }

    componentDidMount() {
        const { actions, marketplace: { setProductOptions, postSelectedProducts } } = this.props;
        // const newOptions = _.merge({}, setProductOptions);
        // let options = _.merge({}, newOptions.options);
        // const productOptions = _.has(postSelectedProducts, 'data.options') ? Object.keys(postSelectedProducts.data.options) : [];
        // if (_.has(postSelectedProducts, 'data.options')) {
        //     _.map(productOptions, itemOptions => {
        //         options[itemOptions] = postSelectedProducts.data.options[itemOptions][0];
        //         newOptions.options = options;
        //     })
        //     actions.setProductOptions(newOptions);
        // }

        const newOptions = _.merge({}, setProductOptions);
        const prodData = _.has(postSelectedProducts, 'data') ? postSelectedProducts.data : [];
        if (_.has(postSelectedProducts, 'data.options')) {
            let options = _.merge({}, newOptions[prodData.id]);
            _.map(Object.keys(prodData.options), itemOptions => {
                options[itemOptions] = postSelectedProducts.data.options[itemOptions][0];
                newOptions[prodData.id] = options;
            })
            actions.setProductOptions(newOptions);
        }
    }

    componentDidUpdate(prevProps) {
        const { actions, navigation, marketplace: { countCart, setProductOptions, postSelectedProducts } } = this.props;
        if (!_.isEqual(prevProps.marketplace.postSelectedProducts.data, postSelectedProducts.data) && !_.isEmpty(postSelectedProducts)) {
            // const newOptions = _.merge({}, setProductOptions);
            // let options = _.merge({}, newOptions.options);
            // const productOptions = _.has(postSelectedProducts, 'data.options') ? Object.keys(postSelectedProducts.data.options) : [];
            // if (_.has(postSelectedProducts, 'data.options')) {
            //     _.map(productOptions, itemOptions => {
            //         options[itemOptions] = postSelectedProducts.data.options[itemOptions][0];
            //         newOptions.options = options;
            //     })
            //     actions.setProductOptions(newOptions);
            // }

            const newOptions = _.merge({}, setProductOptions);
            const prodData = _.has(postSelectedProducts, 'data') ? postSelectedProducts.data : [];
            if (_.has(postSelectedProducts, 'data.options')) {
                let options = _.merge({}, newOptions[prodData.id]);
                _.map(Object.keys(prodData.options), itemOptions => {
                    options[itemOptions] = postSelectedProducts.data.options[itemOptions][0];
                    newOptions[prodData.id] = options;
                })
                actions.setProductOptions(newOptions);
            }
        }

        if (!_.isEqual(prevProps.marketplace.countCart, countCart)) {
            navigation.setParams({ countCart: countCart })
            this.closeModal();
            if (_.isEqual(this.state.buttonType, "buyNow")) {
                navigation.navigate("MyCart");
            }
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        console.log("PARAMSNAVI", params)
        return {
            headerTitle: <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontFamily: "Roboto-Light", fontWeight: "bold", color: "black", fontSize: 17 }}>
                    {params.isSellerSide ? "Product Details" : params.header}
                </Text>
            </View>,
            headerLeft: <HeaderBackButton tintColor="black" onPress={() => navigation.goBack()} />,
            headerRight: !params.isSellerSide && <View style={{ justifyContent: "center", alignItems: "center", }}>
                < TouchableOpacity onPress={() => navigation.navigate("MyCart")
                } style={{ position: "absolute", right: 15, alignItems: "center", alignSelf: "center" }}>
                    <Image style={{ width: 20, height: 20, }} source={Res.get("online_store_cart")} resizeMode="contain" />
                </TouchableOpacity >
                {!_.isEqual(params.countCart, 0) &&
                    < View style={{
                        position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
                        right: 5, top: 10, justifyContent: "center", alignItems: "center",
                    }}>
                        <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{params.countCart}</Text>
                    </View>
                }
            </View >
        }
    }

    closeModal = () => {
        this.setState({ isModalShowing: false });
    }

    addToCart = () => {
        this.setState({ isModalShowing: true, buttonType: "addToCart" });
    }

    buyNow = () => {
        this.setState({ isModalShowing: true, buttonType: "buyNow" });
    }

    render() {
        const { navigation, marketplace: { getMyShop, getCartList, postSelectedProducts, setProductOptions, setUserSide } } = this.props
        const selectedProducts = _.has(postSelectedProducts, "data") ? postSelectedProducts.data : {};
        let alreadyInCart;
        _.map(getCartList, item => {
            if (_.isEqual(selectedProducts.id, item.prod_id) && _.isEqual(setProductOptions[item.prod_id], item.variation)) {
                alreadyInCart = item.quantity;
            }
            else if (_.isEmpty(selectedProducts.variation) && _.isEqual(selectedProducts.id, item.prod_id)) {
                alreadyInCart = item.quantity;
            }
        })
        return (
            postSelectedProducts.status === 0 ?
                <View>
                    {navigation.goBack()}
                </View> :

                <View style={{ flex: 1, backgroundColor: "white", }}>
                    <RenderProductDetails {...this.props} />
                    {/* <Animated.Image source={{ uri: selectedProducts.coverImg }} style={[{ height: 30, width: 30 }, this.moveAnimation.getLayout()]} /> */}

                    {setUserSide ? null : !_.isEqual(getMyShop.id, selectedProducts.shop_id.id) ?
                        <View style={{ flexDirection: "row", borderTopColor: Colors.grey300, borderTopWidth: 1 }}>
                            <Button onPress={() => this.addToCart()}
                                icon={_.isUndefined(alreadyInCart) ? "Cart" : ""}
                                style={{ width: "50%", borderRadius: 0, backgroundColor: Color.white, }}
                                labelStyle={{ color: Color.colorPrimaryMP }}
                                label={_.isUndefined(alreadyInCart) || _.isEqual(alreadyInCart, 0) ? "Add to cart" : `${alreadyInCart} Already in Cart`} />
                            <Button onPress={() => this.buyNow()} style={{ borderRadius: 0, width: "50%" }}
                                label={"Buy Now"} />
                        </View> :
                        <View style={{ padding: 10, marginTop: 10, borderWidth: 1, borderColor: Color.colorPrimaryMP }}>
                            <Icon type='font-awesome' name='info-circle' color={Color.colorPrimaryMP} size={25} containerStyle={{ marginTop: 5, marginLeft: 10, position: 'absolute', left: 0 }} />
                            <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center" }}>Own Product</Text>
                            <Text style={{ fontSize: 13, alignSelf: "center" }}>You cannot buy from your own Shop.</Text>
                        </View>
                    }
                    <OptionsModal
                        // moveBall={this._moveBall}
                        closeModal={this.closeModal}
                        isModalShowing={this.state.isModalShowing}
                        buttonType={this.state.buttonType}
                        productDetails={selectedProducts}
                        actions={this.props.actions}
                        login={this.props.login}
                        navigation={this.props.navigation}
                        marketplace={this.props.marketplace} />
                </View>
        )
    }
}