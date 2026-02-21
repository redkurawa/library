import { useEffect, useState } from 'react';
import { GetService, PostService, DeleteService } from '@/services/service';
import { useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Category {
  id: number;
  name: string;
}

export function CategoryManager() {
  const { token } = useAppSelector((state) => state.auth);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const fetchCategories = async () => {
    const r = await GetService('categories');
    setCategories(r.data.categories);
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleAdd = async () => {
    if (!newCategory.trim() || !token) return;
    try {
      await PostService('categories', { name: newCategory }, token);
      toast.success('Category added successfully!');
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to add category');
    }
  };

  const handleEdit = async () => {
    if (!editingCategory?.name.trim() || !token) return;
    try {
      await PostService(
        `categories/${editingCategory.id}`,
        { name: editingCategory.name },
        token
      );
      toast.success('Category updated successfully!');
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      toast.error('Failed to update category');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await DeleteService(`categories/${id}`, token);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='flex gap-2'>
            <Input
              placeholder='New category name'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>

          <div className='space-y-2'>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className='flex items-center justify-between rounded-lg border p-2'
              >
                {editingCategory?.id === cat.id ? (
                  <div className='flex flex-1 gap-2'>
                    <Input
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      }
                    />
                    <Button size='sm' onClick={handleEdit}>
                      Save
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => setEditingCategory(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className='font-medium'>{cat.name}</span>
                    <div className='flex gap-1'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setEditingCategory(cat)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
