import React from 'react';
import ReactDOM, {render} from 'react-dom';
import App from './App';
import Person from './components/Person';
import jsonData from './dataset.json';
import { act } from "react-dom/test-utils";

it('render Person component without crashing', () => {
  const div = document.createElement('div');
  const showSubItems = jest.fn();
  const toggleItem = jest.fn();
  const deleteItem = jest.fn();
  ReactDOM.render(<Person personData={jsonData} showSubItems={showSubItems} toggleItem={toggleItem} deleteItem={deleteItem}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
