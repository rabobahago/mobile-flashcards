import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/decks";
import middleware from "./middleware";

const store = createStore(reducer, middleware);

const App = (props) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  const _handleLoadingError = (error) => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    setIsLoadingComplete({ isLoadingComplete: true });
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
