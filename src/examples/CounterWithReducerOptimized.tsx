import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useReducer,
} from "react";
type useStoreDataReturnType = ReturnType<typeof useStoreData>;
const StoreContext = createContext<useStoreDataReturnType | null>(null);
function countReducer(state, action) {
  switch (action.type) {
    case "counter1":
      return action.payload;
    case "counter2":
      return action.payload;
    case "counter3":
      return action.payload;

    default:
      return state;
  }
}
//////////////////////////
function useStoreData() {
  const store = useRef({ counter1: 0, counter2: 0, counter3: 0 });
  const get = useCallback(() => store.current, []);
  const subscribers = useRef(new Set<() => void>());
  const set = useCallback(({ value }) => {
    store.current = { ...store.current, [value]: store.current[value] + 1 };

    subscribers.current.forEach((cb) =>
      cb({ type: value, payload: store.current })
    );
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    // return unsubscribe method
    return () => subscribers.current.delete(callback);
  }, []);
  console.log(subscribers);
  return {
    get,
    set,
    subscribe,
  };
}
/////////////////////
function useRefBasedStore(type: string, selector) {
  const store = useContext(StoreContext);
  const [state, dispatch] = useReducer(countReducer, selector(store?.get()));

  if (!store) {
    throw new Error("Store not found...");
  }
  // Here we are setting one snapshot of the store using setState in the subscribers per each component that consumes this hook
  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      dispatch({ type, payload: selector(store.get()) })
    );
    return () => {
      unsubscribe();
    };
  }, [store, type]);

  return [state, store.set];
}
function CounterButton({
  value,
}: {
  value: "counter1" | "counter2" | "counter3";
}) {
  console.log(value, "-- BUTTON RE-RENDER");
  const [_, setter] = useRefBasedStore(value, store => store[value]);
  return (
    <button className="btn" onClick={() => setter({ value })}>
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
  const [store] = useRefBasedStore(value, store => store[value]);
  return <label className="displayText">{store}</label>;
};

function CountersWithReducerContextOptimized() {
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

export { CountersWithReducerContextOptimized };
