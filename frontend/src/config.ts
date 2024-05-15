import { atom } from "recoil";


export const pageState = atom({
    key: 'pageState',
    default: 'home'
})

export const dataState = atom({
    key: 'dataState',
    default: []
})