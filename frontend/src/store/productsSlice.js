import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
    },
    reducers: {
        addToProductBasket(state, action) {
            state.items.push({
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price,
                material: action.payload.material,
                length: action.payload.length,
                diameter: action.payload.diameter,
                count: action.payload.count
            })
        },

        removeProductBasket(state, action) {
            const removedItem = state.items.find(item => item.id === action.payload.id)

            if (removedItem) {
                for (let i = 0; i < state.items.length; i++) {
                    if (state.items[i].id === action.payload.id) {
                        state.items = state.items.filter(n => n.id !== action.payload.id);
                    }
                }
            }
        },

        addProductCount(state, action) {
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.payload.id) {
                    state.items[i].count += 1
                }
            }
        },

        removeProductCount(state, action) {
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.payload.id) {
                    console.log(state.items[i].count)
                    if (state.items[i].count - 1 === 0) {
                        state.items = state.items.filter(n => n.id !== action.payload.id);
                    } else {
                        state.items[i].count -= 1
                    }
                }
            }
        },

        removeAllProductItemsFromStore(state, action) {
            if (action.payload.status === true) {
                state.items = []
            }
        }
    }
})


export const { addToProductBasket, removeProductBasket, addProductCount, removeProductCount, removeAllProductItemsFromStore } = productsSlice.actions

export default productsSlice.reducer