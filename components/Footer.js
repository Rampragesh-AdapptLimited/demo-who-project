import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          style={styles.tinyLogo}
          source={require('../images/align-left.png')}
        />
      </TouchableOpacity>
      <Image style={styles.tinyLogo} source={require('../images/home.png')} />
      <Image
        style={styles.tinyLogo}
        source={require('../images/restore.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 35,
    height: 35,
  },
});

export default Footer;
