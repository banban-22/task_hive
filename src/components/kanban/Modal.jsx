const Modal = ({ onClose, children }) => {
  return (
    <div onClick={() => onClose(false)} className="custom__modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content lg:w-[60%] lg:ml-56"
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
