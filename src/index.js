import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BoardsProvider } from './app/providers/board-provider';
import { TaskProvider } from './app/providers/task-provider';
import { LightboxProvider } from './app/providers/lightbox-provider';
import { NavigationProvider } from './app/providers/navigation-provider';
import { ThemeProvider } from './app/providers/theme-provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NavigationProvider>
        <ThemeProvider>
        <LightboxProvider>
          <TaskProvider>
            <BoardsProvider>
              <App />
            </BoardsProvider>
            </TaskProvider>
        </LightboxProvider>
        </ThemeProvider>
      </NavigationProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
