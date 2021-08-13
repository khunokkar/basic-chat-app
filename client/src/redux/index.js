import {createStore, combineReducers} from "redux"
import userReducer from "./user"
import usersReducer from "./users"

const rootReducer = combineReducers({
  user : userReducer,
  users : usersReducer
})

const store = createStore(rootReducer)

export default store