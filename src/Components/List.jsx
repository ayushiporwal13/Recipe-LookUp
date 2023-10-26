import PropTypes from 'prop-types';
import { useState } from 'react';
import './List.css'
import { BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';

const List = ({ recipes, healthScore, dish, diet, handleChange, handleSubmit }) => {
    const COLORS = ['#fc7b03', '#2b5e53', '#4d8fc9', '#975dd9', '#d95dae', '#d95d63'];
    const [toggleBar, setToggleBar] = useState(false);

    return (
        <>
            <div className='list'>
                <div className='filters'>
                    <form>
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
                        <button type='submit' onClick={handleSubmit} className='search-btn'>Search</button>
                    </form>
                </div>
                <div className='table'>
                    <table>
                        <thead style={{ fontWeight: 'bold' }}>
                            <td>Title</td>
                            <td>Images</td>
                            <td>Health Score</td>
                            {/* <td>Summary</td> */}
                        </thead>
                        {recipes && recipes.map((recipe) => (
                            <tbody key={recipe.id} >
                                <Link to={`/RecipeView/${recipe.id}`} key={recipe.id} title='Click Me'>
                                    <td><a href={recipe.sourceUrl} target='_blank' rel="noreferrer">{recipe.title}</a></td>
                                </Link>
                                <td><img src={recipe.image} /></td>
                                <td>{recipe.healthScore}</td>
                                {/* <td dangerouslySetInnerHTML={{ __html: recipe.summary }}></td> */}
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <div className='charts'>
                {toggleBar ?
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={recipes}
                            margin={{
                                top: 20,
                                right: 15,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" offset={10} />
                            <YAxis />
                            <Tooltip contentStyle={{ background: '#937b07' }} />
                            <Legend />
                            <Bar dataKey="weightWatcherSmartPoints" fill={COLORS[Math.floor(Math.random() * COLORS.length)]} activeBar={<Rectangle fill="pink" stroke="red" />} />
                            {/* <Bar dataKey="dishTypes" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            data={recipes}
                            margin={{
                                top: 30,
                                right: 15,
                            }}>
                            <CartesianGrid strokeDasharray="3" />
                            <XAxis dataKey="title" />
                            <YAxis />
                            <Legend />
                            <Tooltip contentStyle={{ background: '#0084f8' }} />
                            <Area type="monotone" dataKey="healthScore" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="pricePerServing" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="readyInMinutes" stackId="1" stroke="#ff7c7c" fill="#ff7c7c" />
                        </AreaChart>
                    </ResponsiveContainer>
                }
                <button onClick={() => setToggleBar(!toggleBar)} className='toggle-chart-btn'>{toggleBar ? 'Toggle to Area Chart' : 'Toggle to Bar Chart'}</button>
                {/* <ResponsiveContainer width="100%" height={400}>
                    <Treemap data={recipes} dataKey="weightWatcherSmartPoints" aspectRatio={4 / 3} stroke="#fff" fill={COLORS[Math.floor(Math.random() * COLORS.length)]}>
                        <Legend />
                        <LabelList dataKey="title" position="top" />
                        <Tooltip contentStyle={{ background: '#0084f8' }} />
                    </Treemap>
                </ResponsiveContainer> */}
                {/* <ResponsiveContainer width="100%" height={400}>
                    <LineChart 
                    data={recipes} 
                    margin={{
                        top: 20,
                        right: 15,
                    }}>
                        <CartesianGrid strokeDasharray="3" />
                        <Line type="monotone" dataKey="healthScore" stroke="green" />
                        <XAxis dataKey="title" />
                        <YAxis dataKey="healthScore" />
                        <Legend />
                        <Tooltip contentStyle={{ background: '#937b07' }} />
                    </LineChart>
                </ResponsiveContainer> */}
            </div>
        </>
    );
};

List.propTypes = {
    recipes: PropTypes.array.isRequired,
    healthScore: PropTypes.number.isRequired,
    dish: PropTypes.string.isRequired,
    diet: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default List;
