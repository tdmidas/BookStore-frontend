import axios from "axios";
import {
	BOOK_LIST_REQUEST,
	BOOK_LIST_SUCCESS,
	BOOK_LIST_FAIL,
	BOOK_DETAILS_REQUEST,
	BOOK_DETAILS_SUCCESS,
	BOOK_DETAILS_FAIL,
	BOOK_DELETE_REQUEST,
	BOOK_DELETE_SUCCESS,
	BOOK_DELETE_FAIL,
	BOOK_CREATE_REQUEST,
	BOOK_CREATE_SUCCESS,
	BOOK_CREATE_FAIL,
	BOOK_UPDATE_REQUEST,
	BOOK_UPDATE_SUCCESS,
	BOOK_UPDATE_FAIL,
	BOOK_CREATE_REVIEW_REQUEST,
	BOOK_CREATE_REVIEW_SUCCESS,
	BOOK_CREATE_REVIEW_FAIL,
	BOOK_TOP_REQUEST,
	BOOK_TOP_SUCCESS,
	BOOK_TOP_FAIL,
} from "../constants/bookConstants";

export const listBooks =
	(keyword = "", pageNumber = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: BOOK_LIST_REQUEST });

			const { data } = await axios.get(
				`http://localhost:8000/api/v1/book?keyword=${keyword}&pageNumber=${pageNumber}`
			);

			dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: BOOK_LIST_FAIL,
				payload: error.response && error.response.data.message ? error.response.data.message : error.message,
			});
		}
	};

export const listBookDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: BOOK_DETAILS_REQUEST });

		const { data } = await axios.get(`http://localhost:8000/api/v1/book/${id}`);

		dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const deleteBook = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOK_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = { headers: { Token: `Bearer ${userInfo.accessToken}` } };

		await axios.delete(`http://localhost:8000/api/v1/book/${id}`, config);

		dispatch({ type: BOOK_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: BOOK_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const createBook = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOK_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = { headers: { Token: `Bearer ${userInfo.accessToken}` } };

		const { data } = await axios.post(`http://localhost:8000/api/v1/book/`, {}, config);

		dispatch({ type: BOOK_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_CREATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const updateBook = (book) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOK_UPDATE_REQUEST,
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

		const { data } = await axios.put(`http://localhost:8000/api/v1/book/${book._id}`, book, config);

		dispatch({ type: BOOK_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const createBookReview = (bookId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BOOK_CREATE_REVIEW_REQUEST,
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

		await axios.post(`http://localhost:8000/api/v1/book/${bookId}/reviews`, review, config);

		dispatch({ type: BOOK_CREATE_REVIEW_SUCCESS });
	} catch (error) {
		dispatch({
			type: BOOK_CREATE_REVIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const listTopBooks = () => async (dispatch) => {
	try {
		dispatch({ type: BOOK_TOP_REQUEST });

		const { data } = await axios.get(`http://localhost:8000/api/v1/book/top`);

		dispatch({ type: BOOK_TOP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: BOOK_TOP_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
