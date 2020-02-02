

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Webview from 'react-native-webview-scripts-manager';

import localScriptES from './localScriptsES';

class App extends Component {

  state = {
    uri: 'https://example.com',
    inputUrl: '',
  }

  onPressBack = () => {
    this.webview && this.webview.goBack();
  }

  onNavigationStateChange = (navState) => {
    this.setState({ inputUrl: navState.url })
  }

  onMessage = (event) => {
    console.log(event.nativeEvent.data);
  }
  
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton} onPress={this.onPressBack}>
              <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.addressBar}>
              <TextInput
                style={styles.textInput}
                value={this.state.inputUrl}
                onChangeText={(text) => {
                  this.setState({ inputUrl: text })
                }}
                onSubmitEditing={() => {
                  this.setState({ uri: this.state.inputUrl })
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            </View>
          </View>
          <View style={styles.container}>
            <Webview
              source={{ uri: this.state.uri }}
              scriptOptions={{
                localScript: localScriptES,
                useLocal: true,
                remoteLogChannel: 'lequanghuylc_react-native-webview-scripts-manager',
              }}
              onNavigationStateChange={this.onNavigationStateChange}
              onMessage={this.onMessage}
              onRef={ref => this.webview = ref}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressBar: {
    flex: 1,
    padding: 5,
  },
  textInput: {
    flex: 1,
    padding: 4,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },  
  header: {
    height: 64,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerButton: {
    padding: 10,
  },
});

export default App;
