import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { App } from '../../App';

export * from './Loader';

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);
