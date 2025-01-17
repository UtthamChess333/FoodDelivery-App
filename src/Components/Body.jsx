import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect } from "react";

const Body = () => {
  const [listOfRestauarants, setListOfRestaurants] = useState(resList);

  useEffect(() => {
    fetchData();
    console.log("useEffect Called");
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&collection=80461&tags=layout_CCS_Momos&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

    const json = await data.json();
    console.log("Json: ", json);
    setListOfRestaurants(json?.data?.cards);
  };

  return (
    <div className="body">
      <button
        className="filter-btn"
        onClick={() => {
          console.log("Button Clicked");
          const filteredList = listOfRestauarants.filter(
            (res) => res.card?.card?.info?.avgRating > 4.0
          );
          setListOfRestaurants(filteredList);
        }}
      >
        Top Rated Restaurants
      </button>
      <div className="res-container">
        {listOfRestauarants.map((res) => (
          <RestaurantCard key={res?.card?.card?.info?.id} resData={res?.card?.card?.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;
