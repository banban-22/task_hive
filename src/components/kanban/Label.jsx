import { useState, useRef, useEffect } from 'react';
import { RxCross2, RxCheck } from 'react-icons/rx';

const Label = (props) => {
  const input = useRef();
  const [selectedColor, setSelectedColor] = useState('');
  const [label, setLabel] = useState('');

  const isColorUsed = (color) => {
    const isFound = props.tags.find((item) => item.color === color);
    return isFound ? true : false;
  };

  const handleLabelClick = () => {
    if (label !== '') {
      if (selectedColor === '') {
        alert('Please select a color');
      }
      props.addTag(label, selectedColor);
      setSelectedColor('');
      setLabel('');
      input.current.value = '';
    } else return;
  };

  return (
    <div className="absolute left-[55%] top-[45%] w-4/12 max-w-[60%] flex justify-center bg-white items-center z-30">
      <div className="max-h-[95vh] shadow-lg rounded-md w-full p-3">
        <div className="flex border-solid border-b-2 justify-between my-2 px-2">
          <p className="text-center font-bold">Label</p>
          <RxCross2 onClick={() => props.onClose(false)} />
        </div>
        <div className="flex flex-col gap-2">
          <p className="pt-1 px-2 text-slate-500">Name</p>
          <input
            type="text"
            ref={input}
            defaultValue={label}
            placeholder="Name of label"
            onChange={(e) => setLabel(e.target.value)}
            className="border-solid border-2 w-full p-2"
          />
        </div>
        <p className="my-2 text-slate-500 px-2">Select A Color</p>
        <div className="flex justify-between">
          {props.color.map((item, index) => (
            <span
              onClick={() => setSelectedColor(item)}
              key={index}
              className={
                isColorUsed(item)
                  ? 'pointer-events-none opacity-40 rounded-md w-1/3 h-10'
                  : 'cursor rounded-md w-1/3 h-10'
              }
              style={{ backgroundColor: item, cursor: 'pointer' }}
            >
              {selectedColor === item ? <RxCheck /> : ''}
            </span>
          ))}
        </div>
        <div>
          <button
            className="px-4 py-2 bg-slate-200 shadow-xl rounded-lg mb-2 mt-4"
            onClick={() => handleLabelClick()}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default Label;
