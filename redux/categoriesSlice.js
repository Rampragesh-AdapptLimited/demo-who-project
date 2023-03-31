// import {createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';

// export const InitialSlice = createSlice({
//   name: 'addredux',
//   initialState: {
//     data: employee,
//   },
//   reducers: {
//     adddata: (state, action) => {
//       state.data.push(action.payload);
//     },
//     getdata: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// export const getDataAsync = data => async dispatch => {
//   try {
//     // const response = await axios.get(`${employee}/${data}`);
//     // console.log(data);
//     // const response = employee;
//     console.log('dataaaaaaaaaaaaaaaaaaa', data);

//     dispatch(getdata(data));
//   } catch (err) {
//     console.log('err');
//     throw new Error(err);
//   }
// };

// // export const addDatasync = data => async dispatch => {
// //   try {
// //     console.log('true');
// //     const response = await axios.post(employee, data);
// //     console.log('responseaaas', response);
// //     dispatch(adddata(response.data));
// //   } catch (error) {
// //     console.log('err');
// //     throw new Error(err);
// //   }
// // };

// export const {adddata, getdata} = InitialSlice.actions;
// export const showData = state => state.addredux.data;

// export default InitialSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import en from '../android/app/src/main/assests/data/en/en.json';
import fr from '../android/app/src/main/assests/data/fr/fr.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define an asynchronous action creator that fetches data from the API

// Define a slice to manage the state of the API data

export const getTodos = createAsyncThunk('todoList/getTodos', async key => {
  console.log('key', key);
  // let response = [
  //   {
  //     name: 'Lab Laboratory Research',

  //     time: '07.43pm',

  //     date: '2023-3-27',

  //     tool: 'Laboratory',

  //     image: require('../images/lab.png'),
  //   },

  //   {
  //     name: 'D High Risk Result',

  //     time: '05.33pm',

  //     date: '2023-3-27',

  //     tool: 'Diagnostics',

  //     image: require('../images/diagnosis.png'),
  //   },

  //   {
  //     name: 'Field name 1',

  //     time: '06.43pm',

  //     date: '2023-3-27',

  //     tool: 'Field Works',

  //     image: require('../images/field.png'),
  //   },

  //   {
  //     name: 'Lab Very High Risk Result',

  //     time: '06.43pm',

  //     date: '2023-3-26',

  //     tool: 'Laboratory',

  //     image: require('../images/lab.png'),
  //   },

  //   {
  //     name: 'D Low Risk Result',

  //     time: '06.43pm',

  //     date: '2023-3-26',

  //     tool: 'Diagnostics',

  //     image: require('../images/diagnosis.png'),
  //   },

  //   {
  //     name: 'Field Very High Risk Result',

  //     time: '06.43pm',

  //     date: '2023-3-28',

  //     tool: 'Field Works',

  //     image: require('../images/field.png'),
  //   },

  //   {
  //     name: 'D Human Researach',

  //     time: '06.43pm',

  //     date: '2023-3-12',

  //     tool: 'Diagnostics',

  //     image: require('../images/diagnosis.png'),
  //   },

  //   {
  //     name: 'Lab Medium Risk Result',

  //     time: '06.43pm',

  //     date: '2023-3-12',

  //     tool: 'Laboratory',

  //     image: require('../images/lab.png'),
  //   },

  //   {
  //     name: 'Field High Risk Result',

  //     time: '06.43pm',

  //     date: '2023-3-29',

  //     tool: 'Field Works',

  //     image: require('../images/field.png'),
  //   },

  //   {
  //     name: 'D Poor Result',

  //     time: '06.43pm',

  //     date: '2023-3-29',

  //     tool: 'Diagnostics',

  //     image: require('../images/diagnosis.png'),
  //   },

  //   {
  //     name: 'Lab Good Result',

  //     time: '06.43pm',

  //     date: '2023-3-15',

  //     tool: 'Laboratory',

  //     image: require('../images/lab.png'),
  //   },

  //   {
  //     name: 'Lab Field Best Result',

  //     time: '06.43pm',

  //     date: '2023-3-12',

  //     tool: 'Laboratory',

  //     image: require('../images/lab.png'),
  //   },
  // ];
  // console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
  let json = '';
  switch (key) {
    case 'en':
      const value = await AsyncStorage.getItem('en');
      if (value !== null) {
        await AsyncStorage.setItem('en', json);
        json = value;
        // console.log('lanfuage', value);
      } else {
        json = en;
        // console.log('yyyyyyyyyyyyyyyyyyy', value);
      }
      break;

    case 'fr':
      const value1 = await AsyncStorage.getItem('fr');
      if (value1 !== null) {
        await AsyncStorage.setItem('fr', json);
        json = value1;
      } else {
        json = fr;
        console.log('qqqqqqqqqqqqqqqqq', json);
      }
      break;
    default:
      json = en;
      break;
  }

  return json;
});

const categoriesSlice = createSlice({
  name: 'todoList',
  initialState: {
    todos: [],
    status: null,
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      console.log('PPOPOPOPO', state, action);
      //If we have to totally replace the existing array:
      state.todos = action.payload;

      //if we want to add the json to an existing array
      // let updatedTodos = state.todos.concat(action.payload);
      // state.todos = updatedTodos;
      state.status = null;
    },
    [getTodos.pending]: state => {
      state.status = 'Fetching todos. Please wait a moment...';
    },
    [getTodos.rejected]: state => {
      state.status = 'Failed to fetch data...';
    },
  },
});

export default categoriesSlice.reducer;
