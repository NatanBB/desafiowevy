import {
  formatDate,
  validateInsert,
  saveOrder,
  loadOrder,
  updateOrder
} from "../../utils/functions";

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string): string | null {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

describe("formatDate", () => {
  it("should format a date correctly", () => {
    const date = new Date("2024-03-03T22:21:45.422Z");
    const formattedDate = formatDate(date);

    date.setHours(date.getHours() - 3);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    const expectedFormattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    expect(formattedDate).toEqual(expectedFormattedDate);
  });
});

describe("validateInsert", () => {
  it("should return true when both newDescription and newTitle are empty", () => {
    const result = validateInsert("", "");
    expect(result).toBe(true);
  });

  it("should return false when either newDescription or newTitle is not empty", () => {
    const result1 = validateInsert("", "Title");
    const result2 = validateInsert("Description", "");
    const result3 = validateInsert("Description", "Title");
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });
});

describe("saveOrder", () => {
  it("should save the order in localStorage", () => {
    const list = [
      { task_id: "1", title: "Task 1", description: "Description 1", user_id: "user1" },
      { task_id: "2", title: "Task 2", description: "Description 2", user_id: "user1" }
    ];
    saveOrder(list, false); // Save order for todo list
    const savedOrder = JSON.parse(localStorage.getItem("todoOrder") || "[]");
    expect(savedOrder).toEqual(["1", "2"]);
  });
});

describe("loadOrder", () => {
  it("should load the order from localStorage", () => {
    const list = [
      { task_id: "1", title: "Task 1", description: "Description 1", user_id: "user1" },
      { task_id: "2", title: "Task 2", description: "Description 2", user_id: "user1" }
    ];
    localStorage.setItem("todoOrder", JSON.stringify(["1", "2"]));
    const loadedList = loadOrder(list, false);

    const loadedIds = loadedList.map(item => item.task_id);
    const originalIds = list.map(item => item.task_id);

    expect(loadedIds).toEqual(originalIds);
  });
});

describe("updateOrder", () => {
  it("should update the order in localStorage", () => {
    const listTodo = [
      { task_id: "1", title: "Task 1", description: "Description 1", user_id: "user1" },
      { task_id: "2", title: "Task 2", description: "Description 2", user_id: "user1" }
    ];
    saveOrder(listTodo, false);
    const listCompletedTodo = [
      { task_id: "3", title: "Task 3", description: "Description 3", user_id: "user1" }
    ];
    saveOrder(listCompletedTodo, true);

    updateOrder(false, listTodo, listCompletedTodo);

    const savedTodoOrder = JSON.parse(localStorage.getItem("todoOrder") || "[]");
    const savedCompletedOrder = JSON.parse(localStorage.getItem("completedOrder") || "[]");

    expect(savedTodoOrder).toContain("1");
    expect(savedTodoOrder).toContain("2");
    expect(savedCompletedOrder).toContain("3");
  });
});
