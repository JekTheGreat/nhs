import * as Types from "./types";
import OnlineStoreApi from "./api/index";
import * as globals from "__src/globals";
import _ from 'lodash';

export const reset_data = () => (
    async (dispatch) => {
        dispatch({ type: Types.RESET_DATA });
    }
);

export const reset_upload = () => (
    async (dispatch) => {
        dispatch({ type: Types.RESET_IMG });
    }
);

export const setUserSide = (data) => ({
    type: Types.SET_USER_SIDE,
    data,
});

export const setOnlineStoreScreen = (data) => ({
    type: Types.SET_ONLINESTORE_SCREEN,
    data,
});

export const setManageAddressScreen = (data) => ({
    type: Types.SET_MANAGEADDRESS_SCREEN,
    data,
});

export const setFilterScreen = (data) => ({
    type: Types.SET_FILTER_SCREEN,
    data,
});

export const isSearchInput = (data) => ({
    type: Types.IS_SEARCH_INPUT,
    data,
});

export const setToReturnScreen = (data) => ({
    type: Types.SET_RETURN_SCREEN,
    data,
});

export const setAddEditProductScreen = (data) => ({
    type: Types.SET_ADDEDIT_PRODUCT_SCREEN,
    data,
});

export const setSelectedItems = (data) => ({
    type: Types.SET_SELECTED_ITEMS,
    data,
});

export const setSelectedReports = (data) => ({
    type: Types.SET_SELECTED_REPORTS,
    data,
});

export const setSelectedTransaction = (data) => ({
    type: Types.SET_SELECTED_TRANSACTION,
    data,
});

export const setReturnItems = (data) => ({
    type: Types.SET_RETURN_ITEMS,
    data,
});

export const setProductOptions = (data) => ({
    type: Types.SET_PRODUCT_OPTIONS,
    data,
});

export const setFavorites = (data) => ({
    type: Types.SET_FAVORITES,
    data,
});


export const setInputDetails = (data) => ({
    type: Types.SET_INPUTDETAILS,
    data,
});

export const setFilterData = (data) => ({
    type: Types.SET_FILTER_DATA,
    data,
});

export const setCollectionProducts = (data) => ({
    type: Types.SET_COLLECTION_PRODUCTS,
    data,
});

export const setCartListOnCheck = (data) => ({
    type: Types.SET_CARTLIST_ONCHECK,
    data,
});

export const isFilterScreen = (data) => ({
    type: Types.IS_FILTERSCREEN,
    data,
});

export const isFromSearchScreen = (data) => ({
    type: Types.IS_FROM_SEARCH_SCREEN,
    data,
});


export const isFromCollectionScreen = (data) => ({
    type: Types.IS_FROMCOLLECTION_SCREEN,
    data,
});


export const countCart = (data) => ({
    type: Types.COUNT_CART,
    data,
});

export const getMyShop = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getMyShop();

            if (result) {
                dispatch({ type: Types.GET_MYSHOP, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getShopList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getShopList();

            if (result) {
                dispatch({ type: Types.GET_SHOP_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getShopIdDetails = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getShopIdDetails(id);

            if (result) {
                dispatch({ type: Types.GET_SHOPID_DETAILS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getShopIdCollections = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getShopIdCollections(id);

            if (result) {
                dispatch({ type: Types.GET_SHOPID_COLLECTIONS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getShopIdProducts = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getShopIdProducts(id);

            if (result) {
                dispatch({ type: Types.GET_SHOPID_PRODUCTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getCartList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getCartList();

            if (result) {
                dispatch({ type: Types.GET_CART_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getAdsImages = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getAdsImages();

            if (result) {
                dispatch({ type: Types.GET_ADS_IMAGES, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getNotifications = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getNotifications();

            if (result) {
                dispatch({ type: Types.GET_NOTIFICATIONS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const patchNotifications = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchNotifications(param);

            if (result) {
                dispatch({ type: Types.PATCH_NOTIFICATIONS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const getSettings = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSettings();

            if (result) {
                dispatch({ type: Types.GET_SETTINGS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getReasonList = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getReasonList();

            if (result) {
                dispatch({ type: Types.GET_REASON_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const patchSettings = (session, type) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchSettings(type);

            if (result) {
                dispatch({ type: Types.PATCH_SETTINGS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const patchTransactions = (session, id, params) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchTransactions(id, params);

            if (result) {
                dispatch({ type: Types.PATCH_TRANSACTIONS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getDeliveryAddress = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getDeliveryAddress(id);

            if (result) {
                dispatch({ type: Types.GET_DELIVERY_ADDRESS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const patchAddress = (id, session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchAddress(id, param);
            if (result) {
                dispatch({ type: Types.PATCH_ADDRESS, data: result });
            }
        } catch (error) {

        }
    }
);


export const addAddress = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.addAddress(param);
            if (result) {
                dispatch({ type: Types.ADD_ADDRESS, data: result });
            }
        } catch (error) {

        }
    }
);

export const deleteAddress = (id, session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.deleteAddress(id);
            if (result) {
                dispatch({ type: Types.DELETE_ADDRESS, data: result });
            }
        } catch (error) {

        }
    }
);

export const getCategoryList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getCategoryList();

            if (result) {
                dispatch({ type: Types.GET_CATEGORY_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getFilterCategoryList = (session, product) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getFilterCategoryList(product);

            if (result) {
                dispatch({ type: Types.GET_FILTER_CATEGORY_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getProductList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getProductList();

            if (result) {
                dispatch({ type: Types.GET_PRODUCT_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const postProductList = (session, param) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.postProductList(param);
            if (result) {
                dispatch({ type: Types.POST_PRODUCT_LIST, data: result });
            }
        } catch (error) {

        }
    }
);

export const placeOrder = (session, param) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.placeOrder(param);
            if (result) {
                dispatch({ type: Types.PLACE_ORDER, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });
        }
    }
);



export const addToCart = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.addToCart(param);
            if (result) {
                dispatch({ type: Types.ADD_TO_CART, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });
        }
    }
);

export const patchCartItem = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchCartItem(param);
            if (result) {
                dispatch({ type: Types.PATCH_CARTITEM, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const patchCartOptions = (id, session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchCartOptions(id, param);
            if (result) {
                dispatch({ type: Types.PATCH_CARTOPTIONS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const postGetCharge = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.postGetCharge(param);
            if (result) {
                dispatch({ type: Types.POST_GET_CHARGE, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const deleteFromCart = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.deleteFromCart(id);
            if (result) {
                dispatch({ type: Types.DELETE_FROM_CART, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const postSelectedProducts = (session, id, slug) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.postSelectedProducts(id, slug);
            if (result) {
                dispatch({ type: Types.POST_SELECTED_PRODUCTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const addToFavorites = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.addToFavorites(id);
            if (result) {
                dispatch({ type: Types.ADD_TO_FAVORITES, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const removeFromFavorites = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.removeFromFavorites(id);
            if (result) {
                dispatch({ type: Types.REMOVE_FROM_FAVORITES, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getFavorites = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getFavorites();

            if (result) {
                dispatch({ type: Types.GET_FAVORITES, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });
        }
    }
);


export const getReports = (session, skip) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.LOAD_MORE_LIST });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getReports(skip);
            if (result) {
                dispatch({ type: Types.GET_REPORTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });
        }
    }
);


export const getPurchaseList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getPurchaseList();
            if (result) {
                dispatch({ type: Types.GET_PURCHASELIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const getReturnList = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getReturnList();
            if (result) {
                dispatch({ type: Types.GET_RETURN_LIST, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const getTrendingProducts = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getTrendingProducts();

            if (result) {
                dispatch({ type: Types.GET_TRENDING_PRODUCTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });
        }
    }
);

export const getTopProducts = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getTopProducts();

            if (result) {
                dispatch({ type: Types.GET_TOP_PRODUCTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);

export const getSaleProducts = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSaleProducts();

            if (result) {
                dispatch({ type: Types.GET_SALE_PRODUCTS, data: result });
            }
        } catch (error) {
            dispatch({ type: Types.TRANSACTION_FAILED, error: error });

        }
    }
);


export const uploadImage = (session, param, id, type) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            globals.OnlineStoreForm.setFormData(param);
            const result = await globals.OnlineStoreForm.post(`/product/upload/?type=${type}`);
            let data;
            if (type === "mypurchases-return") {
                if (!_.isEmpty(id)) {
                    let obj = {}
                    obj[id] = result;
                    data = obj;
                } else {
                    data = result;
                }
            }
            else {
                data = result;
            }
            if (result) {
                console.log("RESULT: ", result);
                dispatch({ type: Types.UPLOAD_IMAGE, data: data });
            }
        } catch (error) {
            dispatch({ type: Types.UPLOAD_IMAGE, data: error });
        }
    }
);


export const patchReturn = (session, param, route) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchReturn(param, route);
            if (result) {
                dispatch({ type: Types.PATCH_TORETURN, data: result });
            }
        } catch (error) {
        }
    }
);

export const patchItem = (session, param, id) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchItem(param, id);
            if (result) {
                dispatch({ type: Types.PATCH_ITEM, data: result });
            }
        } catch (error) {
        }
    }
);

export const productRate = (session, param, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.productRate(param, id);
            if (result) {
                dispatch({ type: Types.PRODUCT_RATE, data: result });
            }
        } catch (error) {
        }
    }
);

export const productReview = (session, param, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.productReview(param, id);
            if (result) {
                dispatch({ type: Types.PRODUCT_REVIEW, data: result });
            }
        } catch (error) {
        }
    }
);

export const getBlockList = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getBlockList();
            if (result) {
                dispatch({ type: Types.GET_BLOCK_LIST, data: result });
            }
        } catch (error) {
        }
    }
);

export const addBlockUser = (session, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.addBlockUser(param);
            if (result) {
                dispatch({ type: Types.ADD_BLOCK_USER, data: result });
            }
        } catch (error) {
        }
    }
);

export const removeBlockUser = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.removeBlockUser(id);
            if (result) {
                dispatch({ type: Types.DELETE_BLOCK_USER, data: result });
            }
        } catch (error) {
        }
    }
);


export const getTodoList = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getTodoList();
            if (result) {
                dispatch({ type: Types.GET_TODO_LIST, data: result });
            }
        } catch (error) {
        }
    }
);


export const getSellerReports = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSellerReports();
            if (result) {
                dispatch({ type: Types.GET_SELLER_REPORTS, data: result });
            }
        } catch (error) {
        }
    }
);


export const getSellerReturns = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSellerReturns();
            if (result) {
                dispatch({ type: Types.GET_SELLER_RETURNS, data: result });
            }
        } catch (error) {
        }
    }
);

export const getMySales = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getMySales();
            if (result) {
                dispatch({ type: Types.GET_MY_SALES, data: result });
            }
        } catch (error) {
        }
    }
);

export const getSellerProducts = (session, id) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSellerProducts(id);
            if (result) {
                dispatch({ type: Types.GET_SELLER_PRODUCTS, data: result });
            }
        } catch (error) {
        }
    }
);

export const patchProductSwitch = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchProductSwitch(id);
            if (result) {
                dispatch({ type: Types.PATCH_PRODUCT_SWITCH, data: result });
            }
        } catch (error) {
        }
    }
);


export const removeProducts = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.removeProducts(id);
            if (result) {
                dispatch({ type: Types.DELETE_PRODUCTS, data: result });
            }
        } catch (error) {
        }
    }
);

export const getCollections = (session) => (
    async (dispatch) => {
        try {
            dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getCollections();
            if (result) {
                dispatch({ type: Types.GET_COLLECTIONS, data: result });
            }
        } catch (error) {
        }
    }
);

export const saveCollections = (session, params) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.saveCollections(params);
            if (result) {
                dispatch({ type: Types.SAVE_COLLECTIONS, data: result });
            }
        } catch (error) {
        }
    }
);

export const patchCollections = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchCollections(id);
            if (result) {
                dispatch({ type: Types.PATCH_COLLECTIONS, data: result });
            }
        } catch (error) {
        }
    }
);

export const patchCollectionsItem = (session, id, param) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.patchCollectionsItem(id, param);
            if (result) {
                dispatch({ type: Types.PATCH_COLLECTIONS_ITEM, data: result });
            }
        } catch (error) {
        }
    }
);

export const deleteCollections = (session, id) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.deleteCollections(id);
            if (result) {
                dispatch({ type: Types.DELETE_COLLECTIONS, data: result });
            }
        } catch (error) {
        }
    }
);


export const getSearchHistory = (session) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.getSearchHistory();
            if (result) {
                dispatch({ type: Types.GET_SEARCH_HISTORY, data: result });
            }
        } catch (error) {
        }
    }
);


export const deleteSearchHistory = (session, product) => (
    async (dispatch) => {
        try {
            globals.OnlineStore.setToken(session.token);
            const result = await OnlineStoreApi.deleteSearchHistory(product);
            if (result) {
                dispatch({ type: Types.DELETE_SEARCH_HISTORY, data: result });
            }
        } catch (error) {
        }
    }
);