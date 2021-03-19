// import logo from './logo.svg';
import './App.css';
import './main.scss';
import MainRouters from './routes';
import { UserContextProvider } from './context/userContext';

function App() {
  return (
    <UserContextProvider>
      <MainRouters />
    </UserContextProvider>
  );
}

export default App;
