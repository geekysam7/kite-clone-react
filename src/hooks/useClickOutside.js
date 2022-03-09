import { useEffect, useRef } from "react";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let nodeCheckHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", nodeCheckHandler);

    return () => {
      document.removeEventListener("mousedown", nodeCheckHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
