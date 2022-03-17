import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppRootState } from '../store';

const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export default useAppSelector;