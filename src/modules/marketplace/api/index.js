/*eslint-disable*/
import * as globals from "__src/globals";
import _ from 'lodash';

const OnlineStore = {

    getMyShop: async (token) => {
        try {
            const result = await globals.OnlineStore.get(`/myShop`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getShopList: async (token) => {
        try {
            const result = await globals.OnlineStore.get(`/myShop/fulllist?limit=9999999`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getShopIdDetails: async (id) => {
        try {
            const result = await globals.OnlineStore.get(`/myshop/id/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getShopIdCollections: async (id) => {
        try {
            const result = await globals.OnlineStore.get(`/ProductCollection/shop_id/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getShopIdProducts: async (id) => {
        try {
            const result = await globals.OnlineStore.get(`/product/shop_id/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getCartList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/product/cart/list`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getAdsImages: async () => {
        try {
            const result = await globals.OnlineStore.get(`/adsCollection/active`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getDeliveryAddress: async (userId) => {
        try {
            const result = await globals.OnlineStore.get(`/delivery/user_id/${userId}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    patchAddress: async (id, param) => {
        try {
            const result = await globals.OnlineStore.patch(`/delivery/id/${id}`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    addAddress: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/delivery/create`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteAddress: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/delivery/id/${id}`)
            return result;
        } catch (error) {
            throw error;
        }
    },


    getNotifications: async () => {
        try {
            const result = await globals.OnlineStore.get(`/notification?limit=9999999`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    patchNotifications: async (param) => {
        try {
            const result = await globals.OnlineStore.patch(`/notification`, { ...param });
            return result;
        } catch (e) {
            throw e;
        }
    },

    getCategoryList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/category/list?`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getFilterCategoryList: async (product) => {
        try {
            const url = _.isUndefined(product) ? `/product/filter/` : `/product/filter/${product}`;
            const result = await globals.OnlineStore.get(url);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getReasonList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/reason/list`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getProductList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/product/list/?limit=1000000000&skip=0`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    postProductList: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/product/list/?limit=1000000000&skip=0`, { ...param });

            return result;
        } catch (e) {
            throw e;
        }
    },

    addToCart: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/product/cart/save`, { ...param });

            return result;
        } catch (e) {
            throw e;
        }
    },

    patchCartItem: async (param) => {
        try {
            const result = await globals.OnlineStore.patch(`/product/cart`, { ...param });

            return result;
        } catch (e) {
            throw e;
        }
    },

    patchCartOptions: async (id, param) => {
        try {
            const result = await globals.OnlineStore.patch(`/product/cart/${id}`, { ...param });
            return result;
        } catch (e) {
            throw e;
        }
    },

    postGetCharge: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/product/cart/list`, { ...param });

            return result;
        } catch (e) {
            throw e;
        }
    },

    placeOrder: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/transaction/SaveOrder`, { ...param });
            return result;
        } catch (e) {
            throw e;
        }
    },

    deleteFromCart: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/product/cart/id/${id}`);
            return result;
        } catch (e) {
            throw e;
        }
    },


    postSelectedProducts: async (id, slug) => {
        try {
            const result = await globals.OnlineStore.post(`/product/id/${id}/slug/${slug}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    addToFavorites: async (id) => {
        try {
            const result = await globals.OnlineStore.post(`/favorite/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    removeFromFavorites: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/favorite/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getFavorites: async () => {
        try {
            const result = await globals.OnlineStore.get(`/favorite`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getSettings: async () => {
        try {
            const result = await globals.OnlineStore.get(`/setting`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    patchSettings: async (type) => {
        try {
            const result = await globals.OnlineStore.patch(`/setting/${type}`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    patchTransactions: async (id, params) => {
        try {
            const result = await globals.OnlineStore.patch(`/transaction/id/${id}`, { ...params });
            return result;
        } catch (e) {
            throw e;
        }
    },

    getTrendingProducts: async () => {
        try {
            const result = await globals.OnlineStore.get(`/product/trending`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getTopProducts: async () => {
        try {
            const result = await globals.OnlineStore.get(`/product/top`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getSaleProducts: async () => {
        try {
            const result = await globals.OnlineStore.get(`/product/sale`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getReports: async (skip) => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/fullList/?skip=${skip}&limit=9999999999999&status=Delivered`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getPurchaseList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/fullList?limit=99999999999&skip=0`);
            return result;
        } catch (e) {
            throw e;
        }
    },


    getReturnList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/return/?limit=99999999999&skip=0`);
            return result;
        } catch (e) {
            throw e;
        }
    },


    patchReturn: async (param) => {
        try {
            const result = await globals.OnlineStore.patch(`/transaction/return`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    patchItem: async (param, id) => {
        try {
            const result = await globals.OnlineStore.patch(`/transaction/item/id/${id}`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    productRate: async (param, id) => {
        try {
            const result = await globals.OnlineStore.post(`/product/rate/item_id/${id}`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    productReview: async (param, id) => {
        try {
            const result = await globals.OnlineStore.post(`/product/review/item_id/${id}`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    getBlockList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/blocklist`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    addBlockUser: async (param) => {
        try {
            const result = await globals.OnlineStore.post(`/blocklist`, { ...param })
            return result;
        } catch (error) {
            throw error;
        }
    },

    removeBlockUser: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/blocklist/${id}`)
            return result;
        } catch (error) {
            throw error;
        }
    },


    getTodoList: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/todoList/`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getSellerReports: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/sale_fullList/?status=All`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getSellerReturns: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/sale_return/?limit=9999999999999`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getMySales: async () => {
        try {
            const result = await globals.OnlineStore.get(`/transaction/sale_fullList/?limit=999999999999`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    getSellerProducts: async (id) => {
        try {
            const result = await globals.OnlineStore.get(`/product/shop/${id}/?limit=99999`);
            return result;
        } catch (e) {
            throw e;
        }
    },

    patchProductSwitch: async (id) => {
        try {
            const result = await globals.OnlineStore.patch(`/product/publish/${id}`)
            return result;
        } catch (error) {
            throw error;
        }
    },

    removeProducts: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/product/id/${id}`)
            return result;
        } catch (error) {
            throw error;
        }
    },

    getCollections: async () => {
        try {
            const result = await globals.OnlineStore.get(`/ProductCollection/`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    saveCollections: async (params) => {
        try {
            const result = await globals.OnlineStore.post(`/ProductCollection/`, { ...params });

            return result;
        } catch (e) {
            throw e;
        }
    },

    patchCollections: async (id) => {
        try {
            const result = await globals.OnlineStore.patch(`/ProductCollection/active/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    patchCollectionsItem: async (id, params) => {
        try {
            const result = await globals.OnlineStore.patch(`/ProductCollection/id/${id}`, { ...params });

            return result;
        } catch (e) {
            throw e;
        }
    },

    deleteCollections: async (id) => {
        try {
            const result = await globals.OnlineStore.delete(`/ProductCollection/id/${id}`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    getSearchHistory: async () => {
        try {
            const result = await globals.OnlineStore.get(`/search/list`);

            return result;
        } catch (e) {
            throw e;
        }
    },

    deleteSearchHistory: async (product) => {
        try {
            const url = _.isUndefined(product) ? `/search/list/` : `/search/list/${product}`;
            const result = await globals.OnlineStore.delete(url);

            return result;
        } catch (e) {
            throw e;
        }
    },

}

export default OnlineStore;
