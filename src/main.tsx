import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PythonRunner } from './utils/pythonRunner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Tải sẵn Python (Pyodide) ở nền để lần chạy / chấm bài đầu tiên không phải chờ
setTimeout(() => { PythonRunner.initPyodide().catch(() => {}); }, 1500);
