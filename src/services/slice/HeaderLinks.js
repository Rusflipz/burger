import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

export const initialState = {
    constructorLinkValue: 'secondary',
    feedLinkValue: 'secondary',
    profileLinkValue: 'secondary',
}

export const headerLinksSlice = createSlice({
    name: 'headerLinks',
    initialState,
    reducers: {
        constructorLinkActive: (state) => {
            state.constructorLinkValue = 'primary'
        },
        feedLinkActive: (state) => {
            state.feedLinkValue = 'primary'
        },
        profileLinkActive: (state) => {
            state.profileLinkValue = 'primary'
        },
        constructorLinkNotActive: (state) => {
            state.constructorLinkValue = 'secondary'
        },
        feedLinkNotActive: (state) => {
            state.feedLinkValue = 'secondary'
        },
        profileLinkNotActive: (state) => {
            state.profileLinkValue = 'secondary'
        },
    }
})


export const {
    constructorLinkActive, feedLinkActive, profileLinkActive,
    constructorLinkNotActive, feedLinkNotActive, profileLinkNotActive

} = headerLinksSlice.actions

export const headerLinksSelector = state => state.headerLinks

export default headerLinksSlice.reducer