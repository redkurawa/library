import { Route, Routes } from 'react-router';
import BookStar from './components/pages/book-base-category';
import { BookDetail } from './components/pages/book-detail';
import { Home } from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import { Admin } from './components/pages/admin-page';
import { Toaster } from './components/ui/sonner';

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
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <Toaster
          position='top-center' // ⬅️ posisi toast di tengah atas
          richColors // ⬅️ aktifkan warna default seperti hijau/oranye
          // closeButton // ⬅️ opsional: tombol tutup
        />
      </div>
    </>
  );
}

export default App;
