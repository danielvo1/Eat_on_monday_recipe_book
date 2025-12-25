import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Create from './pages/create'
import RecipeBook from './pages/recipebook'
import Home from './pages/home'
import RecipeDetail from './pages/recipedetail'

function App() {

  return (
    <BrowserRouter>
    <nav id='navbar'>
        <Link className='navbar-link' to="/">Home</Link>
        <Link className='navbar-link' to="/create">Create</Link>
        <Link className='navbar-link' to="/recipebook">Recipe Book</Link>
      </nav>
    <Routes>

    
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/recipebook" element={<RecipeBook />} />
      <Route path="/recipe/:recipeName" element={<RecipeDetail />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
