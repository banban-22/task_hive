import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { GoTrash, GoPencil } from 'react-icons/go';
import * as Icon from 'react-icons/fi';
import Checkbox from 'react-custom-checkbox';

const getLocalStorage = () => {
  let todos = localStorage.getItem('todos');
  if (todos) {
    return JSON.parse(localStorage.getItem('todos'));
  } else {
    return [];
  }
};

const Todo = () => {
  const [todos, setTodos] = useState(getLocalStorage());
  const [task, setTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);
  const [isChecked, setIsChecked] = useState(() => {
    const storedValue = localStorage.getItem('isChecked');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: todos.length + 1,
      title: task,
      completed: isChecked,
    };
    setTodos([...todos, newItem]);
    setTask('');
  };

  const editItem = (id) => {
    const specificItem = todos.find((todo) => todo.id === id);
    setEditedTask(specificItem);
  };

  const updatedEditedTask = (newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editedTask.id
          ? { ...todo, title: newTitle, completed: isChecked }
          : todo
      )
    );

    setEditedTask(null);
  };

  const deleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    setIsChecked((prev) => !prev);
    localStorage.setItem('isChecked', JSON.stringify(!isChecked));
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedTodos = getLocalStorage();
    setTodos(storedTodos);
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start p-3 items-center gap-3 border-b-2"
      >
        <label htmlFor="">New Task</label>
        <input
          type="text"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className="border px-5 py-2 rounded-lg"
        />
        <Button type="primary">Add</Button>
      </form>

      <div>
        <h3 className="text-xl my-5 text-center">Your Tasks</h3>
        {todos.length > 0 ? (
          todos.map((todo) => {
            const { id, title, completed } = todo;
            return (
              <div
                key={id}
                className={`flex justify-between items-center border border-gray-300 p-3 rounded-lg my-3 ${
                  completed ? 'line-through text-gray-300' : ''
                }`}
              >
                {editedTask && editedTask.id === id ? (
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) =>
                      setEditedTask((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    onBlur={() => updatedEditedTask(editedTask.title)}
                    className="border px-5 py-2 rounded-lg"
                  />
                ) : (
                  <div className="text-lg" onClick={() => editItem(id)}>
                    {title}
                  </div>
                )}

                <div className="flex justify-between gap-3">
                  <button onClick={() => editItem(id)}>
                    <GoPencil className="text-xl" />
                  </button>
                  <button onClick={() => deleteItem(id)}>
                    <GoTrash className="text-xl" />
                  </button>
                  <button>
                    <Checkbox
                      type="checkbox"
                      checked={completed}
                      onChange={() => toggleCompleted(id)}
                      icon={<Icon.FiCheck size={20} />}
                      style={{
                        backgroundColor: completed ? '#3B81F6' : 'transparent',
                        color: completed ? '#fff' : '#000',
                        borderColor: '#3B81F6',
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>You don't have any task</div>
        )}
      </div>
    </div>
  );
};
export default Todo;
