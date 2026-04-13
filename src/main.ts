import './style.css';
import { createSidebar } from './ui/Sidebar';

const app = document.querySelector('#app')!;
app.appendChild(createSidebar());
