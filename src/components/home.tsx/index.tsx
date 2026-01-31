import { useState, useEffect } from 'react'
import supabase from '../../../utils/supabase';
import type { Fridge } from '../../types/fridge';
import { Link } from 'react-router';
import Loader from '../loader';

const Home = () => {
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
	if (fridges.length === 0) return <Loader/>;
  return (
		<div>
      <h1>Fridges</h1>
      <p>Select which fridge you want to manage</p>
      <ul>
        {fridges.map((fridge) => (
            <li key={fridge.id}>
                <Link to={`/fridge/${fridge.id}`}>
                    {fridge.name}
                </Link>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;