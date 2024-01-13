import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useReducer,
} from "react";
type useStoreDataReturnType = ReturnType<typeof useStoreData>;
const CountersStoreContext = createContext<useStoreDataReturnType | null>(null);
function useStoreData(): [
  { counter1: number; counter2: number; counter3: number },
  ({ type: string }) => void
] {
  const store = useContext(CountersStoreContext);
  if (!store) {
    throw new Error("no provider found...");
  }
  return store;
}

function CounterButton({
  value,
}: {
  value: "counter1" | "counter2" | "counter3";
}) {
  const [store, dispatch] = useStoreData();
  console.log(value, "-- BUTTON RE-RENDER");
  return (
    <button className="btn" onClick={() => dispatch({ type: value })}>
      Increase counter #
    </button>
  );
}
const DisplayCounter = ({
  value,
}: {
  value: "counter1" | "counter2" | "counter3";
}) => {
  console.log(value, "--- re render...");
  const [store] = useStoreData();
  return <label className="displayText">{store[value]}</label>;
};
function countReducer(state, action) {
  switch (action.type) {
    case "counter1":
      return { ...state, counter1: state.counter1 + 1 };
    case "counter2":
      return { ...state, counter2: state.counter2 + 1 };
    case "counter3":
      return { ...state, counter3: state.counter3 + 1 };

    default:
      return state;
  }
}
function CountersWithReducer() {
  const store = useReducer(countReducer, {
    counter1: 0,
    counter2: 0,
    counter3: 0,
  });
  return (
    <CountersStoreContext.Provider value={store}>
      <div>
        <h1>Counters</h1>{" "}
        <div className="buttonWapper">
          <CounterButton value="counter1" />
          <CounterButton value="counter2" />
          <CounterButton value="counter3" />
        </div>
        <div className="displayWrapper">
          <DisplayCounter value="counter1" />
          <DisplayCounter value="counter2" />
          <DisplayCounter value="counter3" />
        </div>
      </div>
    </CountersStoreContext.Provider>
  );
}

export { CountersWithReducer };
