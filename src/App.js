import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const APP_ID = '29e316d0';
  const APP_KEY = 'f6818b001a14b221b6b62b2b22bfa420';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() =>{
    getRecipes();
  },[query]);


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit = {getSearch} className = "search-form">
        <input 
            className = "search-input" 
            type = 'text' value = {search}
            onChange = {updateSearch}
        />
        <button className = "search-button" type = 'submit'>
          Search
        </button>
      </form>
      <div className = 'recipe'>
      {recipes.map(recipe => (
        <Recipe
          key = {recipe.recipe.label}
          title = {recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image  = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
      ))}
    </div>
    </div>
  );
}

export default App;
