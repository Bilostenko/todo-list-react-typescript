import { useDispatch, useSelector } from 'react-redux';
// Use throughout the application instead of the usual `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
