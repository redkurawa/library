import { Route, Routes } from 'react-router';
import BookStar from './components/pages/book-base-category';
import { BookDetail } from './components/pages/book-detail';
import { Home } from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';

function App() {
  return (
    <>
      <div className='mx-auto max-w-[1440px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books/:id' element={<BookDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/category' element={<BookStar />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
