import {IsSorting} from "./Types";

export function generateNewArray(arrayLength: number){
    let newArr = []
    for(let i = 0; i < arrayLength; i++){
        newArr.push(Math.floor(Math.random()*100)+1)
    }
    return newArr
}

export function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

export function delay(ms: number) {
    return new Promise(async (resolve) => setTimeout(resolve, ms));
}

export function isSortActive(isSorting: IsSorting){
    return isSorting.mergeSort || isSorting.insertionSort || isSorting.selectionSort || isSorting.bubbleSort || isSorting.quickSort
}
