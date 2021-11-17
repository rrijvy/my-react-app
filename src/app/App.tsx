import React from "react";
import { useGetPersonTodosQuery } from "../core/store/queries/getPerson";
import "./App.css";

function App() {
  const { data } = useGetPersonTodosQuery(1);
  return <div className="App">{data?.title}</div>;
}

export default App;
