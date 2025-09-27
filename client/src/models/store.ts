import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer";
import { connect } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});
export default store;

/**
 * Store state in localStorage for persistance
 */
store.subscribe(() => {
  localStorage.setItem("appState", JSON.stringify(store.getState()));
});

/**
 * For debugging redux store, comment out if not needed
 */
store.subscribe(() => console.table(store.getState()));

export function TypedConnect<StateProps = {}, DispatchProps = {}>(
  mapStateToProps?: (state: any) => StateProps,
  mapDispatchToProps?: any
) {
  return function <T extends new (...args: any[]) => any>(target: T): T {
    // Force connect to accept just 2 args (fill rest with undefined)
    return connect(mapStateToProps, mapDispatchToProps)(target as any) as any;
  };
}
