import { useState, useEffect } from 'react'
import supabase from '../../../utils/supabase';
import { Link } from 'react-router';
import Loader from '../loader';
import Container from '../container';
import style from "./home.module.css";
import { formatDistanceToNow } from "date-fns";

type FridgeCard = {
  id: string;
  name: string;
  itemCount: number;
  lastUpdated: string | null;
};

const Home = () => {
	const [fridges, setFridges] = useState<FridgeCard[]>([]);

  useEffect(() => {
    async function getFridges() {
      const { data, error } = await supabase
        .from("fridges")
        .select(`
          id,
          name,
          food_items (
            id,
            created_at
          )
        `);
        
      if (error) {
        console.error(error);
        return;
      }
      if (data) { //shorthand setFridges(data ?? []);
        const fridgeCards: FridgeCard[] = data.map((fridge) => {
          const itemCount = fridge.food_items.length;

          const lastUpdated = fridge.food_items.length > 0 ?
            fridge.food_items.reduce((latest, item) => {
              if(!latest) return item.created_at;

              return new Date(item.created_at) > new Date(latest) ?
                item.created_at :
                latest;
            }, null as string | null) : null;

            return {
              id: fridge.id,
              name: fridge.name,
              itemCount,
              lastUpdated
            }
        });
        setFridges(fridgeCards);
      }
    }

    getFridges()
  }, [])
  return (
		<Container>
      {
        fridges.length === 0 ? (
          <div className={style.loaderContainer}>
            <Loader/>
          </div>
        ) : (
          <>
            <h1>Available Fridges</h1>
            <p>Select which fridge you want to manage</p>
            <ul>
              {fridges.map((fridge) => (
                  <li className={style.listItem} key={fridge.id}>
                      <Link to={`/fridge/${fridge.id}`}>
                          <div className={style.grid}>
                            <div className={style.card}>
                              <h3>{fridge.name}</h3>
                              <p className={style.items}>{fridge.itemCount} item{fridge.itemCount !== 1 && "s"}</p>
                              <p className={style.updated}>
                                {
                                  fridge.lastUpdated ?
                                    `Last updated ${formatDistanceToNow(new Date(fridge.lastUpdated), {
                                      addSuffix : true
                                    })}` :
                                    ""
                                }
                              </p>
                            </div>
                          </div>
                      </Link>
                  </li>
              ))}
            </ul>
          </>
      )}
    </Container>
  );
}

export default Home;