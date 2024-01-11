import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
type useStoreDataReturnType = ReturnType<typeof useStoreData>;
const CountersStoreContext = createContext<useStoreDataReturnType | null>(null);
function useStoreData(): [
  { counter1: number; counter2: number; counter3: number },
  Dispatch<
    SetStateAction<{ counter1: number; counter2: number; counter3: number }>
  >
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
  const [store, setStore] = useStoreData();
  console.log(value, "-- BUTTON RE-RENDER");
  return (
    <button
      className="btn"
      onClick={() =>
        setStore((prevStore) => ({
          ...prevStore,
          [value]: store[value] + 1,
        }))
      }
    >
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

function CountersWithState() {
  const store = useState({ counter1: 0, counter2: 0, counter3: 0 });
  return (
    <CountersStoreContext.Provider value={store}>
      <div>
        <h1>Counters</h1>
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

export { CountersWithState };
