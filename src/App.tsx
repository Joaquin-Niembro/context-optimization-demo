import React from "react";
import { CountersWithState } from "./examples/CountersWithState";
import { CountersWithStateTwo } from "./examples/CounertWitStateTwo";
import { CountersWithStateThree } from "./examples/CounterWithStateThree";
import { CountersWithRefContext } from "./examples/CounterWithRefContext";
import { CountersWithRefContextOptimized } from "./examples/CounterWithRefContextOptimized";
import "./App.css";

function App() {
  return <CountersWithRefContextOptimized />;
}

export default App;
