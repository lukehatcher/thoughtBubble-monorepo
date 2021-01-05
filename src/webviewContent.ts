export function getWebviewContent(scriptsURI: any, stylesURI: any, stylesResetUri: any, stylesMainUri: any) {
  return (
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src self; img-src vscode-resource:; script-src vscode-resource: 'self' 'unsafe-inline'; style-src vscode-resource: 'self' 'unsafe-inline'; "/>
      <link href="${stylesResetUri}" rel="stylesheet">
      <link href="${stylesMainUri}" rel="stylesheet">
      <link href="${stylesURI}" rel="stylesheet">
      <title>this is a title</title>
    </head>
    <body>
      <h1>Let's get to work!</h1>
      <div id="form-container">
        <form id="project-form">
          <input id="project-input" type="text" placeholder="new project">
          <input id="project-submit" type="submit">
        </form>

        <form id="todo-form">
          <input id="todo-input" type="text" placeholder="new todo">
          <select id="project-dropdown" placeholder="test">
          </select>
          <input id="todo-submit" type="submit">
        </form>

        <form id="project-delete-form">
          <select id="delete-dropdown">
          </select>
          <input id="project-delete-submit" type="submit" value="Submit">
        </form>
      </div>
      <div id="list-container"></div>
      <script src="${scriptsURI}"></script>
    </body>
    <html>`
  );
}