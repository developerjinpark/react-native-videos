import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {Video, Audio} from 'expo-av'
import * as Font from 'expo-font'
import {Asset} from 'expo-asset'
import {AppLoading} from 'expo'

let green = '#477009'
let yellow = '#fcd602'

export default class App extends React.Component {
  state = {
    isReady: false
  }

  _setAudioModeAsync = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
    })
  }

  _loadFontsAsync = async () => {
    await Font.loadAsync({
      CooperBlackRegular: require('./assets/COOPBL.ttf')
    })
  }

  _loadAssetsAsync = async () => {
    await Asset.loadAsync([
      require('./assets/bee.mp4'),
      require('./assets/1.mp4'),
      require('./assets/2.mp4'),
      require('./assets/3.mp4'),
      require('./assets/4.mp4'),
      require('./assets/5.mp4'),
    ])
  }
  _setupAsync = async () => {
    await Promise.all([
      this._loadAssetsAsync(),
      this._setAudioModeAsync(),
      this._loadFontsAsync()
    ])
    this.setState({isReady: true})
  }

  componentDidMount() {
    this._setupAsync()
  }

  render() {
    if (!this.state.isReady) {
      return (<AppLoading />)
    }
    let size = 100
    return (
      <View style={styles.container}>
        <Text style={{
          color: yellow,
          fontSize: 42,
          fontFamily: "CooperBlackRegular"
        }}>Animals</Text>
        <View style={{flexDirection: 'row'}}>
          <BeeVideoButton
            source={require('./assets/bee.mp4')}
            size={size}
          />
          <BeeVideoButton
            source={require('./assets/1.mp4')}
            size={size}
          />
          <BeeVideoButton
            source={require('./assets/2.mp4')}
            size={size}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <BeeVideoButton
            source={require('./assets/3.mp4')}
            size={size}
          />
          <BeeVideoButton
            source={require('./assets/4.mp4')}
            size={size}
          />
          <BeeVideoButton
            source={require('./assets/5.mp4')}
            size={size}
          />
        </View>
        
      </View>
    );
  }
}

class BeeVideoButton extends React.Component {
  resetAsync = async () => {
    await this._video.stopAsync()
    await this._video.setPositionAsync(0)
  }
  playAsync = async () => {
    await this._video.replayAsync()
  }
  render() {
    return (
      <View>
        <TouchableHighlight onPress={ () => {
          this.playAsync()
        }}>
          <View style={{
            margin:10,
            borderWidth: 1,
            borderColor: '#479909',

          }}>
            <Video 
              source={this.props.source}
              style={{
                width: this.props.width || this.props.size || 400,
                height: this.props.height || this.props.size || 400
              }}
              resizeMode="cover"
              shouldPlay
              ref={ c => {this._video = c}}
              onPlaybackStatusUpdate={ status => {
                if (status.didJustFinish) {
                  this.resetAsync()
                }
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
