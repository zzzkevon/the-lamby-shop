import React, { createContext, useReducer, useContext } from 'react';

const InventoryContext = createContext();

const initialState = {
  items: [],
  type: 'New', // Initial category
};

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_CATEGORY':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);