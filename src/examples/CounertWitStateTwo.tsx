import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
const ContextData = createContext<any>(0);
const ContextApi = createContext<any>(0);

function CounterSharingWrapper({ children }: { children: any }) {
  const [store, setStore] = useState({ counter1: 0, counter2: 0, counter3: 0 });
  const data = useMemo(() => store, [store]);
  const increaserCounter1 = useCallback(
    () =>
      setStore((prevStore) => ({
        ...prevStore,
        counter1: prevStore.counter1++,
      })),
    []
  );
  const increaserCounter2 = useCallback(
    () =>
      setStore((prevStore) => ({
        ...prevStore,
        counter2: prevStore.counter2++,
      })),
    []
  );
  const increaserCounter3 = useCallback(
    () =>
      setStore((prevStore) => ({
        ...prevStore,
        counter3: prevStore.counter3++,
      })),
    []
  );
  const api = useMemo(
    () => ({ increaserCounter1, increaserCounter2, increaserCounter3 }),
    [increaserCounter1, increaserCounter2, increaserCounter3]
  );
  return (
    <ContextData.Provider value={data}>
      <ContextApi.Provider value={api}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
}
//////////////////////////
const useCounterData = () => useContext(ContextData);
const useCounterApi = () => useContext(ContextApi);
/////////////////////////
function CounterButton({ functionType }) {
  const api = useCounterApi();
  return <button className="btn" onClick={api[functionType]}>Increase counter #</button>;
}
const DisplayCounter = ({ counterId }) => {
    console.log(counterId , "--- re render...");
    const data = useCounterData()
  return <label className="displayText">{data[counterId]}</label>;
};

function CountersWithStateTwo() {
  return (
    <div>
      <h1>Counters</h1>
      <CounterSharingWrapper>
        <div className="buttonWapper">
          <CounterButton functionType='increaserCounter1' />
          <CounterButton functionType='increaserCounter2' />
          <CounterButton functionType='increaserCounter3' />
        </div>
        <div className="displayWrapper">
          <DisplayCounter counterId='counter1' />
          <DisplayCounter counterId='counter2' />
          <DisplayCounter counterId='counter3' />
        </div>
      </CounterSharingWrapper>
    </div>
  );
}

export { CountersWithStateTwo };
