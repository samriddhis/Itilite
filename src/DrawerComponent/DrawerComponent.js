import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./Component.style";
import { NavigationActions, DrawerActions } from "react-navigation";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
 
  render() {
    return (
      <TouchableOpacity style={styles.container}   onPress={DrawerActions.closeDrawer()}>
        <ScrollView>
          <TouchableOpacity style={styles.ProfilePicStyle}>
            <Icon type="font-awesome" name="user-circle-o" size={20} />
            <Text style={styles.ProfileTextStyle}>
              Hello
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("TabNavigator")}
          >
            <Icon type="simple-line-icon" name="home" size={20} />
            <Text style={styles.NavHeaderTextStyle}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.NavHeaderStyle}
            onPress={this.navigateToScreen("BrowserScreen")}
          >
            <Icon
              type="material-community"
              name="account-circle-outline"
              size={23}
            />
            <Text style={styles.NavHeaderTextStyle}>Browse</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableOpacity>
    );
  }
}

DrawerComponent.propTypes = {
  navigation: PropTypes.object
};

