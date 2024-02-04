document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#input");
  const add = document.querySelector("#add");
  const list = document.querySelector("#list");

  let pendingTasks = [];
  let completedTasks = [];

  const createListItem = (taskContent, isCompleted = false) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <p>${taskContent}</p>
      <div class="icons">
        <span class="material-symbols-outlined complete-task">done</span>
        <span class="material-symbols-outlined delete-task">delete</span>
      </div>`;
    listItem.classList.add("list-item");

    if (isCompleted) {
      listItem.classList.add("completed");
    }

    return listItem;
  };

  const markAsCompleted = (listItem) => {
    const isCompleted = listItem.classList.contains("completed");
    const taskText = listItem.querySelector("p").textContent;

    if (isCompleted) {
      listItem.classList.remove("completed");
      pendingTasks.push(taskText);
      completedTasks = completedTasks.filter((task) => task !== taskText);
    } else {
      listItem.classList.add("completed");
      completedTasks.push(taskText);
      pendingTasks = pendingTasks.filter((task) => task !== taskText);
    }

    storeTasks();
  };

  const deleteTask = (listItem) => {
    listItem.remove();

    const isCompleted = listItem.classList.contains("completed");
    const taskText = listItem.querySelector("p").textContent;

    if (isCompleted) {
      completedTasks = completedTasks.filter((task) => task !== taskText);
    } else {
      pendingTasks = pendingTasks.filter((task) => task !== taskText);
    }

    storeTasks();
  };

  const storeTasks = () => {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  };

  const retrieveTasks = () => {
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || [];

    const storedPendingTasks =
      JSON.parse(localStorage.getItem("pendingTasks")) || [];

    storedCompletedTasks.forEach((completedTask) => {
      const listItem = createListItem(completedTask, true);
      setupListItemEvents(listItem);
      list.prepend(listItem);
    });

    storedPendingTasks.forEach((pendingTask) => {
      const listItem = createListItem(pendingTask);
      setupListItemEvents(listItem);
      list.prepend(listItem);
    });
  };

  const createTask = () => {
    const task = input.value.trim();

    if (!task) {
      alert("Please enter something.");
    } else if (pendingTasks.includes(task) || completedTasks.includes(task)) {
      alert("Task already exists.");
    } else {
      const listItem = createListItem(task);
      setupListItemEvents(listItem);
      list.prepend(listItem);

      pendingTasks.push(task);
      storeTasks();
    }

    input.value = "";
  };

  const setupListItemEvents = (listItem) => {
    listItem
      .querySelector(".complete-task")
      .addEventListener("click", () => markAsCompleted(listItem));
    listItem
      .querySelector(".delete-task")
      .addEventListener("click", () => deleteTask(listItem));
  };

  add.addEventListener("click", createTask);

  retrieveTasks();
});
