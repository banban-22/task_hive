import { useState } from 'react';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false);
  const [text, setText] = useState(props?.defaultValue || '');

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (text && props.onSubmit) {
      props.onSubmit(text);
      setText('');
    }

    setShow(false);
  };

  const onCloseButton = () => {
    setShow(false);
    // props?.handler(false);
  };

  return (
    <div id="add-board" className="w-36">
      {show ? (
        <form action="" onSubmit={handleOnSubmit} className="w-3/12">
          <div className="flex flex-col lg:justify-between items-center gap-5 lg:flex-row justify-center lg:w-auto ml-20 lg:ml-0">
            <input
              type="text"
              placeholder={props.placeholder || 'Task'}
              id="edit-input"
              className="py-2 px-5 border border-gray-200 rounded-lg m-1"
              autoFocus
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center gap-5">
              <button
                className="bg-slate-200 rounded-lg py-2 px-4 shadow-lg hover:bg-white cursor-pointer"
                type="submit"
              >
                {`${props.btnName}` || 'Add'}
              </button>
              <GrFormClose
                className="font-bold text-lg cursor-pointer lg:text-2xl"
                onClick={onCloseButton}
              />
            </div>
          </div>
        </form>
      ) : (
        <button
          className="bg-slate-200 hover:bg-white rounded-lg px-4 py-2 pointer flex items-center gap-1 shadow-lg w-full"
          onClick={() => setShow(true)}
        >
          {props.defaultValue === undefined ? (
            <GrFormAdd className="text-xl" />
          ) : (
            <></>
          )}
          {props?.text || 'Add'}
        </button>
      )}
    </div>
  );
};

export default Editable;
