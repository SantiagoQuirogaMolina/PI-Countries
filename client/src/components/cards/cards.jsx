import Card from "../card/card";
import style from "../cards/cards.module.css";

function Cards ({allCountries}) {

    const CountriesList = allCountries;

    return (
        <div className={style.div}>
          {CountriesList?.map((country, index) => (
            <Card key={index} country={country} />
          ))}
        </div>
      );
    }
export default Cards;