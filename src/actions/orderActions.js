import axios from "axios";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_DETAIL_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.post(`http://localhost:8000/api/v1/order/`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAIL_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.get(`http://localhost:8000/api/v1/order/${id}`, config);

		dispatch({
			type: ORDER_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAIL_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.put(`http://localhost:8000/api/v1/order/${orderId}/pay`, paymentResult, config);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.put(`http://localhost:8000/api/v1/order/${order._id}/deliver`, {}, config);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.get(`http://localhost:8000/api/v1/order/myorders`, config);

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Token: `Bearer ${userInfo.accessToken}`,
			},
		};

		const { data } = await axios.get(`http://localhost:8000/api/v1/order`, config);

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
