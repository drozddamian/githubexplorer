import { Action, combineReducers, ThunkAction } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import repositoryExplorer from './repositoryExplorer';

const rootReducer = combineReducers({
  repositoryExplorer: repositoryExplorer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
