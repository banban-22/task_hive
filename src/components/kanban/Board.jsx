import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { GoKebabHorizontal } from 'react-icons/go';

import Card from './Card';
import DropDown from './DropDown';
import Editable from './Editable';

const Board = (props) => {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') setShow(false);
    });
    return () => {
      document.removeEventListener('keypress', (e) => {
        if (e.code === 'Enter') setShow(false);
      });
    };
  }, []);

  return (
    <div className="w-4/5 md:w-3/5 lg:w-5/12 border pt-2 pb-3 px-3 rounded-lg bg-slate-300">
      <div className="flex items-center justify-between">
        {show ? (
          <div>
            <input
              type="text"
              defaultValue={props.name}
              onChange={(e) => props.setName(e.target.value, props.id)}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <p
              onClick={() => setShow(true)}
              className="py-5 rounded-lg px-3 text-lg font-bold cursor-pointer"
            >
              {props?.name || 'Name of Board'}
            </p>
            <span className="bg-slate-500 px-5 rounded-xl text-white drop-shadow-lg">
              {props.card?.length}
            </span>
          </div>
        )}
        <div onClick={() => setDropdown(true)} className="">
          <GoKebabHorizontal />
          {dropdown && (
            <DropDown onClose={() => setDropdown(false)}>
              <button
                className="bg-gray-200 rounded-lg py-2 px-4"
                onClick={() => props.removeBoard(props.id)}
              >
                Delete Board
              </button>
            </DropDown>
          )}
        </div>
      </div>

      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.card?.map((card, index) => (
              <Card
                bid={props.id}
                id={card.id}
                index={index}
                key={card.id}
                title={card.title}
                tags={card.tags}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={card}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="w-full">
        <Editable
          name="Add Card"
          btnName="Add"
          placeholder="Enter Card Title"
          onSubmit={(value) => {
            props.addCard(value, props.id);
          }}
          isTask={true}
        />
      </div>
    </div>
  );
};
export default Board;
