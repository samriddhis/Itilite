import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Icon } from 'react-native-elements';
const { width } = Dimensions.get('window');

export default class BrowserScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _goBack() {
    console.log('hello');
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={Styles.outerContainer}>
        <StatusBar backgroundColor='#4285f4' barStyle="light-content" />
        <View style={Styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this._goBack()}
            style={Styles.iconViewStyle}
          >
            <Icon
              name="arrow-back"
              type="ionicon"
              color="#fff"
              size={35}
              underlayColor="transparent"
            />
          </TouchableOpacity>
        </View>
        <WebView
          source={{
            uri: 'http://google.com',
          }}
          renderLoading={() => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>
          )}
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 50,
    width: width,
    backgroundColor: '#4285f4',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
  },
});
