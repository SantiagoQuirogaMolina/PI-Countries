import "./home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByName, getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import SearchBar from "../../components/SearchBar/SearchBar";

function home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  const [searchString, setSearchString]= useState("")

function handleChange(e){
  e.preventDefault();
  setSearchString(e.target.value);
}
function handleSubmit(e){
  e.preventDefault();
  dispatch(getCountriesByName(searchString))
}

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="home">
      <p>Bienvenidos</p>
      <SearchBar  handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Cards allCountries={allCountries} />
    </div>
  );
}

export default home;
