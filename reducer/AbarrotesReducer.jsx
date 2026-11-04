export const AbarrotesReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "update":
      return state.map((item) => 
        item.id === action.payload.id ? action.payload : item
      );
    case "delete":
      return state.filter((actual) => actual.id !== action.payload);
    case "populate":
      return action.payload;
    default:
      return state;
  }
};