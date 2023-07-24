import {ActionType, SortState} from "./redux-types";
import {generateNewArray} from "../Utils";

const initialState: SortState = {
    array: generateNewArray(50),
    isSorting: {insertionSort: false, mergeSort: false, selectionSort: false, bubbleSort: false, quickSort: false},
    compare: {val1: -1, val2: -1},
    sortedIndex: -1,
    arrayLength: 50,
}

export const sortReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_ARRAY':
            return { ...state, array: action.payload };
        case 'SET_IS_SORTING':
            return { ...state, isSorting: action.payload };
        case 'SET_COMPARE':
            return { ...state, compare: action.payload };
        case 'SET_SORTED_INDEX':
            return { ...state, sortedIndex: action.payload };
        case 'SET_ARRAY_LENGTH':
            return { ...state, arrayLength: action.payload };
        default:
            return state;
    }
}
