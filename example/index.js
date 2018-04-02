import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App
  cryptokey="Sponge Bob was here"
  message="yBGN@¢vPKVYT_M[" />,
  root
);