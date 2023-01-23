const add = document.querySelector(".btn.adicionar");
const taskContainer = document.querySelector(".tasks");

const getDados = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setDados = (dados) =>
  localStorage.setItem("todoList", JSON.stringify(dados));

const createElement = (tarefa, status, index) => {
  const item = document.createElement("label");
  item.classList.add("task");
  item.innerHTML = `
    <input type="checkbox" ${status} data-index="${index}">
    <p>${tarefa}</p>
    <button class="btn remove" data-index="${index}"></button>
    `;
  document.querySelector(".tasks").appendChild(item);
};

const cleanTasks = () => {
  const tasks = document.querySelector(".tasks");
  while (tasks.firstChild) {
    tasks.removeChild(tasks.lastChild);
  }
};

const updateTasks = () => {
  cleanTasks();
  const dados = getDados();
  dados.forEach((item, index) =>
    createElement(item.tarefa, item.status, index)
  );
};

const addTask = () => {
  const titulo = document.querySelector('input[type="text"]');
  const dados = getDados();
  dados.push({ tarefa: titulo.value });
  setDados(dados);
  titulo.value = "";
  updateTasks(titulo.value);
};

const removeTask = (index) => {
  const dados = getDados();
  dados.splice(index, 1);
  setDados(dados);
  updateTasks();
};

const updateItem = (index) => {
  const dados = getDados();
  dados[index].status = dados[index].status === "" ? "checked" : "";
  setDados(dados);
  updateTasks();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.getAttribute("class") === "btn remove") {
    const index = element.dataset.index;
    removeTask(index);
  } else if (element.type === "checkbox") {
    const index = element.dataset.index;
    updateItem(index);
  }
};

add.addEventListener("click", addTask);
taskContainer.addEventListener("click", clickItem);

updateTasks();
