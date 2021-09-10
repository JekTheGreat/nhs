/*eslint-disable*/
import { combineReducers } from "redux";
import _ from 'lodash';
import * as Types from "./types";

const reset = {};

const inputDetails = {
    selectedProductToReturn: {},
    reasonsToReturn: {},
    quantityToReturn: {},
    imagesToReturn: {},
    toReview: {},
    toReviewRate: {},
    toReviewComment: {},
    mySalesInitialPage: 0,
}

const setUserSide = (state = false, action) => {
    switch (action.type) {
        case Types.SET_USER_SIDE:
            return action.data;
        default:
            return state;
    }
};

const setOnlineStoreScreen = (state = "home", action) => {
    switch (action.type) {
        case Types.SET_ONLINESTORE_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const setManageAddressScreen = (state = "main", action) => {
    switch (action.type) {
        case Types.SET_MANAGEADDRESS_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const setFilterScreen = (state = "categories", action) => {
    switch (action.type) {
        case Types.SET_FILTER_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const setToReturnScreen = (state = "chooseItem", action) => {
    switch (action.type) {
        case Types.SET_RETURN_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const setAddEditProductScreen = (state = "first", action) => {
    switch (action.type) {
        case Types.SET_ADDEDIT_PRODUCT_SCREEN:
            return action.data;
        default:
            return state;
    }
};


const setSelectedItems = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_SELECTED_ITEMS:
            return action.data;
        default:
            return state;
    }
};

const setSelectedReports = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_SELECTED_REPORTS:
            return action.data;
        default:
            return state;
    }
};

const setSelectedTransaction = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_SELECTED_TRANSACTION:
            return action.data;
        default:
            return state;
    }
};

const setReturnItems = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_RETURN_ITEMS:
            return action.data;
        default:
            return state;
    }
};


const setCollectionProducts = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_COLLECTION_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};



const setProductOptions = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_PRODUCT_OPTIONS:
            return action.data;
        case Types.RESET_DATA:
            return reset;
        default:
            return state;
    }
};

const setFavorites = (state = [], action) => {
    switch (action.type) {
        case Types.SET_FAVORITES:
            return action.data;
        default:
            return state;
    }
};

const postSelectedProducts = (state = {}, action) => {
    switch (action.type) {
        case Types.POST_SELECTED_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};

const addToCart = (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_TO_CART:
            return action.data;
        default:
            return state;
    }
};

const patchCartItem = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_CARTITEM:
            return action.data;
        default:
            return state;
    }
};

const patchCartOptions = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_CARTOPTIONS:
            return action.data;
        default:
            return state;
    }
};

const postGetCharge = (state = {}, action) => {
    switch (action.type) {
        case Types.POST_GET_CHARGE:
            return action.data;
        default:
            return state;
    }
};

const deleteFromCart = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_FROM_CART:
            return action.data;
        default:
            return state;
    }
};

const setInputDetails = (state = inputDetails, action) => {
    switch (action.type) {
        case Types.SET_INPUTDETAILS:
            return action.data;
        default:
            return state;
    }
};

const setFilterData = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_FILTER_DATA:
            return action.data;
        default:
            return state;
    }
};

const setCartListOnCheck = (state = {}, action) => {
    switch (action.type) {
        case Types.SET_CARTLIST_ONCHECK:
            return action.data;
        case Types.RESET_DATA:
            return reset;
        default:
            return state;
    }
};


const isFilterScreen = (state = false, action) => {
    switch (action.type) {
        case Types.IS_FILTERSCREEN:
            return action.data;
        default:
            return state;
    }
};


const isSearchInput = (state = false, action) => {
    switch (action.type) {
        case Types.IS_SEARCH_INPUT:
            return action.data;
        default:
            return state;
    }
};

const isFromSearchScreen = (state = false, action) => {
    switch (action.type) {
        case Types.IS_FROM_SEARCH_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const isFromCollectionScreen = (state = false, action) => {
    switch (action.type) {
        case Types.IS_FROMCOLLECTION_SCREEN:
            return action.data;
        default:
            return state;
    }
};

const countCart = (state = 0, action) => {
    switch (action.type) {
        case Types.COUNT_CART:
            return action.data;
        default:
            return state;
    }
};

const getMyShop = (state = [], action) => {
    switch (action.type) {
        case Types.GET_MYSHOP:
            return action.data;
        default:
            return state;
    }
};


const getShopList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SHOP_LIST:
            return action.data;
        default:
            return state;
    }
};

const getShopIdDetails = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SHOPID_DETAILS:
            return action.data;
        default:
            return state;
    }
};


const getShopIdCollections = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SHOPID_COLLECTIONS:
            return action.data;
        default:
            return state;
    }
};


const getShopIdProducts = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SHOPID_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};



const getCartList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_CART_LIST:
            return action.data;
        default:
            return state;
    }
};

const getAdsImages = (state = [], action) => {
    switch (action.type) {
        case Types.GET_ADS_IMAGES:
            return action.data;
        default:
            return state;
    }
};

const getNotifications = (state = [], action) => {
    switch (action.type) {
        case Types.GET_NOTIFICATIONS:
            return action.data;
        default:
            return state;
    }
};

const patchNotifications = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_NOTIFICATIONS:
            return action.data;
        default:
            return state;
    }
};


const getSettings = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SETTINGS:
            return action.data;
        default:
            return state;
    }
};

const getReasonList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_REASON_LIST:
            return action.data;
        default:
            return state;
    }
};


const patchSettings = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_SETTINGS:
            return action.data;
        default:
            return state;
    }
};

const patchTransactions = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_TRANSACTIONS:
            return action.data;
        default:
            return state;
    }
};

const getDeliveryAddress = (state = [], action) => {
    switch (action.type) {
        case Types.GET_DELIVERY_ADDRESS:
            return action.data;
        default:
            return state;
    }
};

const patchAddress = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_ADDRESS:
            return action.data;
        default:
            return state;
    }
};


const addAddress = (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_ADDRESS:
            return action.data;
        default:
            return state;
    }
};

const deleteAddress = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_ADDRESS:
            return action.data;
        default:
            return state;
    }
};

const getCategoryList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_CATEGORY_LIST:
            return action.data;
        default:
            return state;
    }
};

const getFilterCategoryList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_FILTER_CATEGORY_LIST:
            return action.data;
        default:
            return state;
    }
};

const postProductList = (state = [], action) => {
    switch (action.type) {
        case Types.POST_PRODUCT_LIST:
            return action.data;
        default:
            return state;
    }
};

const placeOrderData = (state = [], action) => {
    switch (action.type) {
        case Types.PLACE_ORDER:
            return action.data;
        default:
            return state;
    }
};


const getFavorites = (state = [], action) => {
    switch (action.type) {
        case Types.GET_FAVORITES:
            return action.data;
        default:
            return state;
    }
};

const addToFavorites = (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_TO_FAVORITES:
            return action.data;
        default:
            return state;
    }
};

const removeFromFavorites = (state = {}, action) => {
    switch (action.type) {
        case Types.REMOVE_FROM_FAVORITES:
            return action.data;
        default:
            return state;
    }
};

const getProductList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_PRODUCT_LIST:
            return action.data;
        default:
            return state;
    }
};

const getTrendingProducts = (state = [], action) => {
    switch (action.type) {
        case Types.GET_TRENDING_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};

const getTopProducts = (state = [], action) => {
    switch (action.type) {
        case Types.GET_TOP_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};

const getSaleProducts = (state = [], action) => {
    switch (action.type) {
        case Types.GET_SALE_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};

const getReports = (state = [], action) => {
    switch (action.type) {
        case Types.GET_REPORTS:
            return action.data;
        default:
            return state;
    }
};


const getPurchaseList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_PURCHASELIST:
            return action.data;
        default:
            return state;
    }
};


const getReturnList = (state = [], action) => {
    switch (action.type) {
        case Types.GET_RETURN_LIST:
            return action.data;
        default:
            return state;
    }
};


const loadMoreList = (state = false, action) => {
    switch (action.type) {
        case Types.LOAD_MORE_LIST:
            return true;
        case Types.GET_REPORTS:
            return false;
        default:
            return state;
    }
};


const transactionInProgress = (state = false, action) => {
    switch (action.type) {
        case Types.TRANSACTION_IN_PROGRESS:
            return true;
        case Types.GET_CATEGORY_LIST:
        case Types.GET_ADS_IMAGES:
        case Types.GET_SALE_PRODUCTS:
        case Types.PATCH_ITEM:
        case Types.UPLOAD_IMAGE:
        case Types.GET_SELLER_PRODUCTS:
        case Types.GET_COLLECTIONS:
        case Types.PATCH_TORETURN:
        case Types.POST_PRODUCT_LIST:
        case Types.GET_PURCHASELIST:
        case Types.GET_RETURN_LIST:
        case Types.GET_NOTIFICATIONS:
        case Types.GET_DELIVERY_ADDRESS:
        case Types.PATCH_TRANSACTIONS:
        case Types.GET_TOP_PRODUCTS:
        case Types.GET_PRODUCT_LIST:
        case Types.GET_TRENDING_PRODUCTS:
        case Types.GET_FILTER_CATEGORY_LIST:
        case Types.GET_CART_LIST:
        case Types.GET_MYSHOP:
        case Types.GET_SHOP_LIST:
        case Types.PLACE_ORDER:
        case Types.TRANSACTION_FAILED:
            return false;
        default:
            return state;
    }
};


const transactionFailed = (state = {}, action) => {
    switch (action.type) {
        case Types.TRANSACTION_FAILED:
            return action.error;
        case Types.TRANSACTION_IN_PROGRESS:
            return {};
        default:
            return state;
    }
};


const uploadImage = (state = [], action) => {
    switch (action.type) {
        case Types.UPLOAD_IMAGE:
            let currentState = [...state]
            return _.concat(currentState, action.data);
        case Types.RESET_IMG:
            return [];
        default:
            return state;
    }
};


const patchReturn = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_TORETURN:
            return action.data;
        default:
            return state;
    }
};

const patchItem = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_ITEM:
            return action.data;
        default:
            return state;
    }
};

const productRate = (state = {}, action) => {
    switch (action.type) {
        case Types.PRODUCT_RATE:
            return action.data;
        default:
            return state;
    }
};

const productReview = (state = {}, action) => {
    switch (action.type) {
        case Types.PRODUCT_REVIEW:
            return action.data;
        default:
            return state;
    }
};


const getBlockList = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_BLOCK_LIST:
            return action.data;
        default:
            return state;
    }
};

const addBlockUser = (state = {}, action) => {
    switch (action.type) {
        case Types.ADD_BLOCK_USER:
            return action.data;
        default:
            return state;
    }
};

const removeBlockUser = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_BLOCK_USER:
            return action.data;
        default:
            return state;
    }
};



const getTodoList = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_TODO_LIST:
            return action.data;
        default:
            return state;
    }
};

const getSellerReports = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_SELLER_REPORTS:
            return action.data;
        default:
            return state;
    }
};


const getSellerReturns = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_SELLER_RETURNS:
            return action.data;
        default:
            return state;
    }
};

const getMySales = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_MY_SALES:
            return action.data;
        default:
            return state;
    }
};

const getSellerProducts = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_SELLER_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};


const patchProductSwitch = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_PRODUCT_SWITCH:
            return action.data;
        default:
            return state;
    }
};


const removeProducts = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_PRODUCTS:
            return action.data;
        default:
            return state;
    }
};


const getCollections = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_COLLECTIONS:
            return action.data;
        default:
            return state;
    }
};

const saveCollections = (state = {}, action) => {
    switch (action.type) {
        case Types.SAVE_COLLECTIONS:
            return action.data;
        default:
            return state;
    }
};

const patchCollections = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_COLLECTIONS:
            return action.data;
        default:
            return state;
    }
};

const patchCollectionsItem = (state = {}, action) => {
    switch (action.type) {
        case Types.PATCH_COLLECTIONS_ITEM:
            return action.data;
        default:
            return state;
    }
};

const deleteCollections = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_COLLECTIONS:
            return action.data;
        default:
            return state;
    }
};


const getSearchHistory = (state = {}, action) => {
    switch (action.type) {
        case Types.GET_SEARCH_HISTORY:
            return action.data;
        default:
            return state;
    }
};

const deleteSearchHistory = (state = {}, action) => {
    switch (action.type) {
        case Types.DELETE_SEARCH_HISTORY:
            return action.data;
        default:
            return state;
    }
};


export default combineReducers({
    getSearchHistory,
    deleteSearchHistory,
    getCollections,
    saveCollections,
    patchCollections,
    patchCollectionsItem,
    deleteCollections,
    setOnlineStoreScreen,
    patchProductSwitch,
    removeProducts,
    setUserSide,
    setManageAddressScreen,
    productRate,
    productReview,
    setFilterScreen,
    setToReturnScreen,
    setAddEditProductScreen,
    isFromCollectionScreen,
    setSelectedItems,
    setSelectedReports,
    setSelectedTransaction,
    setReturnItems,
    setProductOptions,
    setFavorites,
    postSelectedProducts,
    addToCart,
    setCollectionProducts,
    patchCartItem,
    patchCartOptions,
    postGetCharge,
    placeOrderData,
    deleteFromCart,
    setInputDetails,
    setFilterData,
    setCartListOnCheck,
    isFilterScreen,
    isSearchInput,
    isFromSearchScreen,
    countCart,
    getMyShop,
    getReports,
    getPurchaseList,
    getReturnList,
    getNotifications,
    patchNotifications,
    getSettings,
    getReasonList,
    patchSettings,
    patchTransactions,
    getDeliveryAddress,
    patchAddress,
    addAddress,
    deleteAddress,
    getFavorites,
    getShopList,
    getShopIdDetails,
    getShopIdCollections,
    getShopIdProducts,
    getCartList,
    getAdsImages,
    getCategoryList,
    getFilterCategoryList,
    getProductList,
    getTrendingProducts,
    getTopProducts,
    getSaleProducts,
    loadMoreList,
    transactionInProgress,
    transactionFailed,
    postProductList,
    addToFavorites,
    removeFromFavorites,
    uploadImage,
    patchReturn,
    patchItem,
    getBlockList,
    addBlockUser,
    removeBlockUser,
    getTodoList,
    getSellerReports,
    getSellerReturns,
    getMySales,
    getSellerProducts,
})