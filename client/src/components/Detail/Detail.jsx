import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const URL_BASE = "http://localhost:3001/countries/name/";


const Detail = ()=>{

    const {name} = useParams();

    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`${URL_BASE}/${name}`)
        .then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [name]);

    return(
        <div>
            <img src={character.image && character.image} alt="" />
            <h1>Name: "{character.name && character.name}"</h1>
            <h1>flagImage: "{character.flagImage && character.flagImage}"</h1>
            <h1>continent: "{character.continent && character.continent}"</h1>
            <h1>capital: "{character.capital && character.capital}"</h1>
            <h1>subregion: "{character.subregion?.name && character.subregion?.name}"</h1>
            <h1>area: "{character.area && character.area}"</h1>
            <h1>population: "{character.population && character.population}"</h1>
        </div>
    )
};
|
export default Detail;