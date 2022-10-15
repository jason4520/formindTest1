import restaurantData from "./../../data/restaurantOptions.json";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RestaurantModel from "../../models/RestaurantModel";

// #1: JavaScript Review
// The below section has examples of map, forEach, sort,
// spread operator, typing
const restaurantNames = [
  ...restaurantData.restaurantOptions.map(
    (restaurantOption) => restaurantOption.name
  ),
].sort();

type NameToVotes = {
  [key: string]: number;
};

const noVotesDefault: NameToVotes = {};

restaurantNames.forEach((name: string) => {
  noVotesDefault[name] = 0;
});

const ResultsScreen = () => {
  const [votesByRestaurant, setVotesByRestaurant] = useState(noVotesDefault);
  const [maxValue, setMaxValue] = useState(0);
  const db = getFirestore();
  const votesCollection = collection(db, "votes");

  useEffect(() => {
    // returning the onSnapshot listener means it gets removed when this component
    // is no longer being rendered (for example, if the user signs out)
    // otherwise, there'd be a memory leak - the listener wouldn't be detached
    return onSnapshot(
      query(votesCollection, orderBy("restaurantName", "asc")),
      (querySnapshot) => {
        const newVotes: RestaurantModel[] = [];
        // #4: Firebase Firestore
        // how can votes be extracted from each querySnapsot and added into newVotes?
        const newVotesByRestaurant = Object.assign({}, noVotesDefault);
        newVotes.forEach((vote) => {
          // #4: Firebase Firestore
          // what should be updated? what is the discrepancy between the new votes that
          // exists and the newVotesByRestaurant?
        });
        setVotesByRestaurant(newVotesByRestaurant);
      }
    );
  }, []);

  // this tracks the max number of votes
  useEffect(() => {
    setMaxValue(Math.max(...Object.values(votesByRestaurant)));
  }, [votesByRestaurant]);

  const Result = ({ name }: { name: string }) => {
    const votes = votesByRestaurant[name];
    // when the max number of votes is found, mark it as green
    // multiple restaurants can have the max number of votes
    // however, if no one has voted, then there is no green text shown
    const style =
      votes === maxValue && maxValue !== 0
        ? styles.resultTextGreen
        : styles.resultText;
    return (
      <View style={styles.result}>
        <Text style={style}>{name}</Text>
        <View style={{ flexGrow: 1 }} />
        <Text style={style}>{votes}</Text>
      </View>
    );
  };

  return (
    <View style={styles.restaurantContainer}>
      <>
        {/* #1: JavaScript Review
        here's a useful example of creating a component and then mapping over it
        # 2: React Concepts
        note that we pass in a prop of name that is then used by the Result component
        to change what and how it renders */}
        {restaurantNames.map((name) => (
          <Result key={name} name={name} />
        ))}
      </>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  restaurantContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  result: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 5,
  },
  resultTextGreen: {
    color: "green",
    fontSize: 16,
    flexGrow: 0,
  },
  resultText: {
    fontSize: 16,
    flexGrow: 0,
  },
});
