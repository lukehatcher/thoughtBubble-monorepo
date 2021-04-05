import * as React from 'react';
import { Link } from 'react-router-dom';

export const Test: React.FC = function () {
  return (
    <>
      <Link to="/app">app</Link>
      <div>hello from test component</div>
    </>
  );
};
