import { createSlice } from "@reduxjs/toolkit";
import { deleteListItem } from "../helpers/deleteListItem";

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        itemsCount: 0,
        itemsTotalPrice: 350,
        isWithOrder: true,
        contactData: null,
        wishes: null
    },
    reducers: {
        addItem(state, action) {

            const hasItem = state.items.find(item => item.id === action.payload.id)

            if (hasItem === undefined) {
                // creating new card

                state.items.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    diameter: action.payload.diameter,
                    length: action.payload.length,
                    count: action.payload.count,
                    price: action.payload.price,
                    weight: action.payload.weight
                })

                state.itemsTotalPrice += parseInt(action.payload.price, 10)
                state.itemsCount += 1
                
            } else {
                // changing exist card

                for (let i = 0; i < state.items.length; i++) {
                    if (state.items[i].id === action.payload.id) {

                        let newPrice = action.payload.price

                        if (state.items[i].price !== action.payload.price) {
                            newPrice = action.payload.price - state.items[i].price
                            state.items[i].price = action.payload.price
                            state.itemsTotalPrice += newPrice
                        } else {
                            state.items[i].title = action.payload.title
                            state.items[i].diameter = action.payload.diameter
                            state.items[i].length = action.payload.length
                            state.items[i].count = action.payload.count
                            state.items[i].price = newPrice
                            state.items[i].weight = action.payload.weight
                        }
                    }
                }
            }
        },

        addWithOrder(state, action) {
            if (action.payload.status === true) {
                state.itemsTotalPrice -= 350
                state.isWithOrder = false
            }
        },

        removeWithOrder(state, action) {
            if (action.payload.status === false) {
                state.itemsTotalPrice += 350
                state.isWithOrder = true
            }
        },

        removeItem(state, action) {
            const removedItem = state.items.find(item => item.id === action.payload.id)

            if (removedItem === undefined) {
                const {id, productItems, setProductItems} = action.payload
                deleteListItem(id, productItems, setProductItems)

            } else {
                state.itemsTotalPrice -= parseInt(removedItem.price, 10)
                state.itemsCount -= 1

                for (let i = 0; i < state.items.length; i++) {
                    if (state.items[i].id === action.payload.id) {
                        state.items = state.items.filter(n => n.id !== action.payload.id);
                    }
                }
            }
        
            
        },

        removeAllItems(state, action) {
            if (action.payload.status === true) {
                state.items = []
                state.itemsTotalPrice = action.payload.isWithOrder === true ? 350 : 0
                state.itemsCount = 0
            }
        },

        changeContactData(state, action) {
            state.contactData = action.payload.contactData
        },

        changeWishes(state, action) {
            state.wishes = action.payload.wishes
        },

        addTotalPriceCount(state, action) {
            console.log(1)
            state.itemsTotalPrice += parseInt(action.payload.price, 10)
        },

        removeTotalPriceCount(state, action) {
            state.itemsTotalPrice -= parseInt(action.payload.price, 10)
        },

        addItemsCount(state, action) {
            state.itemsCount += action.payload.count
        },

        removeItemsCount(state, action) {
            state.itemsCount -= action.payload.count
        }
        
    }
})

export const { 
    addItem, 
    removeItem, 
    addWithOrder, 
    removeWithOrder, 
    removeAllItems, 
    changeContactData, 
    changeWishes, 
    addTotalPriceCount, 
    removeTotalPriceCount, 
    addItemsCount, 
    removeItemsCount,
    
} = basketSlice.actions

export default basketSlice.reducer