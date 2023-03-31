/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from './components/Home';
import {Provider} from 'react-redux';
import store from './redux/configurationStore';
import {useTranslation} from 'react-i18next';
import {LogBox} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getTodos} from './redux/categoriesSlice';
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('en');
  const [French, setfrench] = useState('fr');
  const {i18n} = useTranslation();
  const component = search => {
    useEffect(() => {
      dispatch(getTodos('en'));
      // dispatch(getDataAsync());
      // setlist(data);;
    }, []);
    console.log('sss', search);
    i18n.changeLanguage(search);
  };

  const Frenchcompoments = French => {
    console.log('french', French);
    i18n.changeLanguage(French);
    dispatch(getTodos('fr'));
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <DrawerItem label="English" onPress={() => component(search)} />
      <DrawerItem label="French" onPress={() => Frenchcompoments(French)} />
    </DrawerContentScrollView>
  );
}

const App = () => {
  LogBox.ignoreLogs(['Remote debugger']);
  const Drawer = createDrawerNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
