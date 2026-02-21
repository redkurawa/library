import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { AddBookSchema, type AddBookFormType } from '@/schema/add-book-schema';
import { useAppSelector } from '@/redux/hooks';
import { GetService, PostService } from '@/services/service';
import { Header } from '../layouts/header';
import { Footer } from '../layouts/footer';
import { Search, Check } from 'lucide-react';

export default function AddBook() {
  const { token } = useAppSelector((state) => state.auth);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [authorSearch, setAuthorSearch] = useState('');
  const [authorSuggestions, setAuthorSuggestions] = useState<
    { id: number; name: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const authorInputRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddBookFormType>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      availableCopies: 0,
    },
  });

  const coverImage = watch('coverImage');

  useEffect(() => {
    const fetchDropdowns = async () => {
      const a = await GetService('authors');
      const c = await GetService('categories');
      setAuthors(a.data.authors);
      setCategories(c.data.categories);
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        authorInputRef.current &&
        !authorInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuthorSearch = (value: string) => {
    setAuthorSearch(value);
    if (value.trim()) {
      const filtered = authors.filter((author) =>
        author.name.toLowerCase().includes(value.toLowerCase())
      );
      setAuthorSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectAuthor = (author: { id: number; name: string }) => {
    setSelectedAuthor(author);
    setAuthorSearch(author.name);
    setValue('authorId', author.id);
    setShowSuggestions(false);
  };

  const handleCreateAuthor = async () => {
    if (!authorSearch.trim() || !token) return;
    try {
      const r = await PostService(
        'authors',
        { name: authorSearch, bio: '' },
        token
      );
      const newAuthor = r.data.data;
      setSelectedAuthor(newAuthor);
      setValue('authorId', newAuthor.id);
      const a = await GetService('authors');
      setAuthors(a.data.authors);
      toast.success('Author created successfully!');
      setShowSuggestions(false);
    } catch (err) {
      toast.error('Failed to create author');
    }
  };

  const onSubmit = async (data: AddBookFormType) => {
    if (!token) {
      return;
    }
    try {
      const r = await PostService('books', data, token);
      console.log(r);
      toast.success('Book added successfully!');
      reset();
      setAuthorSearch('');
      setSelectedAuthor(null);
    } catch (err) {
      toast.error('Failed to add book');
    }
  };

  return (
    <>
      <Header />
      <div className='mx-auto flex min-h-[calc(100vh-464px)] max-w-132.25 items-center justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto max-w-xl space-y-2'
        >
          <div>
            <Label className='text-sm font-bold'>Title</Label>
            <Input {...register('title')} />
            {errors.title && (
              <p className='text-sm text-red-500'>{errors.title.message}</p>
            )}
          </div>

          <div ref={authorInputRef} className='relative'>
            <Label className='text-sm font-bold'>Author</Label>
            <div className='relative'>
              <Input
                placeholder='Search or enter author name'
                value={authorSearch}
                onChange={(e) => handleAuthorSearch(e.target.value)}
                onFocus={() => authorSearch && setShowSuggestions(true)}
              />
              <Search className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
            </div>
            {showSuggestions && (
              <div className='absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-lg'>
                {authorSuggestions.length > 0 ? (
                  authorSuggestions.map((author) => (
                    <div
                      key={author.id}
                      className='cursor-pointer px-3 py-2 hover:bg-gray-100'
                      onClick={() => handleSelectAuthor(author)}
                    >
                      {author.name}
                    </div>
                  ))
                ) : (
                  <div
                    className='cursor-pointer px-3 py-2 text-green-600 hover:bg-gray-100'
                    onClick={handleCreateAuthor}
                  >
                    + Create "{authorSearch}"
                  </div>
                )}
              </div>
            )}
            {selectedAuthor && (
              <p className='mt-1 text-sm text-green-600'>
                <Check className='mr-1 inline h-3 w-3' />
                Selected: {selectedAuthor.name}
              </p>
            )}
            {errors.authorId && (
              <p className='text-sm text-red-500'>{errors.authorId.message}</p>
            )}
          </div>

          <div>
            <Label className='text-sm font-bold'>Category</Label>
            <Select
              onValueChange={(val) => setValue('categoryId', Number(val))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className='text-sm text-red-500'>
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <Label className='text-sm font-bold'>Description</Label>
            <Textarea {...register('description')} />
            {errors.description && (
              <p className='text-sm text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label className='text-sm font-bold'>ISBN</Label>
            <Input {...register('isbn')} />
            {errors.isbn && (
              <p className='text-sm text-red-500'>{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <Label className='text-sm font-bold'>Published Year</Label>
            <Input type='number' {...register('publishedYear')} />
            {errors.publishedYear && (
              <p className='text-sm text-red-500'>
                {errors.publishedYear.message}
              </p>
            )}
          </div>

          <div className='text-sm font-bold'>
            <Label>Cover Image (URL or Upload)</Label>
            <Input {...register('coverImage')} placeholder='https://...' />
            {errors.coverImage && (
              <p className='text-sm text-red-500'>
                {errors.coverImage.message}
              </p>
            )}
            {coverImage && (
              <img
                src={coverImage}
                alt='Preview'
                className='mt-2 max-h-48 rounded-md'
              />
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='text-sm font-bold'>Total Copies</Label>
              <Input type='number' {...register('totalCopies')} />
              {errors.totalCopies && (
                <p className='text-sm text-red-500'>
                  {errors.totalCopies.message}
                </p>
              )}
            </div>
            <div>
              <Label className='text-sm font-bold'>Available Copies</Label>
              <Input type='number' {...register('availableCopies')} />
              {errors.availableCopies && (
                <p className='text-sm text-red-500'>
                  {errors.availableCopies.message}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              type='submit'
              className='flex-1'
              variant={'secondary'}
              size={'md'}
            >
              Add Book
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
