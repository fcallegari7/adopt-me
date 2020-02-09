import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  // useRef allows you to mount and destroy DOM elements every time you open or close a modal.
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    // If you return a function in useEffect, it will be the cleanup function (when the component is unmounted or destroyed).
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);
  // empty array: effect will run only once.

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
