import { useReducer, useState } from "react";

// this useReducer pattern autoamatically updates state from input without
// requiring explicit state updateing functions
function UserForm() {
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      first: "",
      last: "",
    }
  );
  return (
    <div>
      <input
        type="text"
        value={state.first}
        onChange={(e) => dispatch({ first: e.target.value })}
      />
      <input
        type="text"
        value={state.last}
        onChange={(e) => dispatch({ last: e.target.value })}
      />

      <div>{state.first}</div>
      <div>{state.last}</div>
    </div>
  );
}

function NameList() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_NAME":
          return { ...state, name: action.payload };
        case "ADD_NAME":
          return {
            ...state,
            names: [...state.names, state.name],
            name: "",
          };
      }
    },
    {
      names: [],
      name: "",
    }
  );
  console.log(state.names);
  return (
    <>
      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />

      <div>Name = {state.name}</div>
      <button onClick={() => dispatch({ type: "ADD_NAME" })}>Add Name</button>
      <div>
        {state.names.map((name, index) => {
          return <div>{name}</div>;
        })}
      </div>
    </>
  );
}

function App() {
  return (
    <div>
      <UserForm />
      <NameList />
    </div>
  );
}

export default App;
