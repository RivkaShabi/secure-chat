import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './components/chat/chat';
import LoginForm from './components/loginForm/loginForm';
import { UserProvider } from './components/user';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
