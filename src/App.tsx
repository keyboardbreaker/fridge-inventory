import { useState, useEffect } from 'react'
import supabase from '../utils/supabase'
import type { Fridge } from './types/fridge';


function App() {
  const [fridges, setFridges] = useState<Fridge[]>([]);

  useEffect(() => {
    async function getFridges() {

      const { data, error } = await supabase
        .from("fridges")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }
      if (data) { //shorthand setFridges(data ?? []);
        setFridges(data)
      }
    }

    getFridges()
  }, [])

  return (
    <>
      <h1>Fridges</h1>
      <ul>
        {fridges.map((fridge) => (
          <li key={fridge.id}>{fridge.name}</li>
        ))}
      </ul>
    </>
  )
}
export default App