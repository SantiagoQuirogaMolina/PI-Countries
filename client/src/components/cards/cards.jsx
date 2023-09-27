import Card from "../card/card";
import style from "../cards/cards.module.css";

function Cards ({allCountries}) {
console.log(allCountries);
    const CountriesList = allCountries;

    return (
        <div className={style.div}>
        {CountriesList?.map(country=> <Card key={country.id} country={country}/>)}
        </div>
    )
}
export default Cards;