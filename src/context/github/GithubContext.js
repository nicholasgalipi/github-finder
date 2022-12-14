import { createContext,useReducer } from "react";
import GithubReducer from "./GuthubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const GithubProvider = ({children}) => {
    const initialState ={
        users: [],
        loading: false
    }


    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //get initial users (for testing puposes) 
    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })

        const data = await response.json()

        
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    //SET LOADING
    const setLoading = () => dispatch({type: 'SET_LOADING'})


    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext;