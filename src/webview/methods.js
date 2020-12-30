// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();
  // const oldState = vscode.getState();
  const PLACE_HOLDER = 'jon doe';

  const listContainer = document.getElementById('list-container');
  const dropdown = document.getElementById('project-dropdown');
  const dropdownD = document.getElementById('delete-dropdown');
  const projectForm = document.getElementById('project-form');
  const projectSubmit = document.getElementById('project-submit');
  const projectInput = document.getElementById('project-input');
  const todoForm = document.getElementById('todo-form');
  const todoSubmit = document.getElementById('todo-submit');
  const todoInput = document.getElementById('todo-input');
  const projectDelete = document.getElementById('project-delete-submit');

  function mapArrayToList(arr) {
    const rootList = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
      const listItem = document.createElement('li');
      listItem.appendChild(document.createTextNode(arr[i]));
      rootList.appendChild(listItem);
    }
    return rootList;
  }

  function parseClassName(string) {
    // turn string seperated with spaces into string seperated with hyphens
    // leaves strings without spaces unchanged
    // used for creating classnames
    return string.split(' ').join('-');
  }

  function addDropdownOption(name, specificDropdown) {
    const className = parseClassName(name); // create classname without spaces
    const projectOption = document.createElement('option');
    const projectOptionText = document.createTextNode(name);
    projectOption.appendChild(projectOptionText);
    projectOption.setAttribute("class", className);
    projectOption.setAttribute("value", name);
    specificDropdown.appendChild(projectOption);
  }

  // function addProject(name) {
  //   const className = parseClassName(name); // remove any spaces
  //   // add the title
  //   const projectTitle = document.createElement('h3');
  //   projectTitle.setAttribute('class', className);
  //   const titleText = document.createTextNode(name);
  //   projectTitle.appendChild(titleText);
  //   listContainer.appendChild(projectTitle);
  //   // add the empty list underneath
  //   const emptyList = document.createElement('ul');
  //   emptyList.setAttribute('class', className);
  //   listContainer.appendChild(emptyList);
  //   // add dropdown option
  //   addDropdownOption(name, dropdown);
  //   addDropdownOption(name, dropdownD);
  // }

  // function addTodo(name, project) {
  //   const newTodo = document.createElement('li');
  //   newTodo.appendChild(document.createTextNode(name));
  //   const className = parseClassName(project);
  //   document.querySelector(`ul.${className}`).appendChild(newTodo);
  // }

  projectSubmit.addEventListener('click', () => {
    const textInput = projectInput.value;
    // send message to ext where db update is fired
    vscode.postMessage({
      command: 'add project',
      text: null,
      type: 'project',
      username: PLACE_HOLDER, // hardcoded
      projectName: textInput,
      todo: null,
    });
    // update webview
    // addProject(textInput);
    projectForm.reset();
  })

  todoSubmit.addEventListener('click', () => {
    const textInput = todoInput.value;
    const dropdownValue = dropdown.value;
    // send message to ext where db update is fired
    vscode.postMessage({
      command: 'add todo',
      text: null,
      type: 'todo',
      username: PLACE_HOLDER, // hardcoded
      projectName: dropdownValue,
      todo: textInput,
    });
    // addTodo(textInput, dropdownValue);
    todoForm.reset();
  })

  projectDelete.addEventListener('click', () => {
    const dropdownValue = dropdownD.value;
    vscode.postMessage({
      command: 'delete project',
      text: null,
      type: 'project',
      username: PLACE_HOLDER, // hardcoded
      projectName: dropdownValue,
      todo: null,
    });
    document.getElementById('project-delete-form').reset();
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
        function wrapper() {
          listContainer.innerHTML = '';
          dropdown.innerHTML = '';
          dropdownD.innerHTML = '';
          const userProjects = message.responseData.projects;
          for (let i = 0; i < userProjects.length; i++) {
            // remove spaces for classname
            const className = parseClassName(userProjects[i].projectName);
            // create project title:
            const projectTitle = document.createElement('h3');
            projectTitle.setAttribute('class', className);
            const titleText = document.createTextNode(userProjects[i].projectName);
            projectTitle.appendChild(titleText);
            listContainer.appendChild(projectTitle);
  
            // add project title to dropdown
            addDropdownOption(userProjects[i].projectName, dropdown);
            addDropdownOption(userProjects[i].projectName, dropdownD);
  
            // create todo list for that project
            const projectList = mapArrayToList(userProjects[i].todos);
            projectList.setAttribute("class", className);
            listContainer.appendChild(projectList);
          }
        }
        wrapper();
        break;
    }
  });
}());
