import AuthorList from '../layouts/author-list';
import BookList from '../layouts/book-list';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';
import { Navbar } from '../layouts/hero-navbar';

export const Home = () => {
  return (
    <>
      <Header />
      <div className='sm-container px-2 md:px-0'>
        <img src='/images/hero.png' alt='hero' className='mt-12' />
        <Navbar />
        <BookList />
        <AuthorList />
      </div>
      <Footer />
    </>
  );
};
