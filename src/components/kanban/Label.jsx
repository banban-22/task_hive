import { useState, useRef, useEffect } from 'react';

const Label = (props) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [label, setLabel] = useState('');

  const idColorUsed = (color) => {
    const isFound = props.tags.find((item) => item.color === color);
    return isFound ? true : false;
  };
  return <div>Label</div>;
};
export default Label;
