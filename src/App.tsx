import { Container, Grid } from "@mui/material"
import CountryList from "./components/CountryList"
import FilterZone from "./components/filters/FilterZone"

function App() {

  return (
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
  )
}

export default App
