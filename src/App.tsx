import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/homepage/HomePage"
import TripsPage from "./components/trips/TripsPage"
import TripsItem from "./components/trips/TripsItem"
import CreateTrip from "./components/trips/CreateTrip"
import EditTrip from "./components/trips/EditTrip"
import PageNavigator from "./components/pagenavigator/PageNavigator"

function App() {

  return (
    <>
      <BrowserRouter>
       <PageNavigator />
        <Routes>

          <Route index element={<HomePage />}/>

          <Route path="trips" element={<TripsPage />} />
          <Route path="trips/:id" element={<TripsItem />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="edit-trip" element={<EditTrip />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
