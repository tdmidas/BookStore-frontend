import React from "react";
import "./Loader.css";
import { PuffLoader } from "react-spinners";
const Loader = () => {
	return (
		<div id="loader" role="status">
			<PuffLoader color="#36d7b7" />
			<span className="visually-hidden">Loading...</span>
		</div>
	);
};

export default Loader;
