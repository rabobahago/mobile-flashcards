import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { gray, lightgray, white, blue, red } from "../utils/colors";
import { connect } from "react-redux";
import { handleDeleteDeck } from "../actions/decks";

class SingleDeck extends React.Component {
  static navigationOptions = {
    title: "Single Deck"
  };

  toAddCardScreen = () => {
    const { deck } = this.props;
    this.props.navigation.push("NewCard", {
      deck
    });
  };

  toQuizScreen = () => {
    const { deck } = this.props;
    this.props.navigation.push("Quiz", {
      deck
    });
  };

  showDeleteDeckAlert = () => {
    Alert.alert(
      "Delete Deck",
      "Deleting will remove this deck and its cards from this device ",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "OK", onPress: () => this.deleteDeck() }
      ]
    );
  };

  deleteDeck = () => {
    const { deck } = this.props;
    console.log("Title is ", deck.title);
    this.props.dispatch(handleDeleteDeck(deck.title));
    this.props.navigation.pop();
  };

  render() {
    const { deck } = this.props;

    if (deck === undefined || deck === null) {
      return <View style={styles.container}></View>;
    }

    return (
      <View style={styles.container}>
        {deck !== null && (
          <View style={styles.titleContainer}>
            <View style={styles.circle}>
              <Text style={styles.pictureletter}>{deck.title[0]}</Text>
            </View>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
          </View>
        )}

        {deck.questions.length === 0 && (
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 40 }}>
            You cannot take this quiz because questions (cards) do not exist in
            this deck. Add some questions here to start.
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.toAddCardScreen()}
        >
          <View style={styles.row}>
            <Text style={[styles.action, { color: blue }]}>Add Card</Text>
          </View>
        </TouchableOpacity>

        {deck.questions.length > 0 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.toQuizScreen()}
          >
            <View style={styles.row}>
              <Text style={[styles.action, { color: blue }]}>Start Quiz</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.deleteDeck()}
        >
          <View style={styles.row}>
            <Text style={[styles.action, { color: red }]}>Delete Deck</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (decks, props) => {
  const deckId = props.navigation.state.params.deck;
  return {
    deck: decks ? decks[deckId] : null
  };
};

export default connect(mapStateToProps)(SingleDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: lightgray
  },
  row: {
    alignItems: "center",
    flexDirection: "row"
  },
  button: {
    backgroundColor: white,
    borderColor: white,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 15,
    marginBottom: 10
  },
  circle: {
    marginTop: 40,
    backgroundColor: gray,
    width: 120,
    height: 120,
    borderRadius: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    backgroundColor: white,
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center"
  },
  title: {
    paddingTop: 30,
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold"
  },
  subtitle: {
    paddingBottom: 30,
    textAlign: "center",
    color: gray,
    fontSize: 20
  },
  action: {
    fontSize: 18
  },
  pictureletter: {
    fontSize: 40,
    color: white,
    fontWeight: "bold"
  }
});
