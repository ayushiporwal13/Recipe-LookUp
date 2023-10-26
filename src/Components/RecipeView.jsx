import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

export const RecipeView = () => {
    let params = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const getRecipeDetails = async () => {
            const analyzeRecipeQuery = `https://api.spoonacular.com/recipes/${params.id}/analyzedInstructions?apiKey=${API_KEY}`;
            const summarizeRecipeQuery = `https://api.spoonacular.com/recipes/${params.id}/summary?apiKey=${API_KEY}`;

            const analyzeRecipe = await fetch(analyzeRecipeQuery);
            const summarrizeRecipe = await fetch(summarizeRecipeQuery);
            const analyzeRecipejson = await analyzeRecipe.json();
            const summarizeRecipejson = await summarrizeRecipe.json();

            setRecipeDetails({ "analyze": analyzeRecipejson[0].steps, "summary": summarizeRecipejson });
        }
        getRecipeDetails().catch(console.error);
    }, [params.id]);


    return (
        <div className='recipe-view'>
            <h1>Recipe Detail</h1>
            <table style={{textAlign : 'left'}}>
                <thead style={{ fontWeight: 'bold' }}>
                    <td>Title</td>
                    <td>Summary</td>
                </thead>
                <tbody>

                    <td  style={{ fontWeight: 'bold' }}>{recipeDetails?.summary.title}</td>
                    <td dangerouslySetInnerHTML={{ __html: recipeDetails?.summary.summary }}></td>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            Instructions:
                        </td>
                    </tr>
                    {recipeDetails?.analyze.map((step) =>
                        <tr key={step.number}>
                            <td  style={{ fontWeight: 'bold' }}>Step {step.number}</td>
                            <td>{step.step}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


