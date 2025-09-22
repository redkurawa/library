// hooks.ts // file ini belum dipakai, untuk detail2.tsx semua hook di tulis didlm nya
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// export const useMenuSelector = () =>
//   useSelector((state: RootState) => state.menu.menus);
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const useMenuSelector = () =>
//   useSelector((state: RootState) => state.menus.items);
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
