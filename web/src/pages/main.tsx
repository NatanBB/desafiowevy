import React, { useState, useEffect } from 'react';
import { ArrowsMaximize, Minimize, Plus } from 'tabler-icons-react';
import { Input } from '../components/Input';
import { ListTodo } from '../modules/listTodo';
import { TodoItem } from '../types/commonTypes';
import { Header } from '../modules/header';
import { Footer } from '../modules/footer';
import { api } from "../services/api";
import { ToggleButton } from '../components/ToggleButton';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/Loading';
import { loadOrder, updateOrder, validateInsert } from '../utils/functions';

export const Main = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false);
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [listCompletedTodo, setlistCompletedTodo] = useState<TodoItem[]>([]);
  const [editTask, setEditTask] = useState<TodoItem>({} as TodoItem);
  const [search, setSearch] = useState<string>("");
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const context = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  //#region Effect

  useEffect(() => {
    handleGetData();
  }, [context?.user?.user_id]);

  useEffect(() => {
    updateOrder(
      isCompleteScreen,
      listTodo,
      listCompletedTodo
    )
  }, [isCompleteScreen, listTodo, listCompletedTodo]);

  useEffect(() => {
    if (search !== "") {
      if (isCompleteScreen) {
        const filteredCompleted = listCompletedTodo.filter(todo =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        );
        setlistCompletedTodo(filteredCompleted);
      } else {
        const filteredTodo = listTodo.filter(todo =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        );
        setListTodo(filteredTodo);
      }
    } else {
      handleGetData();
    }
  }, [search, isCompleteScreen]);

  //#endregion

  //#region changeDataFunctions

  const handleGetData = async () => {
    try {
      const response = (await api.get(`/tasks/${context?.user?.user_id}`))?.data;
      if (response && response?.length > 0) {
        const todo = response.filter(r => r.completedOn == null);
        const completed = response.filter(r => r.completedOn != null);
        setListTodo(loadOrder(todo, false));
        setlistCompletedTodo(loadOrder(completed, true));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const handleAddTask = async (title: string, description: string) => {
    try {
      const preparedData: TodoItem = {
        title,
        description,
        user_id: context?.user?.user_id,
        createdAt: new Date(),
      }
      const response = await api.post('/tasks', preparedData);
      const newTask: TodoItem = response.data;
      setListTodo(prevList => [...prevList, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  const handleDeleteTask = async (task_id: string, deleteCompleted: boolean) => {
    try {
      const response = await api.delete(`/tasks/${task_id}`);
      if (response.data.deleted) {
        if (deleteCompleted) {
          const updatedList = listCompletedTodo.filter(todo => todo.task_id !== task_id);
          setlistCompletedTodo(updatedList);
        } else {
          const updatedList = listTodo.filter(todo => todo.task_id !== task_id);
          setListTodo(updatedList);
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const handleEditTask = async (task_id: string, task: TodoItem) => {
    try {
      const response = await api.put(`/tasks`, task);
      const updatedTask: TodoItem = response.data;
      if (updatedTask) {
        const updatedTodoArr = listTodo.map(todo => todo.task_id === task_id ? updatedTask : todo);
        setListTodo(updatedTodoArr);
        setEditTask({} as TodoItem);
      }
    } catch (error) {
      console.error('Edit task error:', error);
    }
  }

  const handleComplete = async (task: TodoItem) => {
    try {
      task.completedOn = new Date();
      const response = await api.put(`/tasks`, task);
      const updatedTask: TodoItem = response.data;
      if (updatedTask) {
        const updatedList = listTodo.filter(todo => todo.task_id !== task.task_id);
        setListTodo(updatedList);
        setlistCompletedTodo(prevList => [...prevList, updatedTask]);
      }
    } catch (error) {
      console.error('Complete task error:', error);
    }
  };

  //#endregion

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        searchCallback={(search) =>
          setSearch(search)
        }
      />
      <main className="flex-grow mt-20">
        <h1 className="flex justify-center text-3xl font-extrabold text-white">My WevyTasks</h1>
        <div className="flex justify-center mt-6 mb-16">
          <div className="bg-gray-900 p-4 sm:p-10 border border-gray-700 rounded-md shadow-lg w-full max-w-3xl">
            <div className={fullScreen ? "" : "flex flex-col sm:flex-row items-center w-full"}>
              <div className={fullScreen ? "" : "w-full sm:w-2/4 mr-0 sm:mr-4 mb-4 sm:mb-0"}>
                <Input
                  handleChange={(e) =>
                    setNewTitle(e.target.value)
                  }
                  value={newTitle}
                  type="text"
                  placeholder="What is the title of the task?"
                  label="Title"
                  useTextArea={fullScreen}
                />
              </div>
              <div className={fullScreen ? "" : "w-full sm:w-2/4 mr-0 sm:mr-4 mb-4 sm:mb-0"}>
                <Input
                  handleChange={(e) =>
                    setNewDescription(e.target.value)
                  }
                  value={newDescription}
                  type="text"
                  placeholder="What do you want to do?"
                  label="Description"
                  useTextArea={fullScreen}
                />
              </div>
              <div className={`mt-0.5 flex ${fullScreen ? "mb-6" : "justify-center sm:justify-start"}`}>
                <button
                  className={`block ${validateInsert(newDescription, newTitle) ? "cursor-not-allowed" : "cursor-pointer"} select-none rounded-md p-2 text-center bg-gray-800 font-bold text-white mr-2`}
                  onClick={() =>
                    handleAddTask(newTitle, newDescription)
                  }
                  disabled={validateInsert(newDescription, newTitle)}
                >
                  <Plus
                    strokeWidth={2}
                    color={'white'}
                  />
                </button>
                <button
                  className="flex justify-center items-center cursor-pointer select-none rounded-md p-2 text-center bg-gray-800 font-bold text-white"
                  onClick={() => setFullScreen(!fullScreen)}
                >
                  {
                    fullScreen ?
                      <Minimize
                        strokeWidth={2}
                        color={'white'}
                      />
                      :
                      <ArrowsMaximize
                        strokeWidth={2}
                        color={'white'}
                      />
                  }
                </button>
              </div>
            </div>
            <hr className="border-1 border-gray-700" />
            <div className="grid w-full place-items-center mb-5 mt-5">
              <div className="grid w-[12.4rem] h-[3.2rem] grid-cols-2 gap-2 rounded-xl bg-gray-950 p-2 border border-gray-700 text-sm">
                <ToggleButton
                  label="Todo"
                  isChecked={!isCompleteScreen}
                  onChange={() => setIsCompleteScreen(false)}
                />
                <ToggleButton
                  label="Completed"
                  isChecked={isCompleteScreen}
                  onChange={() => setIsCompleteScreen(true)}
                />
              </div>
            </div>
            {loading ?
              <div className='flex justify-center'>
                <LoadingSpinner />
              </div>
              :
              <ListTodo
                handleComplete={handleComplete}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                listTodo={listTodo}
                isCompleteScreen={isCompleteScreen}
                listCompleted={listCompletedTodo}
                editTask={editTask}
                setEditTask={setEditTask}
                setListTodo={setListTodo}
                setlistCompletedTodo={setlistCompletedTodo}
              />
            }
          </div>
        </div>
        <Footer
          onLogout={context.logout}
        />
      </main>
    </div>
  );
};
