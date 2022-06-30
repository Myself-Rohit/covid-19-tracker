
import { useEffect, useState } from "react";
import axios from "axios";
import InfoCard from "./InfoCard";
import Table from "./Table";
import { SortedData } from "./SortedData.js";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tabledata, setTabledata] = useState([]);
  const [flagUrl, setFlagUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1280px-International_Flag_of_Planet_Earth.svg.png");
  
 useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all")
      .then(response => response.data)
      .then(data => {
        setCountryInfo(data);
    })
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
     await axios.get("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.data)
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }));

          const sortByCases = SortedData(data)
          setTabledata(sortByCases);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [])
  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await axios.get(url)
      .then((response) => response.data)
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  }
  
  const iso2 = country

 useEffect(() => {
    if (iso2 === "worldwide") {
      setFlagUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/1280px-International_Flag_of_Planet_Earth.svg.png")
    } else{
      countries.filter((country) => iso2 === country.value ? setFlagUrl(country.flag) : "")
    }
 }, [country]
 )
  
  return (
    <>
      <img className="absolute shrink-0 w-screen -z-50 h-full" src="https://media.istockphoto.com/photos/infection-area-of-covid-virus-on-world-map-3d-illustration-picture-id1214183044?k=20&m=1214183044&s=612x612&w=0&h=XzZEDqbxWgC0adlNQtWK09JgO06tTeWRhYj-gTM_4tc=" />
       
      <div>
        <div className="sm:flex sm:justify-between p-5">
          <div className="sm:w-2/3 sm:mr-10">
            <div className="flex items-start justify-between">
              <h1 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-t from-gray-500 to-white">COVID-19-TRACKER</h1>
              <div className="flex items-center">
                <img className="object-cover  w-12 h-10 mr-2 shadow-md shadow-black" src={flagUrl} />
                <div>
                  <select onChange={onCountryChange} value={country}
                    className="bg-gray-200 z-20 p-3 outline-blue-700">
                      <option value="worldwide">worldwide</option>
                    {countries.map((country) => <option key={country.name} value={country.value}>
                      {country.name}
                      </option>)}
                    </select>
                </div>
              </div>
            </div>
       <div className="flex justify-between items-center my-10 flex-wrap">
              <InfoCard theme="text-blue-500" title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
              <InfoCard theme="text-green-500" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
              <InfoCard theme="text-red-500" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
            </div>
            
          </div>
          <div className="bg-white h-full p-4 pb-5 rounded-md shadow-lg shadow-black sm:-mx-0 sm:-mb-0 -mx-5 -mb-5">
            <h1 className="font-bold pb-2">Countries with cases</h1>
                <div className="pt-4 overflow-y-scroll h-96">
              <Table key={countryInfo._id} countries={tabledata} />
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default App