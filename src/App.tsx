import { Route, Routes } from 'react-router';
import { Home } from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import { BookDetail } from './components/pages/book-detail';

function App() {
  return (
    <>
      <div className='mx-auto max-w-[1440px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/:id' element={<BookDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
