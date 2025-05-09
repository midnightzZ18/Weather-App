import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = createRoot(document.getElementById('app'));
root.render(<App />);