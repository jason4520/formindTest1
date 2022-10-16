import React from 'react';
import restaurantData from "./../../data/restaurantOptions.json";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import RestaurantOption from "../../models/RestaurantOption";
import { useState } from "react";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import RestaurantModel from "../../models/RestaurantModel";
import { auth } from "../../App";
import ErrorModal from "../../components/ErrorModal";
import { Image } from 'react-native'

const TreeScreen = () => {
  // #2: React Concepts
  // how can we store the information of what restaurant has been selected?
  const [voteLoading, setVoteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const restaurants = [...restaurantData.restaurantOptions].sort(
    // this is a custom sort function to compare restaurants by name
    // localeCompare is a built in lexicographical string comparator
    (restaurant1, restaurant2) =>
      restaurant1.name.localeCompare(restaurant2.name)
  );

  const submitVote = async () => {
    // #4: Firebase Firestore: update with chosen state variable later
    if (false) {
      setModalMessage("No restaurant chosen");
      setShowModal(true);
      return;
    }
    if (!auth.currentUser || !auth.currentUser.uid) return;
    setVoteLoading(true);
    try {
      const db = getFirestore();
      // creates a "link" into a votes collection within the database
      const votesCollection = collection(db, "votes");
      // #4: Firebase Firestore
      // a given user should only be able to update their given vote
      const uid = "";
      const votesRef = doc(votesCollection, uid);
      const restaurantDoc: RestaurantModel = {
        // #4: Firebase Firestore
        // what information should be stored inside the document?
        user: "",
        restaurantName: "",
      };
      await setDoc(votesRef, restaurantDoc);
      setVoteLoading(false);
    } catch (error: any) {
      setModalMessage(error.toString());
      setShowModal(true);
      setVoteLoading(false);
    }
  };

  const NoScore = () => {
    return (
      <Text style={styles.noPost}>Height: 0</Text>
    );
  };
  function CreateScreen(){
    return<h1>hi</h1>
  }
  const VotingPanel = () => {
    // #2: React Concepts
    // how can we show the choice of a user and give them the option to clear the choice?
    // currently it only shows a vote button (which will be implemented in part 4 later)
    return (
      <>
        <Text style={styles.restaurantChosen}>Choice:</Text>
        <Button title="Clear Choice" disabled={voteLoading} />
        <Button title="Vote" onPress={submitVote} disabled={voteLoading} />
      </>
    );
  };

  const renderRestaurant = ({ item }: { item: RestaurantOption }) => {
    const { name, foods } = item;
    // note: Pressable is more "future-proof", but the opacity effect is cool
    // #2: React Concepts
    // how can we render one restaurant given the information in RestaurantOption?
    return <></>;
  };

  return (
    <SafeAreaView>
      <ErrorModal
        modalMessage={modalMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.name}
        // can't surround a virtualized list in another virtualized list
        // #2: React Concepts
        // how can we change what component shows above the list based on if a restaurant is chosen?
        ListHeaderComponent={<NoScore />}
        style={styles.restaurantList}
      />
    <View style={styles.restaurantContainer}>
      <Image style={styles.logo} source={require('./images/trunk.png')} />
      <Image style={styles.logo} source={require('./images/stump.png')} />
    </View>
    </SafeAreaView>
  );
};

export default TreeScreen;

const styles = StyleSheet.create({
  restaurantContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  restaurantName: {
    fontSize: 20,
  },
  restaurantFoods: {
    fontSize: 14,
  },
  noPost: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  restaurantChosen: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  restaurantList: {
    marginBottom: 20,
  },
  logo: {
    width: 230,
    height: 128,
    alignSelf: 'center',
  },
});
