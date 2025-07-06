import RestaurantCard from "./RestaurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <div>
        <h1>
          Its looks like you are offline..Please Check your Internet Connection
        </h1>
      </div>
    );
  }

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
              const filteredRestaurants = listOfRestauarants.filter((res) =>
                res?.card?.card?.info?.name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            console.log("Button Clicked");
            const filteredList = listOfRestauarants.filter(
              (res) => res.card?.card?.info?.avgRating > 4.0
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((res) => {
          return (
            <Link
              key={res?.card?.card?.info?.id}
              to={"restaurants/" + res?.card?.card?.info?.id}
            >
              <RestaurantCard resData={res?.card?.card?.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
