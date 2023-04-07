import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

let RNFS = require('react-native-fs');

export const getTodos = createAsyncThunk('todoList/getTodos', async key => {
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
  // // await AsyncStorage.clear();
  switch (key) {
    case 'en':
      const value = await AsyncStorage.getItem('en');

      if (value !== null) {
        json = JSON.parse(value);
      } else {
        await RNFS.readFileAssets('data/en/en.json', 'utf8') // 'base64' for binary
          .then(async res => {
            await AsyncStorage.setItem('en', res);
            json = JSON.parse(res);
          })
          .catch(err => {
            console.log('ssssssssssss', err.message, err.code);
          });
      }
      break;

    case 'fr':
      const value1 = await AsyncStorage.getItem('fr');
      if (value1 !== null) {
        json = JSON.parse(value1);
      } else {
        await RNFS.readFileAssets('data/fr/fr.json', 'utf8') // 'base64' for binary
          .then(async res => {
            await AsyncStorage.setItem('fr', res);
            json = JSON.parse(res);
          })
          .catch(err => {
            console.log('sssssssssssss', err.message, err.code);
          });
      }
      break;
    default:
      await RNFS.readFileAssets('data/en/en.json', 'utf8') // 'base64' for binary
        .then(async res => {
          await AsyncStorage.setItem('fr', res);
          json = JSON.parse(res);
        })
        .catch(err => {
          console.log('sssssssssssss', err.message, err.code);
        });
      // json = en;
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
      state.todos = action.payload;
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
