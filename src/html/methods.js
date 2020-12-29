// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();
  const oldState = vscode.getState();

  const counter = document.getElementById('lines-of-code-counter');
  const listContainer = document.getElementById('list-container');
  const dropdown = document.getElementById('project-dropdown');
  const projectForm = document.getElementById('project-form');
  const projectSubmit = document.getElementById('project-submit');
  const projectInput = document.getElementById('project-input');
  const todoForm = document.getElementById('todo-form');
  const todoSubmit = document.getElementById('todo-submit');
  const todoInput = document.getElementById('todo-input');

  let currentCount = (oldState && oldState.count) || 0;
  counter.textContent = currentCount;

  setInterval(() => {
    counter.textContent = currentCount++;

    // Update state
    vscode.setState({ count: currentCount });

    // Alert the extension when the cat introduces a bug
    if (Math.random() < Math.min(0.001 * currentCount, 0.05)) {
      // Send a message back to the extension
      vscode.postMessage({
        command: 'alert',
        text: `🐛  on line ${currentCount}`,
      });
    }
  }, 100000);

  function mapArrayToList(arr) {
    const rootList = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
      const listItem = document.createElement('li');
      listItem.appendChild(document.createTextNode(arr[i]));
      rootList.appendChild(listItem);
    }
    return rootList;
  }

  function addDropdownOption(name) {
    const projectOption = document.createElement('option');
    const projectOptionText = document.createTextNode(name);
    projectOption.appendChild(projectOptionText);
    projectOption.setAttribute("class", name);
    projectOption.setAttribute("value", name);
    dropdown.appendChild(projectOption);
  }

  function addProject(name) {
    // add the title
    const projectTitle = document.createElement('h3');
    projectTitle.setAttribute('class', name) // class
    const titleText = document.createTextNode(name);
    projectTitle.appendChild(titleText);
    listContainer.appendChild(projectTitle);
    // add the empty list underneath
    const emptyList = document.createElement('ul');
    emptyList.setAttribute('class', name);
    listContainer.appendChild(emptyList);
    // add dropdown option
    addDropdownOption(name);
  }

  function addTodo(name, project) {
    const newTodo = document.createElement('li');
    newTodo.appendChild(document.createTextNode(name));
    document.querySelector(`ul.${project}`).appendChild(newTodo); // add to ul with name
  }

  projectSubmit.addEventListener('click', () => {
    const textInput = projectInput.value;
    addProject(textInput);
    projectForm.reset();
  })

  todoSubmit.addEventListener('click', () => {
    const textInput = todoInput.value;
    const dropdownValue = dropdown.value;
    vscode.postMessage({
      command: 'alert',
      text: dropdownValue,
    });
    addTodo(textInput, dropdownValue);
    todoForm.reset();
  })

  // Handle messages sent from the extension to the webview
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case 'sendingData':
        // redundant
        vscode.postMessage({
          command: 'alert',
          text: JSON.stringify(message.responseData),
        });

        // ==== add data to webview ====
        const userProjects = message.responseData.projects;
        for (let i = 0; i < userProjects.length; i++) {
          // create project title:
          const projectTitle = document.createElement('h3');
          projectTitle.setAttribute('class', userProjects[i].projectName) // class
          const titleText = document.createTextNode(userProjects[i].projectName);
          projectTitle.appendChild(titleText);
          listContainer.appendChild(projectTitle);

          // add project title to dropdown
          addDropdownOption(userProjects[i].projectName);

          // create todo list for that project
          const projectList = mapArrayToList(userProjects[i].todos);
          projectList.setAttribute("class", userProjects[i].projectName); // will append here later
          listContainer.appendChild(projectList);
        }
        break;
    }
  });
}());
