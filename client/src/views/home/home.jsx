import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../Redux/action";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";

function home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="home">
      <p>Bienvenidos</p>
      <Navbar />
      <Cards allCountries={allCountries} />
    </div>
  );
}

export default home;
