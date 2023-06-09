/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SwitchSelector from 'react-native-switch-selector';
import Footer from './Footer';
import {useSelector, useDispatch} from 'react-redux';
import {getTodos} from '../redux/categoriesSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Home = ({route, navigation}) => {
  let name = route?.params?.name;
  const value = route?.params?.value;
  name = name != undefined ? name : 'en';
  const dispatch = useDispatch();

  const {todos, status} = useSelector(state => state.todoList);
  const [list, setlist] = useState('All');
  const [image, setimage] = useState(0);
  const [dispatchData, setDispatchData] = useState([]);
  const [data, setData] = useState([]);

  const ListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Icon
          style={styles.arrow}
          name="md-arrow-back"
          color="#4F8EF7"
          size={30}
        />
        <Text style={styles.itemStyle}>
          {name == 'fr' ? 'Signet' : 'Bookmark'}
        </Text>
      </View>
    );
  };
  const options = [
    {label: 'All', value: 'All', image: require('../images/lab.png')},
    {
      label: 'Laboratory',
      value: 'Laboratory',
      image: require('../images/lab.png'),
    },
    {
      label: 'Diagnostics',
      value: 'Diagnostics',
      image: require('../images/diagnosis.png'),
    },
    {
      label: 'Field Works',
      value: 'Field Works',
      image: require('../images/field.png'),
    },
  ];
  const options1 = [
    {label: 'Alle', value: 'Alle', image: require('../images/lab.png')},
    {
      label: 'Laboratoire',
      value: 'Laboratoire',
      image: require('../images/lab.png'),
    },
    {
      label: 'Diagnostique',
      value: 'Diagnostique',
      image: require('../images/diagnosis.png'),
    },
    {
      label: 'Travaux de terrain',
      value: 'Travaux de terrain',
      image: require('../images/field.png'),
    },
  ];

  useEffect(() => {
    dispatchDatas();
  }, [name]);

  const dispatchDatas = async () => {
    switchRef.current.toggleItem(0);

    if (name == 'fr') {
      const res = await dispatch(getTodos('fr'));
      setDispatchData(res.payload);
      datasorting(res.payload);
      setlist('Alle');
    } else {
      const res = await dispatch(getTodos('en'));
      setDispatchData(res.payload);
      datasorting(res.payload);
      setlist('All');
    }
  };

  const datasorting = todos => {
    const todaydate = new Date();
    const todayformat = `${todaydate.getFullYear()}-${
      todaydate.getMonth() + 1
    }-${todaydate.getDate()}`;
    const yesterday = `${todaydate.getFullYear()}-${todaydate.getMonth() + 1}-${
      todaydate.getDate() - 1
    }`;
    const value = [
      {
        day: name == 'fr' ? "'aujourd'hui'" : 'today',
        data:
          todos !== null && todos !== undefined
            ? todos.filter(x => x.date == todaydate)
            : [],
      },
      {
        day: name == 'fr' ? 'hier' : 'yesterday',
        data:
          todos !== null && todos !== undefined
            ? todos.filter(x => x.date == yesterday)
            : [],
      },
      {
        day: name == 'fr' ? 'Précédent' : 'Previous',
        data:
          todos !== null && todos !== undefined
            ? todos.filter(x => x.date !== todayformat && x.date !== yesterday)
            : [],
      },
    ];
    setData(value);
  };
  const switchRef = useRef(null);

  const selector = value => {
    setlist(value);
    if (value == 'All' || value == 'Alle') {
      setimage(image);
      datasorting(dispatchData);
    } else {
      const filter = dispatchData.filter(item => {
        if (item.tool === value) {
          return item;
        }
      });
      datasorting(filter);
      console.log('filter', filter);
      if (name == 'fr') {
        const images = options1.findIndex(item => item.value == value);
        setimage(images);
      } else {
        const images = options.findIndex(item => item.value == value);
        setimage(images);
      }
    }
  };

  const getrender = item => {
    return (
      <>
        <View style={styles.item}>
          <View style={styles.list}>
            <Text>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name="trash" color="red" size={20} />
              <Image
                style={styles.renderimage}
                source={require('../images/arrow-right.png')}
              />
            </View>
          </View>
          <View style={styles.list}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.renderimage1}
                source={require('../images/clock.png')}
              />
              <Text>{item.time}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.renderimage1}
                source={require('../images/calendar.png')}
              />
              <Text>{item.date}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  const getsectionheader = item => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            paddingHorizontal: 5,
            fontSize: 14,
            color: '#ccd6df',
          }}>
          {item.data.length > 0 ? item.day : ''}
        </Text>
        <View
          style={{
            backgroundColor: '#ccd6df',
            height: item.data.length > 0 ? 1 : 0,
            flex: 1,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#004164', '#1e6185', '#3883b0']}
        style={styles.linearGradient}>
        <ListHeader />
        <View style={styles.switch}>
          <SwitchSelector
            ref={switchRef}
            options={name == 'fr' ? options1 : options}
            initial={0}
            textColor="white"
            selectedColor="white"
            hasPadding
            style={styles.selector}
            buttonColor="#01324c"
            backgroundColor="#00527d"
            borderColor="#01324c"
            onPress={value => selector(value)}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            width: '100%',
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.laboratory}>
          <Image style={styles.tinyLogo} source={options[image].image} />
          <Text style={styles.labtext}>{list}</Text>
        </View>

        {data &&
          data.map((content, index) => {
            // console.log('sss', content);
            if (content.data.length > 0) {
              return (
                <FlatList
                  key={index}
                  data={content.data}
                  renderItem={({item}) => getrender(item)}
                  keyExtractor={(content, i) => i}
                  ListHeaderComponent={({}) => getsectionheader(content)}
                />
              );
            }
          })}
      </LinearGradient>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  renderimage: {
    width: 15,
    height: 15,
    marginLeft: 20,
    alignSelf: 'center',
  },
  renderimage1: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  position: {
    left: 5,
  },
  list: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginBottom: 10,
    borderRadius: 10,
    position: 'relative',
  },
  header: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
  },
  section: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  labtext: {
    fontSize: 20,
    color: 'white',
    paddingLeft: 10,
  },
  laboratory: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  switch: {
    marginTop: 20,
  },
  selector: {
    margin: 5,
    borderColor: 'red',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    width: 400,
    height: 700,
    borderWidth: 0,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  itemStyle: {
    fontSize: 28,
    color: 'white',
  },
  arrow: {
    position: 'absolute',
    left: 10,
  },
  headerFooterStyle: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
