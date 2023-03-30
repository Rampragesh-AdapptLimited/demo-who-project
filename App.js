import React from 'react';
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

function CustomDrawerContent(props) {
  const component = () => {
    console.log('s');
  };

  const French = () => {
    console.log('french');
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
      <DrawerItem label="English" onPress={() => component()} />
      <DrawerItem label="French" onPress={() => French()} />
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
          // drawerContent={props => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
