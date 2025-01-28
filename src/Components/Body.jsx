import RestaurantCard from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestauarants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&collection=80461&tags=layout_CCS_Momos&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

    const json = await data.json();
    setListOfRestaurants(json?.data?.cards);
    setFilteredRestaurants(json?.data?.cards);
    console.log("Json: ", json);
  };

  if (listOfRestauarants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(searchText);
              const filteredRestaurants = listOfRestauarants.filter(
                (res) => res?.card?.card?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRestaurants);
            }}
          >
            search
          </button>
        </div>
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
      </div>
      <div className="res-container">
        {filteredRestaurants.map((res) => (
          <RestaurantCard
            key={res?.card?.card?.info?.id}
            resData={res?.card?.card?.info}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
  