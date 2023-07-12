import {ActionType, SortState} from "./redux-types";
import {generateNewArray} from "../Utils";

const initialState: SortState = {
    array: generateNewArray(50),
    isSorting: {insertionSort: false, mergeSort: false, selectionSort: false, bubbleSort: false, quickSort: false},
    compare: {index: -1, key: -1},
    sortedIndexes: [],
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
        case 'SET_SORTED_INDEXES':
            return { ...state, sortedIndexes: action.payload };
        case 'SET_ARRAY_LENGTH':
            return { ...state, arrayLength: action.payload };
        default:
            return state;
    }
}
