import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import { MainProps } from "./data/typings";
import NavBar from "./components/NavBar";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        const data = await fetchData();
        setMainData(data);
      } catch (error) {
        throw error;
      }
    }
    fetchAllData();
  }, []);

  return (
    <div className="flex gap-x-4 h-[200vh]">
      <Router>
        <NavBar mainData={mainData} />
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}
