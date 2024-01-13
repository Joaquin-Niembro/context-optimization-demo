import React from "react";
import { CountersWithState } from "./examples/CountersWithState";
import { CountersWithStateTwo } from "./examples/CounertWitStateTwo";
import { CountersWithStateThree } from "./examples/CounterWithStateThree";
import { CountersWithRefContext } from "./examples/CounterWithRefContext";
import { CountersWithRefContextOptimized } from "./examples/CounterWithRefContextOptimized";
import { CountersWithReducer } from "./examples/counterWithReducer";
import { CountersWithReducerContextOptimized } from "./examples/CounterWithReducerOptimized";
import "./App.css";

function App() {
  return <CountersWithReducerContextOptimized />;
}

export default App;
