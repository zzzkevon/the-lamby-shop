export const initialCartState = [];

export const CartTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  DECREASE: "DECREASE",
  SET_QUANTITY: "SET_QUANTITY",
  EMPTY: "EMPTY",
};

const findItem = (cart, itemId) => cart.find(item => item.itemId === itemId);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map(item =>
          item.itemId === action.itemId
            ? { ...item, quantity: item.quantity < 10 ? item.quantity + 1 : 10 }
            : item
        );
      }
      return [...state, { itemId: action.itemId, quantity: 1 }];
    case CartTypes.REMOVE:
      return state.filter(item => item.itemId !== action.itemId);

    case CartTypes.DECREASE: {
      const exsistingState = findItem(state, action.itemId);
      if (exsistingState) {
        const updatedState = state
          .map(item =>
            item.itemId === action.itemId
              ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
              : item
          )
          .filter(item => item.quantity > 0);

        return updatedState;
      }
      return state;
    }

    case CartTypes.SET_QUANTITY: {
      const exsistingState = findItem(state, action.itemId);
      if (exsistingState) {
        const updatedState = state.map(item =>
          item.itemId === action.itemId
            ? { ...item, quantity: action.quantity }
            : item
        );
        return updatedState;
      }
      return state;
    }

    case CartTypes.EMPTY: {
      return initialCartState;
    }

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
