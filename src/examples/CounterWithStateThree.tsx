import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const ContextApi = createContext<any>(0);
const CounterOneContext = createContext(0);
const CounterTwoContext = createContext(0);
const CounterThreeContext = createContext(0);

function CounterSharingWrapper({ children }: { children: any }) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const counter1 = useMemo(() => count1, [count1]);
  const counter2 = useMemo(() => count2, [count2]);
  const counter3 = useMemo(() => count3, [count3]);

  const increaserCounter1 = useCallback(
    () => setCount1((prevCount) => prevCount + 1),
    []
  );
  const increaserCounter2 = useCallback(
    () => setCount2((prevCount) => prevCount + 1),
    []
  );
  const increaserCounter3 = useCallback(
    () => setCount3((prevCount) => prevCount + 1),
    []
  );
  const api = useMemo(
    () => ({ increaserCounter1, increaserCounter2, increaserCounter3 }),
    [increaserCounter1, increaserCounter2, increaserCounter3]
  );
  return (
    <CounterOneContext.Provider value={counter1}>
      <CounterTwoContext.Provider value={counter2}>
        <CounterThreeContext.Provider value={counter3}>
          <ContextApi.Provider value={api}>{children}</ContextApi.Provider>
        </CounterThreeContext.Provider>
      </CounterTwoContext.Provider>
    </CounterOneContext.Provider>
  );
}
//////////////////////////
const useCounterApi = () => useContext(ContextApi);
const useCounterOne = () => useContext(CounterOneContext);
const useCounterTwo = () => useContext(CounterTwoContext);
const useCounterThree = () => useContext(CounterThreeContext);
/////////////////////////
function CounterButton({ functionType }) {
  console.count(functionType, "-- BUTTON RE-RENDER");
  const api = useCounterApi();
  return (
    <button className="btn" onClick={api[functionType]}>
      Increase counter #
    </button>
  );
}
function getCount(counterId) {
  switch (counterId) {
    case "counter1":
      return useCounterOne;
    case "counter2":
      return useCounterTwo;
    case "counter3":
      return useCounterThree;

    default:
      return null;
  }
}
const DisplayCounter = ({ counterId }) => {
  console.log(counterId, "--- re render...");
  const count = getCount(counterId);
  return <label className="displayText">{count()}</label>;
};

function CountersWithStateThree() {
  return (
    <div>
      <h1>Counters</h1>
      <CounterSharingWrapper>
        <div className="buttonWapper">
          <CounterButton functionType="increaserCounter1" />
          <CounterButton functionType="increaserCounter2" />
          <CounterButton functionType="increaserCounter3" />
        </div>
        <div className="displayWrapper">
          <DisplayCounter counterId="counter1" />
          <DisplayCounter counterId="counter2" />
          <DisplayCounter counterId="counter3" />
        </div>
      </CounterSharingWrapper>
    </div>
  );
}

export { CountersWithStateThree };
