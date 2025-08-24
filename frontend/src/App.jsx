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
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
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
