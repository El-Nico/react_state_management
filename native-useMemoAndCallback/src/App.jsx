import { useState, useMemo, useCallback } from "react";

// use usememo whenever you do a complex calculation that you dont
// want to recalculate on every render
// basically track a state and only rerender on state change??
// only use for arrays or objects

// do not use when calculation is simple and results in a number
// or scalar, only use when calculation is complex and results
// in big array or object

function SortedList({ list, sortFunc }) {
  console.log("SortedList render");

  const sortedList = useMemo(() => {
    console.log("Running sort");
    return [...list].sort(sortFunc);
  }, [list, sortFunc]);

  return <div>{sortedList.join(", ")}</div>;
}

function App() {
  const [numbers] = useState([10, 20, 30]);

  const total = useMemo(
    () => numbers.reduce((acc, number) => acc + number, 0),
    [numbers]
  );

  const [names] = useState(["John", "Paul", "George", "Ringo"]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const countTotal = count1 + count2;

  // usecallback memorizes the sort function so it doenst
  // trigger use memo on every rerencer
  // will only trigger if sort func changes

  //use this to stabilize references u pass to a reacomponet
  //also use when creating a custom hook make sure the reference
  //to cb function is stable
  const sortFunc = useCallback((a, b) => a.localeCompare(b) * -1, []);

  return (
    <>
      <div>Total: {total}</div>
      <div>Names: {names.join(", ")}</div>
      <SortedList list={names} sortFunc={sortFunc} />
      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <div>Total: {countTotal}</div>
    </>
  );
}

export default App;
