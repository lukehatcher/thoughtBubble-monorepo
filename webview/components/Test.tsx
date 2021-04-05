import * as React from 'react';
import { Link } from 'react-router-dom';

export const Test: React.FC = function () {
  return (
    <>
      <Link to="/app">return home</Link>
      <div>hello from test component</div>
    </>
  );
};
