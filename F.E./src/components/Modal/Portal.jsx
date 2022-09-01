import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const createPortalWrapperAndAppendToBody = (wrapperId) => {
	const wrapper = document.createElement("div");
	wrapper.setAttribute("id", wrapperId);
	document.body.appendChild(wrapper);
	return wrapper;
};

const Portal = ({ children, wrapperId }) => {
	const [element, setElement] = useState(null);

	useLayoutEffect(() => {
		let elementCreated = false;
		let wrapperEL = document.getElementById(wrapperId);
		if (!wrapperEL) {
			elementCreated = true;
			wrapperEL = createPortalWrapperAndAppendToBody(wrapperId);
		}
		setElement(wrapperEL);
		return () => {
			if (elementCreated && wrapperEL.parentNode) {
				wrapperEL.parentNode.removeChild(wrapperEL);
			}
		};
	}, [wrapperId]);
	if (element === null) return null;

	return createPortal(children, element);
};

export default Portal;
