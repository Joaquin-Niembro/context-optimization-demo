import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
type useStoreDataReturnType = ReturnType<typeof useStoreData>;
const StoreContext = createContext<useStoreDataReturnType | null>(null);
//////////////////////////
function useStoreData() {
  const store = useRef({ counter1: 0, counter2: 0, counter3: 0 });
  const get = useCallback(() => store.current, []);
  const subscribers = useRef(new Set<() => void>());
  const set = useCallback((value) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((cb) => cb());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    // return unsubscribe method
    return () => subscribers.current.delete(callback);
  }, []);
  return {
    get,
    set,
    subscribe,
  };
}
/////////////////////
function useRefBasedStore() {
  const store = useContext(StoreContext);
  const [state, setState] = useState(store.get());
  if (!store) {
    throw new Error("Store not found...");
  }
  // Here we are setting one snapshot of the store using setState in the subscribers per each component that consumes this hook
  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.get()));
    return () => {
      unsubscribe();
    };
  }, [store]);

  return [state, store.set];
}
function CounterButton({
  value,
}: {
  value: "counter1" | "counter2" | "counter3";
}) {
  console.log(value, "-- BUTTON RE-RENDER");
  const [store, setter] = useRefBasedStore();
  return (
    <button
      className="btn"
      onClick={() => setter({ [value]: store[value] + 1 })}
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
  const [store] = useRefBasedStore();
  return <label className="displayText">{store[value]}</label>;
};

function CountersWithRefContext() {
  return (
    <div>
      <h1>Counters</h1>
      <StoreContext.Provider value={useStoreData()}>
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
      </StoreContext.Provider>
    </div>
  );
}

export { CountersWithRefContext };
