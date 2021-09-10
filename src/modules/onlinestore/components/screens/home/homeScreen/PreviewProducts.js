/* eslint-disable */
import React, { useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, } from "react-native";
import PropTypes from 'prop-types';
import _ from "lodash";
import styles from "../../../../styles.css";
import ProductImages from "./PreviewProducts/ProductImages";
import ProductOptions from "./PreviewProducts/ProductOptions";
import ProductDeliveryOptions from "./PreviewProducts/ProductDeliveryOptions";
import ProductDescSpecs from "./PreviewProducts/ProductDescSpecs";
import RecommendedProducts from "./PreviewProducts/RecommendedProducts";
import ShopDetailsAndReviews from "./PreviewProducts/ShopDetailsAndReviews";

class PreviewProducts extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showProductDesc: true,
			showDeliveryOpt: true,
			showMore: false,
			activeButton: {},
			imageURL: "",
			recommended: []
		}
	}

	// componentWillUnmount() {
	//   const { actions, onlinestore: { setOnlineStoreScreen, setSelectedItems, setInputDetails} } = this.props;
	//   actions.setOnlineStoreScreen({});
	//   actions.setSelectedItems({});
	//   // delete setInputDetails.previewProducts;
	// }

	componentWillMount() {
		const { actions, onlinestore: { setInputDetails, setSelectedItems, getProductList } } = this.props;
		const previewProducts = _.has(setSelectedItems, "previewProducts.images") ? setSelectedItems.previewProducts.images : {};
		this.setState({ imageURL: previewProducts[0].url });

		// if (!_.isUndefined(setInputDetails.options)) {
		// 	const newInput = _.merge({}, setInputDetails);
		// 	let empty = _.merge({}, newInput.options);
		// 	empty = _.isEmpty(setSelectedItems.previewProducts.variation) ? null : {};
		// 	newInput.options = empty;
		// 	actions.setInputDetails(newInput);
		// }
	}

	componentDidUpdate(prevProps) {
		const { onlinestore: { getProductList, setSelectedItems } } = this.props;
		const previewProducts = _.has(setSelectedItems, "previewProducts.images") ? setSelectedItems.previewProducts.images : {};
		const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
		const products = _.has(getProductList, "data") ? getProductList.data : {};
		let related;
		if (!_.isEqual(prevProps.onlinestore.setSelectedItems, setSelectedItems)) {
			related = _.filter(products, items => {
				if (_.isEqual(items.category.toLowerCase(), selectedProduct.category.toLowerCase()) && items.id !== selectedProduct.id) {
					return items;
				}
			})
			this.setState({ imageURL: previewProducts[0].url });
			this.setState({ recommended: related });
		}
	}

	componentDidMount() {
		const { onlinestore: { getProductList, setSelectedItems } } = this.props;
		const selectedProduct = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
		const products = _.has(getProductList, "data") ? getProductList.data : {};
		let related;
		related = _.filter(products, items => {
			if (_.isEqual(items.category.toLowerCase(), selectedProduct.category.toLowerCase()) && items.id !== selectedProduct.id) {
				return items;
			}
		})
		this.setState({ recommended: related });
	}

	_onPress = (item, index) => {
		this.setState({ imageURL: item });
	}

	isDeliveryOptShowing = () => {
		this.setState({ showDeliveryOpt: !this.state.showDeliveryOpt })
	}

	isProductDescShowing = () => {
		this.setState({ showProductDesc: !this.state.showProductDesc })
	}

	showMore = () => {
		this.setState({ showMore: !this.state.showMore });
	}

	goUp = () => {
		this.scrollRef.scrollTo({ y: 0, animated: true })
	}

	render() {
		const { recommended } = this.state;
		const { onlinestore: { setSelectedItems } } = this.props;
		if (_.isEmpty(setSelectedItems)) {
			return null
		}
		else {
			const previewProducts = _.has(setSelectedItems, "previewProducts") ? setSelectedItems.previewProducts : {};
			const b = previewProducts.price_range.split(/[.\-_]/);
			const c = b.map(Number);
			const minPrice = (c[0]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			const maxPrice = (c[1]).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
			const priceRange = _.isEqual(minPrice, maxPrice) ? maxPrice : `${minPrice} \n~ ${maxPrice}`;
			// console.log("goUp", this.props)
			return (
				<ScrollView ref={e => { this.scrollRef = e }} style={styles.scrollViewContainer}>
					<ProductImages changeImage={this._onPress} actions={this.props.actions}
						imageURL={this.state.imageURL} onlinestore={this.props.onlinestore} />
					{/* <ProductOptions login={this.props.login} navigation={this.props.navigation} actions={this.props.actions} onlinestore={this.props.onlinestore} /> */}
					<ProductOptions goToPage={this.props.goToPage} login={this.props.login} navigation={this.props.navigation} actions={this.props.actions} onlinestore={this.props.onlinestore} />
					<ProductDeliveryOptions isDeliveryOptShowing={this.isDeliveryOptShowing} showDeliveryOpt={this.state.showDeliveryOpt}
						onlinestore={this.props.onlinestore} />
					<ProductDescSpecs isProductDescShowing={this.isProductDescShowing} showProductDesc={this.state.showProductDesc}
						onlinestore={this.props.onlinestore} />
					<RecommendedProducts isShowMore={this.showMore} showMore={this.state.showMore} recommended={this.state.recommended}
						actions={this.props.actions} onlinestore={this.props.onlinestore} />
					<ShopDetailsAndReviews onlinestore={this.props.onlinestore} />
					<View style={{ height: 80 }}></View>
				</ScrollView>
			);
		}
	}
}

PreviewProducts.propTypes = {
	onlinestore: PropTypes.object,
};

export default PreviewProducts;