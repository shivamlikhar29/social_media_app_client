import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING, FETCH_POST, COMMENT} from '../constants/actionTypes'

const posts = (state={isLoading:true,posts:[]},action) =>{

    switch(action.type){
        case START_LOADING:
            return{
                ...state,
                isLoading:true
            }

        case END_LOADING:
            return{
              ...state,
            isLoading:false
             }

        case UPDATE:
           return {
            ...state, posts :state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)
        }

        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }

        case CREATE:
            return {
                ...state,posts:[...state,action.payload]
            }

        case DELETE:
            return {
                ...state,posts:state.posts.filter((post)=>post._id !== action.payload )
            }
    
        case LIKE:
            return {
                ...state,posts:state.posts.map((post)=> post._id === action.payload._id ? action.payload : post)
            }
        
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts:action.payload.data,
            }
            
        case FETCH_POST:
            return {
                ...state,
                post:action.payload,
            }
        
        case COMMENT:
            return {
                ...state,
                   posts:state.posts.map((post)=>{
                    if(post._id == action.payload._id) return action.payload

                    return post
                   })
             }

        default:
            return posts

    }
}

export default posts

