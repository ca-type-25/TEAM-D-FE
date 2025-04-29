import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage/HomePage"
import TripsPage from "./pages/trips/TripsPage"
import TripsItem from "./pages/trips/TripsItem"
import CreateTrip from "./pages/trips/CreateTrip"
import EditTrip from "./pages/trips/EditTrip"
import PageNavigator from "./components/pagenavigator/PageNavigator"
import DestinationsPage from "./pages/destinations/DestinationsPage"
import DestinationItem from "./pages/destinations/DestinationsItem"
import CreateDestination from "./pages/destinations/CreateDestination"
import EditDestination from "./pages/destinations/EditDestination"
import ActivitiesPage from "./pages/activities/ActivitiesPage"
import ActivitiesItem from "./pages/activities/ActivitiesItem"
import CreateActivity from "./pages/activities/CreateActivity"
import EditActivity from "./pages/activities/EditActivity"
import ReviewsPage from "./pages/reviews/ReviewsPage"
import ReviewsItem from "./pages/reviews/ReviewsItem"
import CreateReview from "./pages/reviews/CreateReview"
import EditReview from "./pages/reviews/EditReview"
import ProfilePage from "./pages/profile/ProfilePage"
import LoginPage from "./pages/login/LoginPage"
import RegisterPage from "./pages/register/RegisterPage"
import MyTrips from "./pages/trips/MyTrips"
import PrivateRoute from "./components/privateRoute/PrivateRoute"

function App() {

  return (
    <>
      <BrowserRouter>
       <PageNavigator />
        <Routes>

          <Route index element={<HomePage />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="register" element={<RegisterPage />}/> 

          <Route path="trips" element={<TripsPage />} />
          <Route path="trips/:id" element={<TripsItem />} />

          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:id" element={<DestinationItem />} />

          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="activities/:id" element={<ActivitiesItem />} />

          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="reviews/:id" element={<ReviewsItem />} />


          <Route element={<PrivateRoute />}>
            <Route path="user-profile" element={<ProfilePage />} />
            <Route path="my-trips" element={<MyTrips />} />

            <Route path="create-trip" element={<CreateTrip />} />
            <Route path="edit-trip/:id" element={<EditTrip />} />

            <Route path="create-destination" element={<CreateDestination />} />
            <Route path="edit-destination" element={<EditDestination />} />

            <Route path="create-activity" element={<CreateActivity />} />
            <Route path="edit-activity/:id" element={<EditActivity />} />
            
            <Route path="create-review" element={<CreateReview />} />
            <Route path="edit-review" element={<EditReview />} />
          </Route>
          

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
