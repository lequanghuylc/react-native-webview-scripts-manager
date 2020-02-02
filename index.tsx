import WebViewComponent from 'react-native-webview';
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ScriptManager from './scripts';

import { GetScriptOptions } from './scripts';

interface Props {
  [key: string]: any;
  onRef?(ref: any): void;
  source: any;
  scriptOptions: GetScriptOptions;
  scriptLoading?: {
    style?: any;
    color?: string;
  }
}

export default class Webview extends Component<Props> {

  state = {
    injectedJavaScript: '',
  }

  componentDidMount() {
    this.getScripts();
  }

  getScripts = async () => {
    const scripts = await ScriptManager.getScripts(this.props.scriptOptions);
    this.setState({
      injectedJavaScript: ScriptManager.combineScripts(scripts),
    });
  }

  render() {
    if (!this.state.injectedJavaScript && this.props.scriptLoading) {
      return (
        <View style={[styles.loadingContainer, this.props.scriptLoading.style]}>
          <ActivityIndicator color={this.props.scriptLoading.color || "black"} />
        </View>
      );
    };
    return (
      <WebViewComponent
        ref={this.props.onRef}
        source={this.props.source}
        injectedJavaScript={this.state.injectedJavaScript}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
