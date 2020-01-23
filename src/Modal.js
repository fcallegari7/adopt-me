import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  //useRef allows you to mount and destroy DOM elements every time you open or close a modal.
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    //If you return a function in useEffect, it will be the cleanup function (when the component is unmounted or destroyed).
    return () => modalRoot.removeChild(elRef.current);
  }, []);
  //empty array: effect will run only once.

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
