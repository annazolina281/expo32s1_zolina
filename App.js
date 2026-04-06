import { StyleSheet, Text, View, FlatList, Modal, Button, Alert, Pressable, Image } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function addGoalHandler(enteredText) {
    if (!enteredText.trim()) return;

    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredText, key: Math.random().toString() },
    ]);

    if (courseGoals.length + 1 > 5) {
      setModalVisible(true);
    }
  }

  function deleteGoalHandler(key) {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes', 
          style: 'destructive', 
          onPress: () => {
            setCourseGoals((currentGoals) =>
              currentGoals.filter((goal) => goal.key !== key)
            );
          }
        },
      ]
    );
  }

  function handleUserIconPress() {
    Alert.alert('Welcome!', 'Hello! Welcome to your Course Goals App.');
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Course Goals</Text>

        <Pressable onPress={handleUserIconPress}>
          <Image source={require('./assets/userprofile.png')} style={styles.userIcon} />
        </Pressable>
      </View>

      <GoalInput onAddGoal={addGoalHandler} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Whoa! Too many goals!</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Text style={styles.listTitle}>LIST OF GOALS</Text>

      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            text={itemData.item.text}
            onDelete={() => deleteGoalHandler(itemData.item.key)}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F0F4FF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3366FF',
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  listTitle: {
    backgroundColor: '#3366FF',
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    backgroundColor: 'white',
    padding: 20,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 15,
  },
});