import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core'
import Head from 'next/head'
import { useState,useEffect } from 'react'
import styled from "styled-components"
import Infobox from "../components/Infobox"
import Map from "../components/Map"
import Table from "../components/Table"
import {sortData} from "../components/util"
import LineGraph from "../components/LineGraph"

export default function Home() {
  const [countries, setCountries] =useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
 
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
    })
  },[])

  useEffect(()=>{
    const getCountries = async() =>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name:country.country,
          value: country.countryInfo.iso2
        }));

      const sortedData = sortData(data)
      setTableData(sortedData);
      setCountries(countries);
      })
      
    };
    getCountries()
  },[])

  const onCountryChange = async(event) =>{
    const countryCode = event.target.value;

    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all': `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })
    
  }


  return (
    <div>
      <Head>
        <title>Covid Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <AppLeft>      
          <Header>
            <h1>Buildin the Covid App</h1>
            <FormControl>
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map(country=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Header>
            <Appstats>
              <Infobox title="Corona Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
              <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
              <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
            </Appstats>
            <Map/>
        </AppLeft>
        <AppRight>
          <Card>
            <CardContent>
                  <h3>Live Cases By Country</h3>
                  <Table countries={tableData}/>
                  <h3>Worldwide New Cases</h3>
                  <LineGraph/>
            </CardContent>
          </Card>
        </AppRight>
      </Container>
    </div>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`
const Appstats = styled.div`
  display: flex;
  justify-content: space-between;
`
const AppLeft = styled.div`
  flex: 0.9;
` 
const AppRight = styled(Card)``
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  @media(max-width: 990px){
    flex-direction: column;
  }
`