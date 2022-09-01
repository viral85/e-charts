import React, { useEffect } from "react";
import Portal from "./Portal";

const Modal = ({ children, setModalVisibility, handleClose }) => {
	useEffect(() => {
		const closeModal = (e) => (e.key === "Escape" ? handleClose() : null);
		document.body.addEventListener("keydown", closeModal);
		return () => {
			document.body.removeEventListener("keydown", closeModal);
		};
	}, [handleClose]);
	if (!setModalVisibility) {
		return null;
	}
	return (
		<Portal wrapperId="add-comments">
			<div className="modal-wrapper">
				<div className="modal-container">
					<button onClick={handleClose}>Close</button>
					<div>{children}</div>
				</div>
			</div>
		</Portal>
	);
};

export default Modal;
