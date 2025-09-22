import { Route, Routes } from 'react-router';
import { Home } from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';

function App() {
  return (
    <>
      <div className='mx-auto max-w-[1440px] border'>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/' element={<BookList />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
