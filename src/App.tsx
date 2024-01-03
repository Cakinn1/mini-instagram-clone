import { useEffect, useState } from "react"
import { fetchData } from "./data/data"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./components/Landing"

export default function App() {
const [a, sa] = useState([])

  useEffect(() => {

    async function t () {
      const data = await fetchData()
      console.log(data.results)
      sa(data.results)
    }
    t()
  }, [])

  return (
<Router>
  <Routes>
    <Route path="/" element={<Landing />}/>
  </Routes>
</Router>
  )
}