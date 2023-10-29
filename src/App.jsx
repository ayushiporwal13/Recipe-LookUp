import { useState, useEffect, useCallback } from 'react'
import Cards from './Components/Cards.jsx'
import List from './Components/List.jsx'
import NavBar from './Components/NavBar.jsx'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css'
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [dish, setDish] = useState('');
  const [healthScore, setHealthScore] = useState(0);
  const [diet, setDiet] = useState([]);
  const [avgpricePerServing, setAvgpricePerServing] = useState(0);
  const [avghealthScore, setAvgHealthScore] = useState(0);
  const [dishTypes, setDishTypes] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
      },
      shape: {
        type: "square"
      },
      opacity: {
        value: 1
      },
      size: {
        value: { min: 1, max: 8 }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out"
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        },
        push: {
          quantity: 6
        }
      }
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Function to call the API
  const getRecipes = async () => {
    try {
      const query = `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&addRecipeInformation=true&apiKey=${API_KEY}&number=10${diet.length > 0 ? ('&diet=' + diet.join(", ")) : ''}`;

      const response = await fetch(query);
      const responsejson = await response.json();
      setRecipes(responsejson.results);
      getStats(responsejson.results);
      setDataLoaded(true); // Set dataLoaded to true after initial data load
      return responsejson.results;
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   //function to call api
  //   const getRecipes = async () => {
  //     // https://api.spoonacular.com/recipes/complexSearch?query=pizza&addRecipeInformation=true&apiKey=41ffe39aae98452498aedd8a065a3621&number=10&diet=vegetarian,gluten free

  //     const query = `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&addRecipeInformation=true&apiKey=${API_KEY}&number=20${diet.length > 0 ? ('&diet=' + diet.join(", ")) : ''}`

  //     // const response = await fetch(query);
  //     const responsejson = await response.json();
  //     setRecipes(responsejson.results);
  //     getStats(responsejson.results);
  //   }
  //   getRecipes().catch(console.error);
  // }, []);

  useEffect(() => {
    if (!dataLoaded) {
      getRecipes().catch(console.error);
    }
  }, [dataLoaded]);

  const getStats = (recipes) => {
    let avgpricePerServing = 0;
    let avghealthScore = 0;
    let dishTypes = [];
    if (recipes.length > 0) {
      // total = accumulator , recipe = current value
      avgpricePerServing = recipes.reduce((total, recipe) => total + recipe.pricePerServing, 0) / recipes.length;
      avghealthScore = recipes.reduce((total, recipe) => total + recipe.healthScore, 0) / recipes.length;

      recipes.map((recipe) => {
        recipe.dishTypes.map((dishType) => {
          if (!dishTypes.includes(dishType)) {
            dishTypes.push(dishType);
          }
        })
      })

      setAvgpricePerServing(avgpricePerServing);
      setAvgHealthScore(avghealthScore);
      setDishTypes(dishTypes);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipes = await getRecipes().catch(console.error);
    const filteredRecipes = recipes.filter(recipe => recipe.healthScore >= healthScore);
    setRecipes(filteredRecipes);
    getStats(filteredRecipes);
  }

  const handleChange = (event) => {
    if (event.target.id === 'healthScore') {
      setHealthScore(event.target.value);
    } else if (event.target.type === 'checkbox') {
      if (event.target.checked) {
        setDiet([...diet, event.target.id]);
      } else {
        setDiet(diet.filter(item => item !== event.target.id))
      }
    } else {
      setDish(event.target.value);
    }
  }

  return (
    <div className='app-main'>
      <Particles options={options} init={particlesInit} />
      <div className='app-row'>
        <Cards summary={avgpricePerServing} title={"Average Price Per Serving"}></Cards>
        <Cards summary={avghealthScore} title={"Average Health Score"}></Cards>
        <Cards summary={dishTypes} title={"Different Dish Types"}></Cards>
      </div>
      <div className='app-row'>
        <List
          recipes={recipes}
          healthScore={healthScore}
          dish={dish}
          diet={diet}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default App
