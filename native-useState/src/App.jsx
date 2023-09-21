import { useState } from "react";

function NameList() {
  const [list, setList] = useState(["jakyll", "hyde", "jill", "john"]);
  const [name, setName] = useState("");
  // use state can also take in an initial function that is guaranted to run once
  // const [name, setName] = useState(()=>"nick");

  const onAddName = () => {
    setList([...list, name]);
    setName("");
  };
  return (
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={onAddName}> Add name</button>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(10);
  function addOne() {
    setCount(count + 1);
  }
  return (
    <>
      <button onClick={addOne}>Count = {count}</button>
    </>
  );
}

function App() {
  return (
    <div>
      <NameList />
      <Counter />
    </div>
  );
}

export default App;
