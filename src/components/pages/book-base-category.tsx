import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { BookCard } from '../layouts/book-card';
import { Footer } from '../layouts/footer';
import { Header } from '../layouts/header';

const BookList: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.book
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // State untuk kategori dan rating yang dipilih
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Mengambil data buku saat komponen dimuat
  // useEffect(() => {
  //   dispatch(getBooks());
  // }, [dispatch]);

  // Ekstrak daftar kategori unik dari books
  const uniqueCategories = Array.from(
    new Set(books.map((book) => book.category.name))
  ).sort();

  // Daftar rating statis (1 sampai 5)
  const ratings = [1, 2, 3, 4, 5];

  // Filter buku berdasarkan kategori dan rating yang dipilih
  const filteredBooks = books.filter((book) => {
    const categoryMatch =
      selectedCategories.length > 0
        ? selectedCategories.includes(book.category.name)
        : true;
    const ratingMatch =
      selectedRatings.length > 0
        ? selectedRatings.includes(Math.floor(book.rating))
        : true;
    return categoryMatch && ratingMatch;
  });

  // Menghitung pagination untuk daftar buku
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className='sm-container mt-12'>
        <h1 className='mb-4 text-4xl font-bold'>Book List</h1>
        <div className='flex gap-10'>
          <div>
            {/* Checkbox untuk memilih beberapa kategori */}
            <div className='shadow-all mb-4 h-fit w-60 p-4'>
              <h2 className='text-mg font-medium'>FILTER</h2>
              <h3 className='w-fit text-lg font-bold'>Category</h3>
              <div className='mt-2 gap-4'>
                {uniqueCategories.map((category) => (
                  <div
                    key={category}
                    className='mb-4 flex items-center space-x-2'
                  >
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== category)
                          );
                        }
                        setCurrentPage(1);
                      }}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
              <div className='mb-4'>
                <h3 className='w-fit text-lg font-bold'>Category</h3>
                <div className='mt-2 gap-4'>
                  {ratings.map((rating) => (
                    <div
                      key={rating}
                      className='mb-4 flex items-center space-x-2'
                    >
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRatings([...selectedRatings, rating]);
                          } else {
                            setSelectedRatings(
                              selectedRatings.filter((r) => r !== rating)
                            );
                          }
                          setCurrentPage(1);
                        }}
                      />
                      <Label htmlFor={`rating-${rating}`}>
                        {rating} Bintang
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Checkbox untuk memilih beberapa rating */}
          </div>
          <div>
            <div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
              {currentBooks.map((book) => (
                <Link key={book.id} to={`/books/${book.id}`}>
                  <BookCard book={book} />
                </Link>
              ))}
            </div>
            <div className='mt-4'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className='m-1 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600'
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookList;
