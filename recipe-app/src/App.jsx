import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Create from './pages/create'
function Home() {
  return <h1>Home Page</h1>;
}

// function Create() {
//   return <h1>About Page</h1>;
// }

function Calculate() {
  return <h1>Calculate Page</h1>;
}

function App() {

  return (
    <BrowserRouter>
    <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create</Link> |{" "}
        <Link to="/calculate">Calculate</Link>
      </nav>
    <Routes>

    
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/calculate" element={<Calculate />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
