import React, { useState, useEffect } from "react";
import { Card } from './components/Card'
import Error from "./components/Error";
import { Select } from "./components/Select";
import getDog from "./helpers/getDog";
import './index.css'

const initialDog = {
  image: "",
  breed: {
    id: 0,
    name: ""
  }
}

function App() {
  const [dog, setDog] = useState(initialDog);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    updateDog();
  }, []);

  const updateDog = (breedId) => {
    setLoading(true)
    getDog(breedId).then( (newDog) => {
      setDog(newDog);
      setLoading(false)
    })
    .catch((error) => {
      setError('Error al cargar un perro');
      setLoading(false)
    })
  }

  return (
    <div className="app">
      <Select updateDog={updateDog}/>
      {error && <Error error={error}/>}
      <Card dog ={dog} updateDog={updateDog} loading={loading}/>
      
    </div>
  );
}

export default App;
