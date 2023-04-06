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
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getTodos} from './redux/categoriesSlice';

function CustomDrawerContent(props) {
  // const dispatch = useDispatch();
  const [search, setSearch] = useState('en');
  const [French, setfrench] = useState('fr');

  const [lanclick, setclick] = useState(true);
  const [lanswitch, setswitch] = useState(false);
  const component = search => {
    setclick(true);
    setswitch(false);
    console.log('sss', search);
    props.navigation.navigate('Home', {name: 'en'});

    // dispatch(getTodos(search));
  };

  const Frenchcompoments = French => {
    setswitch(true);
    setclick(false);
    // <Home name={French} />;
    props.navigation.navigate('Home', {name: 'fr'});
    console.log('french', French);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="English"
        focused={lanclick}
        onPress={() => component(search)}
      />
      <DrawerItem
        label="French"
        focused={lanswitch}
        onPress={() => Frenchcompoments(French)}
      />
    </DrawerContentScrollView>
  );
}

const App = () => {
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
