import { useRef, useEffect } from 'react';

const DropDown = (props) => {
  const dropRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef && !dropRef.current.contains(e.target) && props.onClose) {
        props.onClose();
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [props]);

  return (
    <div ref={dropRef} className="">
      {props.children}
    </div>
  );
};
export default DropDown;
