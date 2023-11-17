import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdTaskAlt } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';
import { CgTrash } from 'react-icons/cg';

import Editable from './Editable';
import Modal from './Modal';
import Label from './Label';
import Tag from './Tag';

const CardDetails = (props) => {
  const colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0'];
  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const [labelShow, setLabelShow] = useState(false);

  const Input = (props) => {
    return (
      <div>
        <input
          autoFocus
          type="text"
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    );
  };

  const addTask = (value) => {
    console.log('Before Adding task:', value);
    setValues((prevValues) => ({
      ...prevValues,
      task: [
        ...prevValues.task,
        { id: uuidv4(), task: value, completed: false },
      ],
    }));
    console.log('After Adding task:', value);
  };

  const removeTask = (id) => {
    const remainingTask = values.task.filter((item) => item.id !== id);
    setValues({ ...values, task: remainingTask });
  };

  const deleteAllTask = () => {
    setValues({
      ...values,
      task: [],
    });
  };

  const updateTask = (id) => {
    const taskIndex = values.task.findIndex((item) => item.id === id);
    // toggle the completed value
    values.task[taskIndex].completed = !values.task[taskIndex].completed;
    setValues({ ...values });
  };

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const calculatePercentage = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(
      (item) => item.completed === true
    ).length;

    return Math.floor((completedTask / totalTask) * 100) || 0;
  };

  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color,
    });
  };

  const removeTag = (id) => {
    const tempTag = values.tags.filter((item) => item.id !== id);
    setValues({
      ...values,
      tags: tempTag,
    });
  };

  const handleClickListener = (e) => {
    if (e.code === 'Enter') {
      setInput(false);
      updateTitle(text === '' ? values.title : text);
    } else return;
  };

  useEffect(() => {
    document.addEventListener('keypress', handleClickListener);
    return () => {
      document.removeEventListener('keypress', handleClickListener);
    };
  });

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <>
      <Modal onClose={props.onClose}>
        <div>
          <div className="container">
            <div className="flex pb-4">
              <div className="col-span-12">
                <div className="flex items-center pt-3 gap-2">
                  <MdTaskAlt />
                  {input ? (
                    <Input />
                  ) : (
                    <h5 onClick={() => setInput(true)}>{values.title}</h5>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row">
              <div className="col-span-8">
                <h6 className="text-justify">Label</h6>
                <div className="w-10 pr-1">
                  {(values.tags.length ?? []) !== 0 ? (
                    (values.tags ?? []).map((item) => (
                      <span className="flex justify-between items-center gap-2">
                        {item.tagName.length > 10
                          ? item.tagName.slice(0, 6) + '...'
                          : item.tagName}
                        <GrFormClose onClick={() => removeTag(item.id)} />
                      </span>
                    ))
                  ) : (
                    <span className="flex justify-between items-center gap-2">
                      No Label
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <h6>Check List</h6>
                  </div>
                  <div className="">
                    <button onClick={() => deleteAllTask()}>Delete All</button>
                  </div>
                </div>

                <div className="my-2">
                  <div className="flex">
                    <div
                      className=""
                      role="progressbar"
                      style={{ width: calculatePercentage() + '%' }}
                      aria-valuenow="75"
                      areia-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calculatePercentage() + '%'}
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  {(values.task.length ?? []) !== 0 ? (
                    (values.task.map ?? [])((item, index) => (
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          defaultChecked={item.completed}
                          onChange={() => {
                            updateTask(item.id);
                          }}
                        />
                        <h6
                          className={`flex ${
                            item.completed === true ? 'strike-through' : ''
                          }`}
                        >
                          {item.task}
                        </h6>
                        <CgTrash
                          onClick={() => {
                            removeTask(item.id);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <>No Task</>
                  )}

                  <Editable
                    text="Add Task"
                    btnName="Add Task"
                    onSubmit={addTask}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col-4">
              <h6>Add to card</h6>
              <div className="flex flex-col gap-2">
                <button onClick={() => setLabelShow(true)}>
                  <span>
                    <Tag />
                  </span>
                  Add Label
                </button>
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={values.tags}
                    onClose={setLabelShow}
                  />
                )}
                <button>
                  <span>Date</span>
                </button>

                <button onClick={() => props.removeCard(props.bid, values.id)}>
                  <span>
                    <CgTrash />
                  </span>
                  Delete Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardDetails;
