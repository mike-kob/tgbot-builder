import React, { createContext, useReducer } from 'react';

const initialState = {
  user: {},
  loading: false,
};

const Reducer = (state, action) => ({
  ...state,
  ...action,
});

export const AppContext = createContext(initialState);

export function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}
