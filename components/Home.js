/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SwitchSelector from 'react-native-switch-selector';
import Footer from './Footer';
import {useSelector, useDispatch} from 'react-redux';
import {getTodos} from '../redux/categoriesSlice';

const Home = () => {
  const dispatch = useDispatch();

  const {todos, status} = useSelector(state => state.todoList);

  const ListHeader = () => {
    return (
      <View style={styles.headerFooterStyle}>
        <Icon
          style={styles.arrow}
          name="md-arrow-back"
          color="#4F8EF7"
          size={30}
        />
        <Text style={styles.itemStyle}>Bookmark</Text>
      </View>
    );
  };
  const options = [
    {label: 'All', value: 'All'},
    {label: 'Laboratory', value: 'Laboratory'},
    {label: 'Diagnostics', value: 'Diagnostics'},
    {label: 'Field Works', value: 'Field Works'},
  ];

  const employee = [
    {
      name: 'Lab Laboratory Research',

      time: '07.43pm',

      date: '2023-3-27',

      tool: 'Laboratory',

      image: require('../images/lab.png'),
    },

    {
      name: 'D High Risk Result',

      time: '05.33pm',

      date: '2023-3-27',

      tool: 'Diagnostics',

      image: require('../images/diagnosis.png'),
    },

    {
      name: 'Field name 1',

      time: '06.43pm',

      date: '2023-3-27',

      tool: 'Field Works',

      image: require('../images/field.png'),
    },

    {
      name: 'Lab Very High Risk Result',

      time: '06.43pm',

      date: '2023-3-26',

      tool: 'Laboratory',

      image: require('../images/lab.png'),
    },

    {
      name: 'D Low Risk Result',

      time: '06.43pm',

      date: '2023-3-26',

      tool: 'Diagnostics',

      image: require('../images/diagnosis.png'),
    },

    {
      name: 'Field Very High Risk Result',

      time: '06.43pm',

      date: '2023-3-28',

      tool: 'Field Works',

      image: require('../images/field.png'),
    },

    {
      name: 'D Human Researach',

      time: '06.43pm',

      date: '2023-3-12',

      tool: 'Diagnostics',

      image: require('../images/diagnosis.png'),
    },

    {
      name: 'Lab Medium Risk Result',

      time: '06.43pm',

      date: '2023-3-12',

      tool: 'Laboratory',

      image: require('../images/lab.png'),
    },

    {
      name: 'Field High Risk Result',

      time: '06.43pm',

      date: '2023-3-29',

      tool: 'Field Works',

      image: require('../images/field.png'),
    },

    {
      name: 'D Poor Result',

      time: '06.43pm',

      date: '2023-3-29',

      tool: 'Diagnostics',

      image: require('../images/diagnosis.png'),
    },

    {
      name: 'Lab Good Result',

      time: '06.43pm',

      date: '2023-3-15',

      tool: 'Laboratory',

      image: require('../images/lab.png'),
    },

    {
      name: 'Lab Field Best Result',

      time: '06.43pm',

      date: '2023-3-12',

      tool: 'Laboratory',

      image: require('../images/lab.png'),
    },
  ];

  useEffect(() => {
    dispatch(getTodos());
    // dispatch(getDataAsync());
    datasorting(todos);
    // setlist(data);
  }, []);
  console.log('jldnhljsdh', todos);

  const datasorting = todos => {
    const todaydate = new Date();
    const todayformat = `${todaydate.getFullYear()}-${
      todaydate.getMonth() + 1
    }-${todaydate.getDate()}`;
    const yesterday = `${todaydate.getFullYear()}-${todaydate.getMonth() + 1}-${
      todaydate.getDate() - 1
    }`;
    console.log('ss', todaydate, yesterday, 'dddd', todayformat);
    const value = [
      {
        day: 'today',
        data: todos.filter(x => x.date == todaydate),
      },
      {
        day: 'yesterday',
        data: todos.filter(x => x.date == yesterday),
      },
      {
        day: 'Previous',
        data: todos.filter(x => x.date !== todayformat && x.date !== yesterday),
      },
    ];
    setData(value);
    console.log('data', value);
  };

  const [list, setlist] = useState('All');
  const [image, setimage] = useState(require('../images/lab.png'));
  const [data, setData] = useState([]);

  const selector = value => {
    console.log(value);
    setlist(value);
    if (value === 'All') {
      setimage(require('../images/lab.png'));
      datasorting(todos);
    } else {
      const filter = todos.filter(item => {
        if (item.tool === value) {
          return item;
        }
      });
      datasorting(filter);
      const images = filter.find(item => item.tool == value);
      console.log(images, 'images');
      setimage(images.image);
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
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
  console.log('ghjjhfff', data);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#004164', '#1e6185', '#3883b0']}
        style={styles.linearGradient}>
        <ListHeader />
        <View style={styles.switch}>
          <SwitchSelector
            options={options}
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
          <Image style={styles.tinyLogo} source={image} />
          <Text style={styles.labtext}>{list}</Text>
        </View>
        <ScrollView>
          {data &&
            data.map((content, index) => {
              return (
                <FlatList
                  data={content.data}
                  renderItem={({item}) => getrender(item)}
                  keyExtractor={content => content.id}
                  ListHeaderComponent={({}) => getsectionheader(content)}
                />
              );
            })}
        </ScrollView>
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
    height: 749,
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
