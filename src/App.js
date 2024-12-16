import "./styles.css";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RandomChoice } from "./pages/RandomChoice";
import { PersonalizedRecommendation } from "./pages/PersonalizedRecommendation";
import { MoodBasedRecommendation } from "./pages/MoodBasedRecommendation";
import { FullList } from "./pages/FullList";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ItemDetails } from "./pages/FullList/itemDetails";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Navigate to="/filmes" />} />

        <Route element={<Layout />}>
          <Route
            path="/:mood"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mood/aleatorio"
            element={
              <ProtectedRoute>
                <RandomChoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mood/personalizado"
            element={
              <ProtectedRoute>
                <PersonalizedRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mood/humor"
            element={
              <ProtectedRoute>
                <MoodBasedRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mood/lista"
            element={
              <ProtectedRoute>
                <FullList />
              </ProtectedRoute>
            }
          />
          <Route
              path="/:mood/lista/:itemId"
              element={
                <ProtectedRoute>
                  <ItemDetails />
                </ProtectedRoute>
              }
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
