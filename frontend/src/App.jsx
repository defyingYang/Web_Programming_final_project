// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import RegisterPage from './pages/RegisterPage';
import NotePage from './edit/pages/NotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
