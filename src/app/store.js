import { configureStore } from '@reduxjs/toolkit'
import newletterReducer from '../slicers/newletter/newsletterSlicer'
import { setupListeners } from '@reduxjs/toolkit/query'
import { getmoviesdetails } from '../slicers/service/getmoviedetails'
import authServiceReducer from '../slicers/service/auth/authService'
import messageReducer from '../slicers/message/messageSlicer'

export const store = configureStore({
    reducer: {
        newsletter: newletterReducer,
        auth : authServiceReducer,
        mssg : messageReducer,
        [getmoviesdetails.reducerPath]: getmoviesdetails.reducer,
    },
    middleware:
        (getdefaultMiddleware) =>
           getdefaultMiddleware()           
           .concat(getmoviesdetails.middleware)

                
                     
            

})

setupListeners(store.dispatch)