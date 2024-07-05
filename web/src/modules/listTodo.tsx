import { ArrowNarrowDown, ArrowNarrowUp, Check, Edit, Trash } from 'tabler-icons-react';
import { ListTodoProps, TodoItem } from '../types/commonTypes';
import { formatDate } from '../utils/functions';
import { useEffect, useState } from 'react';

export const ListTodo = ({
  isCompleteScreen,
  listTodo,
  editTask,
  listCompleted,
  handleEditTask,
  handleDeleteTask,
  handleComplete,
  setEditTask,
  setListTodo,
  setlistCompletedTodo
}: ListTodoProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const saveOrder = (list: TodoItem[], completed: boolean) => {
    const key = completed ? 'completedOrder' : 'todoOrder';
    const order = list.map(item => item.task_id);
    localStorage.setItem(key, JSON.stringify(order));
  };

  const handleMoveUp = (list: TodoItem[], index: number, completed: boolean) => {
    if (index > 0) {
      const updatedList = [...list];
      const temp = updatedList[index];
      updatedList[index] = updatedList[index - 1];
      updatedList[index - 1] = temp;
      saveOrder(updatedList, completed);
      if (completed) {
        return setlistCompletedTodo(updatedList);
      }
      return setListTodo(updatedList);
    }
  };

  const handleMoveDown = (list: TodoItem[], index: number, completed: boolean) => {
    if (index < list.length - 1) {
      const updatedList = [...list];
      const temp = updatedList[index];
      updatedList[index] = updatedList[index + 1];
      updatedList[index + 1] = temp;
      saveOrder(updatedList, completed);
      if (completed) {
        return setlistCompletedTodo(updatedList);
      }
      return setListTodo(updatedList);
    }
  };

  const handleUpdateField = (field: keyof TodoItem, value: string | Date | null) => {
    setEditTask(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      {!isCompleteScreen ? (
        <ul>
          {listTodo.map((todo, index) => {
            const createdAd: string = formatDate(todo.createdAt);
            return (
              <li key={todo.task_id} className="bg-gray-700 p-4 mb-2 rounded-lg flex justify-between items-center">
                {editTask.task_id === todo.task_id ? (
                  <div className="flex-grow">
                    <div className='text-sm font-bold'>Edit Title</div>
                    <textarea
                      value={editTask.title}
                      onChange={(e) => handleUpdateField('title', e.target.value)}
                      className="bg-gray-600 text-white px-2 py-1 rounded-lg mb-2 w-full h-8"
                      maxLength={500}
                    />
                    <div className='text-sm font-bold'>Edit Description</div>
                    <textarea
                      value={editTask.description}
                      onChange={(e) => handleUpdateField('description', e.target.value)}
                      className="bg-gray-600 text-white px-2 py-1 rounded-lg w-full h-52"
                      maxLength={5000}
                    />
                  </div>
                ) : (
                  <div className="flex-grow text-justify">
                    <p className="text-white text-xl font-bold mb-4">{todo.title}</p>
                    <p className="text-gray-300 mb-4">{todo.description}</p>
                    {windowWidth >= 768
                      &&
                      <div className="flex">
                        <p className="text-gray-500 text-sm">Created At: {createdAd}</p>
                        <div className="flex absolute ml-[38.6rem]">
                          <ArrowNarrowUp
                            size={18}
                            strokeWidth={2}
                            className="hover:text-gray-500 cursor-pointer"
                            onClick={() => handleMoveUp(listTodo, index, false)}
                          />
                          <ArrowNarrowDown
                            size={18}
                            strokeWidth={2}
                            className="hover:text-gray-500 cursor-pointer"
                            onClick={() => handleMoveDown(listTodo, index, false)}
                          />
                        </div>
                      </div>
                    }
                  </div>
                )}
                <div className="flex items-center">
                  {editTask.task_id === todo.task_id ? (
                    <div className="ml-4">
                      <Check
                        size={24}
                        strokeWidth={2}
                        onClick={() => handleEditTask(todo.task_id, editTask)}
                        className="cursor-pointer hover:text-green-500"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between ml-4 min-w-20">
                      <Trash
                        size={24}
                        strokeWidth={2}
                        onClick={() => handleDeleteTask(todo.task_id, false)}
                        className="cursor-pointer hover:text-red-500"
                      />
                      <Check
                        onClick={() => handleComplete(todo)}
                        size={24}
                        strokeWidth={2}
                        className="cursor-pointer hover:text-green-500"
                      />
                      <Edit
                        onClick={() => setEditTask(todo)}
                        size={24}
                        strokeWidth={2}
                        className="cursor-pointer hover:text-blue-500"
                      />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <ul>
          {listCompleted.map((todo, index) => {
            const completedDate: string = formatDate(todo.completedOn);
            const createdAt: string = formatDate(todo.createdAt);
            return (
              <li key={todo.task_id} className="bg-gray-700 p-4 mb-2 rounded-lg flex justify-between items-center">
                <div className="flex-grow text-justify">
                  <p className="text-white text-xl font-bold mb-4">{todo.title}</p>
                  <p className="text-gray-300 mb-4">{todo.description}</p>
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">Created At: {createdAt}</p>
                    <p className="text-gray-500 text-sm">Completed on: {completedDate}</p>
                    <div className="flex absolute ml-[38.6rem]">
                      <ArrowNarrowUp
                        size={18}
                        strokeWidth={2}
                        className="hover:text-gray-500 cursor-pointer"
                        onClick={() => handleMoveUp(listCompleted, index, true)}
                      />
                      <ArrowNarrowDown
                        size={18}
                        strokeWidth={2}
                        className="hover:text-gray-500 cursor-pointer"
                        onClick={() => handleMoveDown(listCompleted, index, true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between ml-4 min-w-6">
                  <Trash
                    size={24}
                    strokeWidth={2}
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteTask(todo.task_id, true)}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
