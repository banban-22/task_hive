import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import Board from '../components/kanban/Board';
import Editable from '../components/kanban/Editable';

const Kanban = () => {
  const [data, setData] = useState(
    localStorage.getItem('kanban-board')
      ? JSON.parse(localStorage.getItem('kanban-board'))
      : []
  );

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = (src, destination) => {
    let tempData = [...data];
    const destinationBoardIndex = tempData.findIndex(
      (item) => item.id.toString() === destination.doppableId
    );

    const sourceBoardIndex = tempData.findIndex(
      (item) => item.id.toString() === src.droppableId
    );

    // Insert the dragged card at the specific position in the destination board
    tempData[destinationBoardIndex].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIndex.card[src.index]]
    );

    // Remove the card from the source board at the original index
    tempData[sourceBoardIndex].card.splice(src.index, 1);
  };

  const onDragEnd = (result) => {
    const { src, destination } = result;
    if (!destination) return;

    if (src.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(src, destination));
  };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title,
      tags: [],
      task: [],
    });

    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    // remove the card from the board
    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;

    setData(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem('kanban-board', JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <h2 className="text-2xl my-3 font-bold">Kanban</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-3">
          {data.map((item) => (
            <Board
              key={item.id}
              id={item.id}
              name={item.boardName}
              card={item.card}
              setName={setName}
              addCard={addCard}
              removeCard={removeCard}
              removeBoard={removeBoard}
              updateCard={updateCard}
            />
          ))}
          <Editable
            name="Add Board"
            btnName="Add Board"
            onSubmit={addBoard}
            placeholder="Enter Board Name"
          />
        </div>
      </DragDropContext>
    </div>
  );
};
export default Kanban;
