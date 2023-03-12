import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoApiOptions } from "../../api";
import CurrentWeather from "../current-weather/current-weather";


const Search = ({ onSearchChnage }) => {

    const [Search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApiOptions
        )
            .then((response) => response.json())
            .then((response) =>{
                return{
                    options: response.data.map((city)=>{
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                        
                    })
                }
            } )
    };

    const handleonChange = (searchData) => {
        setSearch(searchData);
        onSearchChnage(searchData);
    };


    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={700}
            value={Search}
            onChange={handleonChange}
            loadOptions={loadOptions}
        />
    );

};

export default Search;