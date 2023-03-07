import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../page/main";
const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
