import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
const { width } = Dimensions.get('window');
import { Icon } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";

const options = {
    title: "Select Avatar",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: "http://getdrawings.com/free-icon/blank-avatar-icon-75.png",
    };
  }

  componentDidMount(){
    this.loadImage()
  }

  saveImage(imageBase64) {
    AsyncStorage.setItem('image', imageBase64)
  }

  loadImage() {
    var self = this;
    AsyncStorage.getItem('image', (error, result) => {
      if(result!=null){
        self.setState({ imageUrl: result });
      }else{
        self.setState({ imageUrl: "http://getdrawings.com/free-icon/blank-avatar-icon-75.png" });
      }
    })
  }

  _openMenu() {
     navVar.openDrawer();
    //this.state.scope.props.navigation.openDrawer();
  }

  async _pressPictureUpload() {
    await ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.saveImage(response.uri)
        this.setState({
          imageUrl: response.uri,
        });
      }
    });
  }

  render() {
    return (
      <View style={Styles.outerContainer}>
        <StatusBar backgroundColor='#4285f4' barStyle="light-content" />
        <TouchableOpacity
          onPress={() => this._openMenu()}
          style={Styles.iconViewStyle}
        >
          <Icon
            name="ios-menu"
            type="ionicon"
            color="#fff"
            size={35}
            underlayColor="transparent"
          />
        </TouchableOpacity>
        <View style={Styles.DetailsViewStyle}>
          <Text style={Styles.titleStyle}>{new Date().toDateString()}</Text>
          <Text style={Styles.titleNameStyle}>Milan Castory</Text>
        </View>
        <View style={Styles.ProfilePicView}>
          <View style={Styles.IconRoundStyle}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 40 }}
              source={{
                uri: this.state.imageUrl,
              }}
            />
          </View>
          <TouchableOpacity style={Styles.PencilOuterStyle} onPress={() => this._pressPictureUpload()}>
            <View style={Styles.PencilInnerStyle}>
              <Icon
                name={'pencil'}
                type={'evilicon'}
                size={18}
                style={Styles.PencilIconStyle}
                underlayColor="transparent"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  outerContainer: {
    height: 80,
    width: width,
    backgroundColor: "#4285f4",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
  },
  iconViewStyle: {
    flex: 0.1,
  },
  titleStyle: {
    fontSize: 14,
    color: '#fff',
  },
  titleNameStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  DetailsViewStyle: {
    flex: 0.6,
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ProfilePicView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconRoundStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  PencilOuterStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top:40,
    right:20
  },
  PencilInnerStyle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#40a0c0', //"#3993D5"
  },
});
