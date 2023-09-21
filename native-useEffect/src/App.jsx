import { useState, useEffect } from "react";

//mainly called to get data from an api once
//VERY SIMILAR TO RXJS TAKE 1!!

//no need to trigger useffect when making api calls from user
//input just make the api call onhandleinput instead
const Stopwatch = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        console.log(t);
        return t + 1;
      });
    }, 1000);
    // use effect returns cleanup funcion beleow, called when
    // old useffect is unmounted and new one is bieng mounted
    return () => clearInterval(interval);
  }, []);

  return <div>Time: {time}</div>;
};

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch("/names.json")
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);

  const [seletedNameDetails, setSelectedNameDetails] = useState(null);

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((response) => response.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <div>
      <Stopwatch />
      <div>
        {names.map((name) => (
          <button onClick={() => onSelectedNameChange(name)}>{name}</button>
        ))}
      </div>
      <div>{JSON.stringify(seletedNameDetails)}</div>
    </div>
  );
}

export default App;
