import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { GoKebabHorizontal } from 'react-icons/go';

// import DropDown from './DropDown';
// import Modal from './Modal';
import Tag from './Tag';
import CardDetails from './CardDetails';

const Card = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg p-3 mb-3 shadow-xl">
      <Draggable
        key={props.id.toString()}
        draggableId={props.id.toString()}
        index={props.index}
      >
        {(provided) => (
          <>
            {modalShow && (
              <CardDetails
                updateCard={props.updateCard}
                onClose={setModalShow}
                card={props.card}
                bid={props.bid}
                removeCard={props.removeCard}
              />
            )}
            <div
              onClick={() => {
                setModalShow(true);
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className="flex items-center justify-between">
                <p>{props.title}</p>
                <GoKebabHorizontal
                  onClick={() => {
                    setDropdown(true);
                  }}
                />
              </div>
              <div>
                {props.tags?.map((item, index) => (
                  <Tag key={index} tagName={item.tagName} color={item.color} />
                ))}
              </div>

              <div>
                {props.card.task.length !== 0 && (
                  <div>
                    <IoMdCheckboxOutline />
                    <span>
                      {props.card.task.length !== 0
                        ? `${
                            (props.card.task?.filter(
                              (item) => item.completed === true
                            )).length
                          } / ${props.card.task.length}`
                        : `${'0/0'}`}
                    </span>
                  </div>
                )}
              </div>

              {provided.placeholder}
            </div>
          </>
        )}
      </Draggable>
    </div>
  );
};
export default Card;
