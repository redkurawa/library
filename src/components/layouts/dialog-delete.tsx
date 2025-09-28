import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

export const DialogDelete = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold'>Delete Data</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        Once deleted, you won’t be able to recover this data.
        <DialogFooter className='flex sm:justify-center sm:gap-10'>
          <DialogClose asChild>
            <Button type='button' variant='outline' size='md' className='w-40'>
              Close
            </Button>
          </DialogClose>
          <Button
            type='button'
            variant='secondary'
            className='hover:text-accent-red w-40 border-0 bg-red-700 font-bold hover:bg-red-200'
            size={'md'}
            onClick={() => {
              // logika delete
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
