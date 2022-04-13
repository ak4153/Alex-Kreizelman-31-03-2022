import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from './reduxjsStore';

//creating the hooks in a separate file will prevent creating them each time
//in components

//the dispatch reducer function
export const useAppDispatch = () => useDispatch<AppDispatch>();
//extract the state from here
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
