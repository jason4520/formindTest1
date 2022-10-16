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
import { initializeApp } from 'firebase/app';
import firebaseConfig from "../../keys.json";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const VotingScreen = () => {
  const [messages, setMessages] = useState([]);
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getMessages() {
  const citiesCol = collection(db, 'messages');
  const citySnapshot = await getDocs(citiesCol);
  console.log(citySnapshot);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  setMessages(cityList);
}
function addMessage(){
  const citiesCol = collection(db, 'messages');
  const data = {
    "user":"user2",
    "text": "Bye"
  }
  addDoc(citiesCol, data)
  .then(docRef => {
      console.log("Document has been added successfully");
  })
  .catch(error => {
      console.log(error);
  });
}
getMessages();
  function containsMessages(){
    if (messages){
      return true;
    }
    return false;
  }
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

  const NoPosts = () => {
    return (
      <Text style={styles.noPost}>No Posts to Display</Text>
    );
  };

  const MessageList = () => {
    var toRender = "";
    for (let i = 0; i< messages.length; i++){
      toRender += <div><h1>{messages[i].user}</h1><p>{messages[i].text}</p></div>;
    }
    return toRender;
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
    {createMode ? 
    <div>
        <input type="text"></input>
        <button onClick={() => setCreateMode(false)}>Cancel</button><button onClick={addMessage}>Post</button>
    </div> : 
    <div>
      {containsMessages? <MessageList></MessageList> : <h1>No Posts</h1>}
      <button onClick={() => setCreateMode(true)}>Create Post</button>
    </div>
  }
    </SafeAreaView>
  );
};

export default VotingScreen;

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
});
