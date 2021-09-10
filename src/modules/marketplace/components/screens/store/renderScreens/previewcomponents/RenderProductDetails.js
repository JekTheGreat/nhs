import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import RenderImages from './RenderImages';
import ProductDetails from './ProductDetails';
import ShopDetails from './ShopDetails';
import ProductSpecifications from './ProductSpecifications';
import ProductRatings from './ProductRatings';
import SimilarProducts from './SimilarProducts';
import ProductsYouMayLike from './ProductsYouMayLike';
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;
const { width, height } = Dimensions.get('screen');

export default class RenderProductDetails extends React.PureComponent {
    componentDidUpdate(prevProps) {
        const { marketplace: { postSelectedProducts } } = this.props;
        if (!_.isEmpty(postSelectedProducts) && !_.isEqual(prevProps.marketplace.postSelectedProducts, postSelectedProducts)) {
            this.scroll.scrollTo({ x: 0, y: 0 });
            delete postSelectedProducts.status
            delete postSelectedProducts.total
        }
    }

    render() {
        const { marketplace: { postSelectedProducts, setUserSide, setInputDetails } } = this.props;
        const selectedProducts = (_.has(postSelectedProducts, "data") && !setUserSide) ? postSelectedProducts.data : setUserSide ? setInputDetails.sellerReview : {};
        const similarProducts = _.has(postSelectedProducts, "similar") ? postSelectedProducts.similar : {};
        return (
            <ScrollView style={{ height: height }} ref={(e) => this.scroll = e} >
                <RenderImages
                    images={selectedProducts.images}
                    productDetails={selectedProducts}
                    marketplace={this.props.marketplace}
                    login={this.props.login}
                    actions={this.props.actions} />
                <ProductDetails productDetails={selectedProducts} {...this.props} />
                <ShopDetails
                    actions={this.props.actions}
                    navigation={this.props.navigation}
                    productDetails={selectedProducts}
                    login={this.props.login}
                    marketplace={this.props.marketplace} />
                <ProductSpecifications productDetails={selectedProducts} marketplace={this.props.marketplace} />
                {!setUserSide && <ProductRatings productDetails={selectedProducts} marketplace={this.props.marketplace} />}
                {!setUserSide &&
                    <SimilarProducts
                        actions={this.props.actions}
                        navigation={this.props.navigation}
                        similarProducts={similarProducts}
                        login={this.props.login}
                        marketplace={this.props.marketplace} />}
                {!setUserSide &&
                    <ProductsYouMayLike
                        actions={this.props.actions}
                        navigation={this.props.navigation}
                        login={this.props.login}
                        marketplace={this.props.marketplace} />}
            </ScrollView>
        )
    }
}


