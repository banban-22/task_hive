import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdTaskAlt, MdOutlineCheckBox, MdCreditCard } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';
import { CgTrash } from 'react-icons/cg';
import { BsClock, BsTag } from 'react-icons/bs';
import ProgressBar from '@ramonak/react-progress-bar';
import { formatDate } from '../../utils/helpers';

import Editable from './Editable';
import Modal from './Modal';
import Label from './Label';
import DueDate from './DueDate';

const CardDetails = (props) => {
  const colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0'];
  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const [labelShow, setLabelShow] = useState(false);
  const [labels, setLabels] = useState([...values.tags]);
  const [dateShow, setDateShow] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

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
    setValues((prevValues) => ({
      ...prevValues,
      task: [
        ...prevValues.task,
        { id: uuidv4(), task: value, completed: false },
      ],
    }));
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

  const updateTitle = useCallback(
    (value) => {
      setValues({ ...values, title: value });
    },
    [values]
  );

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

  const updateDueDate = (date) => {
    setDueDate(date ? date.toString() : '');
    setSelectedDate(date);

    // Update the dueDate property in values directly
    setValues({
      ...values,
      date: date ? date.toString() : '',
    });
  };

  useEffect(() => {
    const handleClickListener = (e) => {
      if (e.code === 'Enter') {
        setInput(false);
        updateTitle(text === '' ? values.title : text);
      }
    };

    document.addEventListener('keypress', handleClickListener);
    return () => {
      document.removeEventListener('keypress', handleClickListener);
    };
  }, [text, updateTitle, values.title]);

  useEffect(() => {
    if (props.updateCard) {
      if (values !== props.card) {
        props.updateCard(props.bid, values.id, values);
      }
    }
  }, [props, values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="w-full">
        <div className="container flex flex-row justify-around">
          <div className="w-full flex flex-col">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <MdCreditCard className="text-2xl" />
                {input ? (
                  <Input />
                ) : (
                  <h5
                    onClick={() => setInput(true)}
                    className="text-2xl capitalize font-bold"
                  >
                    {values.title}
                  </h5>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between px-2">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <h5 className="text-justify mt-2 text-lg">Label</h5>
                  <div className="w-full pr-1 flex gap-2">
                    {(values.tags.length ?? []) !== 0 ? (
                      (values.tags ?? []).map((item) => (
                        <span
                          key={item.id}
                          className="flex items-center gap-2 rounded-lg px-3 w-1/4 py-2 justify-around"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.tagName.length > 10
                            ? item.tagName.slice(0, 6) + '...'
                            : item.tagName}
                          <GrFormClose onClick={() => removeTag(item.id)} />
                        </span>
                      ))
                    ) : (
                      <span className="flex justify-between items-center gap-2 text-slate-400 italic">
                        No Labels
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full mt-3 border px-3 rounded-lg">
                  {values.date && (
                    <div className="w-full flex">
                      <h5 className="w-1/3 mt-2 text-sm">Due Date</h5>
                      <div className="w-auto flex items-center rounded-lg px-3 py-2 text-sm">
                        {formatDate(values.date)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-10 pt-5">
                  <div className="flex items-center gap-3">
                    <MdOutlineCheckBox className="text-xl" />
                    <h6>Task List</h6>
                  </div>
                  <div className="bg-slate-200 py-2 px-4 rounded-lg shadow-lg hover:bg-white pointer">
                    <button onClick={() => deleteAllTask()}>Delete All</button>
                  </div>
                </div>
                <div className="my-2">
                  <div>Progress(%)</div>
                  <ProgressBar
                    completed={calculatePercentage()}
                    backgroundColor="#61bd4f"
                    width="25rem"
                    height="20px"
                  />
                </div>
                <div className="my-2 w-full">
                  {values.task.length !== 0 ? (
                    values.task.map((item, index) => (
                      <div className="flex items-center gap-2 pb-3 text-xl">
                        <input
                          type="checkbox"
                          defaultChecked={item.completed}
                          onChange={() => {
                            updateTask(item.id);
                          }}
                        />
                        <h6
                          className={`flex flex-col ${
                            item.completed === true
                              ? 'line-through text-slate-400'
                              : ''
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
                    <></>
                  )}
                  <Editable
                    text="Add Task"
                    btnName="Add Task"
                    onSubmit={addTask}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <h6 className="text-lg">Add to card</h6>
                <div className="flex flex-col gap-2 mt-3">
                  <button
                    onClick={() => setLabelShow(true)}
                    className="bg-slate-200 py-2 rounded-lg flex flex-row items-center gap-3 px-3"
                  >
                    <span>
                      <BsTag />
                    </span>
                    Add Label
                  </button>
                  {labelShow && (
                    <Label
                      color={colors}
                      addTag={(value, color) => {
                        addTag(value, color);
                        setLabels([...values.tags]);
                      }}
                      tags={labels}
                      onClose={() => setLabelShow(false)}
                    />
                  )}
                  <button
                    className="bg-slate-200 py-2 rounded-lg flex flex-row items-center gap-3 px-3"
                    onClick={() => setDateShow(true)}
                  >
                    <span>
                      <BsClock />
                    </span>
                    Date
                  </button>
                  {dateShow && (
                    <DueDate
                      onDateChange={(date) => updateDueDate(date)}
                      onClose={() => setDateShow(false)}
                    />
                  )}

                  <button
                    onClick={() => props.removeCard(props.bid, values.id)}
                    className="bg-slate-200 py-2 rounded-lg flex flex-row items-center gap-3 px-3"
                  >
                    <span>
                      <CgTrash />
                    </span>
                    Delete Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardDetails;
