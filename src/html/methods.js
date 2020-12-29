// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();

  const oldState = vscode.getState();
  const counter = document.getElementById('lines-of-code-counter');
  const listContainer = document.getElementById('list-container');
  const dropdown = document.getElementById('project-dropdown');

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

  // Handle messages sent from the extension to the webview
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case 'sendingData':
        // random
        vscode.postMessage({
          command: 'alert',
          text: JSON.stringify(message.responseData),
        });

        // ==== add data to webview ====
        const userProjects = message.responseData.projects;
        for (let i = 0; i < userProjects.length; i++) {
          // create project title:
          const projectTitle = document.createElement('h3')
          const titleText = document.createTextNode(userProjects[i].projectName);
          projectTitle.appendChild(titleText);
          listContainer.appendChild(projectTitle);

          // add project title to dropdown
          const projectOption = document.createElement('option');
          const projectOptionText = document.createTextNode(userProjects[i].projectName);
          projectOption.appendChild(projectOptionText);
          projectOption.setAttribute("id", userProjects[i].projectName); // repeated id (see below)
          dropdown.appendChild(projectOption);

          // create todo list for that project
          const projectList = mapArrayToList(userProjects[i].todos);
          projectList.setAttribute("id", userProjects[i].projectName); // will append here later
          listContainer.appendChild(projectList);
        }



        break;
    }
  });
}());
