import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StoryLoader from "./components/StoryLoader"
import StoryGenerator from "./components/StoryGenerator.jsx"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Gallery from "./pages/Gallery"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <header className="fade-in">
          <h1>AI Story Forge</h1>
          <p className="header-subtitle">Create immersive interactive stories powered by AI</p>
        </header>
        <main>
          <Routes>
            <Route path={"/story/:id"} element={<StoryLoader />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/gallery"} element={<Gallery />} />
            <Route path={"/"} element={<StoryGenerator />}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
