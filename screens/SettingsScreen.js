import React from "react";
import { ExpoConfigView } from "@expo/samples";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return <ExpoConfigView />;
  }
}
export default SettingsScreen;
