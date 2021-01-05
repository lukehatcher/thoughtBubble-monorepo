// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
/**
 * logs here show up in the????
 */
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

  function mapArrayToList(arr, projectName) {
    const rootList = document.createElement('ul');
    for (let i = 0; i < arr.length; i++) {
      const listItem = document.createElement('li');
      if (arr[i].completed) listItem.style.textDecoration = 'line-through';
      listItem.appendChild(document.createTextNode(arr[i].text));
      // rootList.appendChild(listItem);

      // create info div
      const todoInfoContainer = document.createElement('div');
      todoInfoContainer.setAttribute('class', 'todo-info-container');
      // create delete button
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'delete-todo-btn');
      // deleteButton.appendChild(document.createTextNode('\u2718')); // sloppy x U+1F5D1
      deleteButton.appendChild(document.createTextNode('🗑'));
      deleteButton.onclick = () => {
        vscode.postMessage({
          command: 'delete todo',
          text: null,
          type: 'todo',
          username: PLACE_HOLDER, // hardcoded
          projectName,
          todo: arr[i].text,
        });
      }
      // create completion button
      const completionButton = document.createElement('button');
      completionButton.setAttribute('class', 'check-todo-btn')
      completionButton.appendChild(document.createTextNode('\u2714')); // check button
      completionButton.onclick = () => {
        vscode.postMessage({
          command: 'toggle todo',
          text: null,
          type: 'todo',
          username: PLACE_HOLDER, // hardcoded
          projectName,
          todo: arr[i].text,
        });
      }
      // attach buttons to container
      todoInfoContainer.appendChild(deleteButton);
      todoInfoContainer.appendChild(completionButton);
      // attach container to list item
      listItem.appendChild(todoInfoContainer);
      rootList.appendChild(listItem);
    }
    return rootList;
  }

  function addDropdownLabel(labelText, specificDropdown) {
    const projectOption = document.createElement('option');
    const projectOptionText = document.createTextNode(labelText);
    projectOption.appendChild(projectOptionText);
    projectOption.setAttribute('selected', true);
    projectOption.setAttribute('disabled', true);
    specificDropdown.appendChild(projectOption);
  }

  // Handle messages sent from the extension to the webview
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case 'new todo via selection':
        console.log(message.todo, message.projectName);
        // post to database and refresh
        break;

      case 'sendingData':
        // how to post an alert to the webview:
        // vscode.postMessage({
        //   command: 'alert',
        //   text: JSON.stringify(message.responseData),
        // });

        // ==== add data to webview and render ====
        function renderHTML() {
          listContainer.innerHTML = '';
          dropdown.innerHTML = '';
          dropdownD.innerHTML = '';
          // add drop down label
          addDropdownLabel('select project', dropdown);
          addDropdownLabel('delete project', dropdownD);
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
            const projectList = mapArrayToList(userProjects[i].todos, userProjects[i].projectName);
            projectList.setAttribute("class", className);
            listContainer.appendChild(projectList);
          }
        }
        renderHTML();
        break;
    }
  });
}());
