import { createRoot } from 'react-dom/client';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('app')!);
root.render(<Login />);