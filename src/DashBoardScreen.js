import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import HeaderComponent from './HeaderComponent';
const { height, width } = Dimensions.get('window');
import { Icon } from 'react-native-elements';

export default class DashBoardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      showLoadMask: true,
      currentLatitude: 0,
      currentLongitude: 0,
      weatherResponse: {},
      uviResponse: {},
      time: new Date(),
      timeDiff: '0 sec ago',
    };
    navVar = this.props.navigation;
    this.refreshScreen = this.refreshScreen.bind(this);
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() });
  }

  componentDidMount() {
    this._getLocationCords();
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this._differnceBetweenTime();
  }

  _differnceBetweenTime() {
    date1 = new Date();
    date2 = this.state.time;

    var res = Math.abs(date1 - date2) / 1000;

    // get total days between two dates
    var days = Math.floor(res / 86400);
    console.log('Difference (Days): ' + days);

    // get hours
    var hours = Math.floor(res / 3600) % 24;
    console.log('Difference (Hours): ' + hours);

    // get minutes
    var minutes = Math.floor(res / 60) % 60;
    console.log('Difference (Minutes): ' + minutes);

    // get seconds
    var seconds = res % 60;
    console.log('Difference (Seconds): ' + seconds);
    if (hours > 0) {
      diffBetweenTime = hours + ' hours ' + minutes + ' minutes ago';
    } else {
      diffBetweenTime = minutes + ' minutes ago';
    }
    this.setState({
      timeDiff: diffBetweenTime,
    });
  }

  _generateLocationWeather = async function () {
    var lati = this.state.currentLatitude;
    var longi = this.state.currentLongitude;
    url =
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
      lati +
      '&lon=' +
      longi +
      '&appid=ece41b4746cbbd51a1f2e7a799f2af9b';
    try {
      var resp = await this._getCurrentLocation(url);
      this.setState({
        weatherResponse: resp,
        showLoadMask: false,
        refreshing: false,
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  _generateLocationUvi = async function () {
    var lati = this.state.currentLatitude;
    var longi = this.state.currentLongitude;
    url =
      'http://api.openweathermap.org/data/2.5/uvi?lat=' +
      lati +
      '&lon=' +
      longi +
      '&appid=ece41b4746cbbd51a1f2e7a799f2af9b';
    try {
      var resp = await this._getCurrentLocation(url);
      this.setState({
        uviResponse: resp,
        showLoadMask: false,
        refreshing: false,
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getCurrentLocation = function (url) {
    return new Promise(function (resolve, reject) {
      try {
        fetch(url, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJson) => {
            resolve(responseJson);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  _getLocationCords = () => {
    var that = this;
    if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition((position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        that.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
        });
        that._generateLocationWeather();
        that._generateLocationUvi();
      });
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition((position) => {
              const currentLongitude = JSON.stringify(
                position.coords.longitude
              );
              const currentLatitude = JSON.stringify(position.coords.latitude);
              that.setState({
                currentLongitude: currentLongitude,
                currentLatitude: currentLatitude,
              });

              that._generateLocationWeather();
              that._generateLocationUvi();
            });
          } else {
            console.log('Permission Denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
      requestLocationPermission();
    }
  };

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this._getLocationCords();
  };

  render() {
    return (
      <SafeAreaView style={styles.OuterWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <HeaderComponent />
          {this.state.showLoadMask ? (
            <Modal
              transparent={true}
              animationType={'none'}
              visible={this.state.showLoadMask}
            >
              <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                  <Text style={styles.loadingTxtStyle}>Loading.....</Text>
                  <ActivityIndicator
                    animating={this.state.showLoadMask}
                    color="#00b5ec"
                  />
                </View>
              </View>
            </Modal>
          ) : (
            <View />
          )}
          <View style={styles.OuterContainer}>
            {Object.keys(this.state.weatherResponse).length != 0 &&
            Object.keys(this.state.uviResponse).length != 0 ? (
              <View style={styles.OuterContainer}>
                <View style={styles.LeftContainer}>
                  <View style={styles.LeftTopContainer}>
                    <View style={styles.TopViewStyle}>
                      <Icon
                        name="droplet"
                        type="feather"
                        color="#fff"
                        size={30}
                        underlayColor="white"
                      />
                      <Text style={styles.TitleTxtStyle}>Humidity</Text>
                    </View>
                    <View style={styles.DownViewStyle}>
                      <Text style={styles.ValueTxtStyle}>
                        {this.state.weatherResponse.main.humidity}
                      </Text>
                      <Text style={styles.TimeTxtStyle}>
                        {this.state.timeDiff}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.LeftDownContainer}>
                    <View style={styles.TopViewStyle}>
                      <Icon
                        name="leaf-outline"
                        type="ionicon"
                        color="#fff"
                        size={30}
                        underlayColor="white"
                      />
                      <Text style={styles.TitleTxtStyle}>UV Index</Text>
                    </View>
                    <Icon
                        name="wave"
                        type="material-community"
                        color="#fff"
                        size={80}
                        underlayColor="white"
                      />
                    <View style={styles.DownViewStyle}>
                      <Text style={styles.ValueTxtStyle}>
                        {this.state.uviResponse.value}
                      </Text>
                      <Text style={styles.TimeTxtStyle}>
                        {this.state.timeDiff}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.RightContainer}>
                  <View style={styles.RightTopContainer}>
                    <View style={styles.TopViewStyle}>
                      <Icon
                        name="clock-time-nine-outline"
                        type="material-community"
                        color="#fff"
                        size={30}
                        underlayColor="white"
                      />
                      <Text style={styles.TitleTxtStyle}>Pressure</Text>
                    </View>
                    <Icon
                        name="wave"
                        type="material-community"
                        color="#fff"
                        size={80}
                        underlayColor="white"
                      />
                    <View style={styles.DownViewStyle}>
                      <Text style={styles.ValueTxtStyle}>
                        {this.state.weatherResponse.main.pressure}
                      </Text>
                      <Text style={styles.TimeTxtStyle}>
                        {this.state.timeDiff}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.RightDownContainer}>
                    <View style={styles.TopViewStyle}>
                      <Icon
                        name="weather-sunset-up"
                        type="material-community"
                        color="#fff"
                        size={30}
                        underlayColor="white"
                      />
                      <Text style={styles.TitleTxtStyle}>Visibility</Text>
                    </View>
                    <View style={styles.DownViewStyle}>
                      <Text style={styles.ValueTxtStyle}>
                        {this.state.weatherResponse.visibility}
                      </Text>
                      <Text style={styles.TimeTxtStyle}>
                        {this.state.timeDiff}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  OuterWrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  OuterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  LeftContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },
  RightContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },
  LeftTopContainer: {
    flex: 0.4,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#6b29ff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  TopViewStyle: {
    padding: 20,
    paddingTop: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  DownViewStyle: {
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  TitleTxtStyle: {
    fontSize: 20,
    color: 'white',
  },
  ValueTxtStyle: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  TimeTxtStyle: {
    fontSize: 16,
    fontWeight: '200',
    color: 'white',
  },
  LeftDownContainer: {
    flex: 0.6,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#ff6861',
  },
  RightTopContainer: {
    flex: 0.6,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#61c5f9',
  },
  RightDownContainer: {
    flex: 0.4,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#f0ac83',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loadingTxtStyle: {
    color: 'gray',
  },
  CurveStyle:{
    padding:15,
    width:150,
    height:100,
    backgroundColor:"green"
  },
  CurveStyle1:{
    padding:15,
    width:150,
    height:100,
    backgroundColor:"transparent"
  }
});
