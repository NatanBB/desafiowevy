import { TodoItem } from "../types/commonTypes";

/**
 * Format Date to String
 * @param date Date to Format
 * @returns String dd/MM/yyyy HH:mm:ss
 */
export const formatDate = (date: Date) => {
  const dateTime = new Date(date);
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear().toString();
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Validates if description and title are filled in
 * @param newDescription Todo description
 * @param newTitle Todo title
 * @returns True / False
 */
export const validateInsert = (
  newDescription: string,
  newTitle: string
): boolean => {
  if (
    (newDescription == null || newDescription == "") &&
    (newTitle == null || newTitle == "")
  ) {
    return true;
  }
  return false;
}

/**
 * Save order ToDo in localstorage
 * @param list Todo Item list
 * @param completed completed screen or not (true / fakse)
 */
export const saveOrder = (list: TodoItem[], completed: boolean) => {
  const key = completed ? 'completedOrder' : 'todoOrder';
  const order = list.map(item => item.task_id);
  localStorage.setItem(key, JSON.stringify(order));
};

/**
 * Load ToDo order in localstorage
 * @param list list TodoItem to load
 * @param completed completed screen or not (true / fakse)
 * @returns TodoItem List
 */
export const loadOrder = (
  list: TodoItem[],
  completed: boolean
): TodoItem[] => {
  const key = completed ? 'completedOrder' : 'todoOrder';
  const order = JSON.parse(localStorage.getItem(key) || '[]');
  if (order.length > 0) {
    const orderedList = order
      .map((id: string) => list.find(item => item.task_id === id))
      .filter((item: TodoItem | undefined): item is TodoItem => !!item);
    return orderedList;
  }
  return list;
};

/**
 * Update list order in local storage
 * @param isCompleteScreen completed screen or not (true / fakse)
 * @param listTodo list ToDo
 * @param listCompletedTodo list Completed ToDo
 */
export const updateOrder = (
  isCompleteScreen: boolean,
  listTodo: TodoItem[],
  listCompletedTodo: TodoItem[]
) => {
  const key = isCompleteScreen ? 'completedOrder' : 'todoOrder';
  var order: string[] = JSON.parse(localStorage.getItem(key) || '[]');

  const listTasksIds =
    key == "completedOrder" ?
      listCompletedTodo.map(c => {
        return c.task_id
      }) :
      listTodo.map(c => {
        return c.task_id
      });

  if (order.length == 0 && (listTodo.length > 0 || listCompletedTodo.length > 0)) {
    localStorage.setItem(key, JSON.stringify(listTasksIds));
    order = listTasksIds;
  }

  const toRemove = order.filter(
    item =>
      !listTasksIds.includes(item)
  );

  const toAdd = listTasksIds.filter(
    item =>
      !order.includes(item)
  );

  let newList: string[] = [...order];

  toRemove.forEach(item => {
    newList = newList.filter(i => i !== item);
  });

  newList = [...newList, ...toAdd];

  localStorage.setItem(key, JSON.stringify(newList));
}