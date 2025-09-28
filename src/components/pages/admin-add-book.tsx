import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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

export default function AddBook() {
  const { token } = useAppSelector((state) => state.auth);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

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

  const onSubmit = async (data: AddBookFormType) => {
    if (!token) {
      return;
    }
    try {
      const r = await PostService('books', data, token);
      console.log(r);
      toast.success('Book added successfully!');
      reset();
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

          <div>
            <Label className='text-sm font-bold'>Author</Label>
            <Select onValueChange={(val) => setValue('authorId', Number(val))}>
              <SelectTrigger>
                <SelectValue placeholder='Select author' />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={String(author.id)}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          <Button
            type='submit'
            className='w-full'
            variant={'secondary'}
            size={'md'}
          >
            Add Book
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
