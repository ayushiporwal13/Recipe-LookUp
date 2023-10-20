import React from 'react';
import './List.css'

const List = ({ recipes, healthScore, dish, diet, handleChange, handleSubmit }) => {



    return (
        <div className='list'>
            <form className='filters'>
                <div className='search'>
                <h4>Feeling Hungry?</h4>
                    <input
                        type='search'
                        placeholder='Search for a recipe'
                        value={dish}
                        onChange={handleChange}
                    />
                </div>
                <div className='health-score'>
                    <h4>Health Score</h4>
                <input
                        id='healthScore'
                        type='range'
                        min="0" max="100"
                        value={healthScore}
                        onChange={handleChange}
                    />
                </div>
                <div className='diet-filter'>
                    <h4>Diet Restriction</h4>
                    <input
                        id='vegetarian'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('vegetarian')}
                    />
                    <label>Vegetarian</label>
                    <input
                        id='vegan'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('vegan')}
                    />
                    <label>Vegan</label>
                    <input
                        id='gluten free'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('gluten free')}
                    />
                    <label>Gluten Free</label>
                    <input
                        id='dairy free'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('dairy free')}
                    />
                    <label>Dairy Free</label>
                    <input
                        id='pescetarian'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('pescetarian')}
                    />
                    <label>Pescetarian</label>
                    <input
                        id='ketogenic'
                        type="checkbox"
                        onChange={handleChange}
                        checked={diet.includes('ketogenic')}
                    />
                    <label>Ketogenic</label>
                </div>

                {/* Restriction diets - vegan/vegeterian/gluten free */}
                <button type='submit' onClick={handleSubmit} className='search-btn'>Search</button>
            </form>
            <ul className='heading'>
                <li>Title</li>
                <li>Images</li>
                <li>Health Score</li>
                <li>Summary</li>
            </ul>
            {recipes && recipes.map((recipe) => (
                <ul key={recipe.id} className='list-data'>
                    <li><a href={recipe.sourceUrl} target='_blank'>{recipe.title}</a></li>
                    <li><img src={recipe.image} /></li>
                    <li>{recipe.healthScore}</li>
                    <li dangerouslySetInnerHTML={{ __html: recipe.summary }}></li>
                </ul>
            ))}
        </div>
    );
};

export default List;
