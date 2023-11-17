const Modal = ({ onClose, children }) => {
  return (
    <div onClick={() => onClose(false)} className="custom__modal">
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        {children}
      </div>
    </div>
  );
};
export default Modal;
