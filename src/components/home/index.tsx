import { useState, useEffect } from 'react'
import supabase from '../../../utils/supabase';
import { Link } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
	const [fridges, setFridges] = useState<FridgeCard[]>([]);

  useEffect(() => {
    async function getFridges() {
      try {
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
        if (data) {
          console.log(data);
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
      } finally {
        setLoading(false);
      }
    }
    getFridges()
  }, [])
  return (
		<Container>
      {
        loading ? (
          <div className={style.loaderContainer}>
            <Loader/>
          </div>
        ) : (
          <>
            <h1 className={style.heroTitle}>Available Fridges</h1>
            <p>Select a Fridge</p>
            <ul className={style.fridgeList}>
              {fridges.map((fridge) => (
                  <li className={style.listItem} key={fridge.id}>
                      <Link to={`/fridge/${fridge.id}`}>
                          <div className={style.grid}>
                            <button className={style.card}>
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
                            </button>
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