import Shimmer from "./Shimmer";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {MENU_API} from "../utils/Constants";

const RestaurantMenu = () => {

  const {resId} = useParams();
  
  const [resInfo, setResInfo] = useState(null);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json?.data);
  }

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  console.log(itemCards);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>

      <ul>
        {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
