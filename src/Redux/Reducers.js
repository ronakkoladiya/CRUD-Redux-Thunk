import {combineReducers} from "redux";

const initialState = {
    allData: [],
};

const handleData = (state = initialState, action) => {
    switch(action.type){
        case 'submitAllData' :
            return {
                ...state,
                allData: [...state.allData, action.payload],
            };

        case 'updateAllData' :
            return {
                ...state,
                allData: action.payload,
            };

        case 'deleteUser' :
            return {
                ...state,
                allData: state.allData.filter((data,index) => index !== action.payload),
            };

        case 'deleteAll' :
            return {
                ...state,
                allData: [],
            };

        default:
            return state;
    }
};

const reducers = combineReducers({
    counter: handleData,
});

export default reducers;