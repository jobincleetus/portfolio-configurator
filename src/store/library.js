import { createSlice } from '@reduxjs/toolkit'

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    primaryContent: {
      title: null,
      description: null,
      image: null,
      name: null,
      email: null
    },
    content: [
      {
        name: 'About',
        title: '📌  Add About you',
        value: null
      },
      {
        name: 'Skillsets',
        title: '💡  Add Skillsets',
        value: null
      },
      {
        name: 'Projects',
        title: '🛠️  Add Projects',
        value: null
      },
      {
        name: 'Experience',
        title: '🌐  Add Experience',
        value: null
      },
      {
        name: 'Blogs',
        title: '💭  Add Blogs',
        value: null
      },
      {
        name: 'Connect',
        title: '🔗  Add CTA',
        value: null
      }
    ],
    componentOrder: [],
    isContentBeingEdited: false
  },
  reducers: {
    setPrimaryContent: (state, action) => {
      if(action.payload.image) {
        state.primaryContent.image = action.payload.image
      }
      state.primaryContent = {
        ...state.primaryContent,
        ...action.payload
      }
    },
    setContent: (state, action) => {
      const { contentName, fieldData } = action.payload;
      const contentItem = state.content.find(item => item.name === contentName);

      if (contentItem) {
        contentItem.value = fieldData;
      }
    },
    toggleIsContentBeingEdited: (state, action) => {
      state.isContentBeingEdited = action.payload
    },
    setComponentOrder: (state, action) => {
      if(action.payload) {
        state.componentOrder = action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPrimaryContent, setContent, toggleIsContentBeingEdited, setComponentOrder } = librarySlice.actions

export default librarySlice.reducer