import { createSlice } from '@reduxjs/toolkit'

// Se divide en dos partes: iniciales y reducers.
export const crudSlice = createSlice({
  name: 'crud',
  initialState: {
    // Valores iniciales, y si cambian de valor ejecutan código automáticamente
    formElement: {
      endPoint: null,
      data: null
    },
    tableEndpoint: null
  },
  reducers: {
    showFormElement: (state, action) => {
      state.formElement = action.payload
    },
    refreshTable: (state, action) => {
      state.tableEndpoint = action.payload
    }
  }
})

export const {
  showFormElement,
  refreshTable
} = crudSlice.actions

export default crudSlice.reducer
