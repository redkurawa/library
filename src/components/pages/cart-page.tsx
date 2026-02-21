import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { removeCart } from '@/redux/cart-slice';
import { Header } from '../layouts/header';
import { Footer } from '../layouts/footer';
import { Button } from '@/components/ui/button';
import { Check, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const CartPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleRemove = (idCart: string) => {
    dispatch(removeCart(idCart));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(idCart);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cart.map((item) => item.idCart)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (idCart: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idCart)) {
        newSet.delete(idCart);
      } else {
        newSet.add(idCart);
      }
      return newSet;
    });
  };

  const selectedCount = selectedItems.size;

  return (
    <>
      <Header />
      <div className='sm-container min-h-[calc(100vh-464px)] py-8'>
        <h1 className='text-[28px] font-bold'>Keranjang Saya</h1>

        <div className='mt-6 flex gap-6'>
          {/* Left Side - Cart Items */}
          <div className='flex-1'>
            {/* Select All */}
            <div className='mb-4 flex items-center gap-2'>
              <button
                onClick={toggleSelectAll}
                className='flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white hover:border-blue-500'
              >
                {selectAll && <Check className='h-3 w-3' />}
              </button>
              <span className='font-medium'>Select all</span>
            </div>

            {cart.length === 0 ? (
              <p className='mt-4 text-gray-500'>Your cart is empty.</p>
            ) : (
              <div className='space-y-4'>
                {cart.map((item) => (
                  <div
                    key={item.idCart}
                    className='flex items-center gap-4 rounded-lg border p-4 shadow-sm'
                  >
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleSelectItem(item.idCart)}
                      className='flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-gray-300 bg-white hover:border-blue-500'
                    >
                      {selectedItems.has(item.idCart) && (
                        <Check className='h-3 w-3' />
                      )}
                    </button>

                    {/* Book Cover */}
                    <div className='h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-200'>
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <img
                          src='/icons/book.svg'
                          alt={item.title}
                          className='h-full w-full object-cover p-2'
                        />
                      )}
                    </div>

                    {/* Book Info */}
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-gray-600'>
                        {item.category}
                      </p>
                      <h3 className='text-lg font-bold'>{item.title}</h3>
                      <p className='text-sm text-gray-500'>{item.author}</p>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleRemove(item.idCart)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <Trash2 className='h-5 w-5' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Loan Summary */}
          <div className='w-72 flex-shrink-0'>
            <div className='rounded-lg border p-4 shadow-sm'>
              <h2 className='text-lg font-bold'>Loan Summary</h2>
              <div className='mt-4 space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total Books</span>
                  <span className='font-medium'>{selectedCount}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Total Quantity</span>
                  <span className='font-medium'>{selectedCount}</span>
                </div>
              </div>
              <Button
                className='mt-6 w-full bg-green-600 text-white hover:bg-green-700'
                size='lg'
                disabled={selectedCount === 0}
              >
                Borrow Book
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
