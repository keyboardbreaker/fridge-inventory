import { Link } from "react-router-dom";
import Loader from '../loader';
import Container from '../container';
import style from "./home.module.css";
import { formatDistanceToNow } from "date-fns";
import useFridges from '../../hooks/useFridges';

const Home = () => {
  const { fridges, loading } = useFridges();

  return (
		<Container>
      {
        loading ? (
          <div role="status" aria-label="Loading" className={style.loaderContainer}>
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