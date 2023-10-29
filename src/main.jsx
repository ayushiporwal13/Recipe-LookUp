import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailView from '../routes/DetailsView.jsx';
import Layout from '../routes/Layout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='/RecipeView/:id' element={<DetailView />} />
        <Route index={true} element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
