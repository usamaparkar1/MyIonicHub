import { increment, decrement, reset } from '../actions/cart.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState = 0;

export const cartReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1),
    on(reset, (state) => 0)
);