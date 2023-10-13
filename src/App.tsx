import { Container, Grid } from "@mui/material"
import CountryList from "./components/CountryList"
import FilterZone from "./components/filters/FilterZone"
import { FilterContextProvider } from "./contexts/FilterContext"

function App() {

  return (
    <FilterContextProvider>
      <Container sx={{ padding: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <FilterZone />
          </Grid>
          <Grid item xs={9}>
            <CountryList />
          </Grid>
        </Grid>
      </Container >
    </FilterContextProvider>
  )
}

export default App
