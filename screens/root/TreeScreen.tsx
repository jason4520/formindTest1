import React from 'react';
import axios from 'axios';
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
import RestaurantModel from "../../models/RestaurantModel";
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

  function getData(){
    axios.get("https://cors-anywhere.herokuapp.com/https://feat-wear.herokuapp.com/color?zodiac=scorpio")
            .then(response => {
                console.log('getting data from axios', response.data);
                setTimeout(() => {
                    setModalMessage(response.data.zodiac);
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });
        }
    var test;
    
  const NoScore = () => {
    return (
      <Text style={styles.noPost}>Height: 0</Text>
    );
  };
  function CreateScreen(){
    return<h1>hi</h1>
  }

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
    <button onClick={getData}></button>
    <div>{modalMessage}</div>
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
