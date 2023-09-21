import { useRef, useEffect, useState } from "react";

//useref hook can set state without triggering a rerender
//inpractice it is used to get references to html element
//or provide an initial value...
function App() {
  const inputRef = useRef(null);

  // use effect also produces the same effect as afterviewinit
  // runs on render complet
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //in this case usefref can be used to track nameid
  //but usestate is not appropriate because no need to
  //rerender on idincremented
  const idRef = useRef(1);
  const [names, setNames] = useState([
    { id: idRef.current++, name: "John" },
    { id: idRef.current++, name: "Jane" },
  ]);

  //can use input ref to get current name from input element
  //inplace of a onchange handler
  const onAddName = () => {
    setNames([
      ...names,
      {
        id: idRef.current++,
        name: inputRef.current.value,
      },
    ]);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div>
        {names.map((name) => (
          <div key={name.name}>
            {name.id} - {name.name}
          </div>
        ))}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
