import React, { useEffect ,  useState ,createContext } from 'react'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Layout from '../layout/Layout'
import {Home,Books,Recipes, UserProfile,LoginForm,SignupForm} from '../components/index';
import { RecipesDetail ,RecipeLayout} from '../components/Recipes/index' 
// import { ThemeContextProvider } from '../../themeChanger/src/context/themeContext';
export const ThemeModeContext = createContext();

function App() {
  const [themeMode,setThemeMode] = useState("light")
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },{
          path:'/books',
          element:<Books/>
        },
        {
          path:'/recipes',
          element:<RecipeLayout/>,
          children:[
            {
              path:'all',
              element:<Recipes/>
            },
              {
                path:'search/:value',
                element:<Recipes/>
              },
              {
                path:'detail/:id',
                element:<RecipesDetail/>
              }
          ]},{
          path:'/start',
          element:<>under process</>
        }
        ,{
          path:'/profile',
          element:<UserProfile/>
        }
        ,{
          path:'/login',
          element:<LoginForm/>
        },
        ,{
          path:'/signup',
          element:<SignupForm/>
        },
      ]
    }
  ])
  return (
       <ThemeModeContext.Provider value={{ themeMode: themeMode , setThemeMode:setThemeMode}}>
         <RouterProvider router={router}/>
       </ThemeModeContext.Provider>
  )
}

export default App
