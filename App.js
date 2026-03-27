import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    if (!enteredGoalText.trim()) return;
    setCourseGoals((currentGoals) => [...currentGoals, enteredGoalText]);
    setEnteredGoalText('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Course Goals</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your course goal!"
          style={styles.input}
          value={enteredGoalText}
          onChangeText={goalInputHandler}
        />
        <Button title="ADD GOAL" color="#3366FF" onPress={addGoalHandler} />
      </View>
      <View style={styles.underline} />

      <ScrollView>
        {courseGoals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4FF', 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3366FF',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#3366FF',
    padding: 10,
    width: '70%',
    borderRadius: 5,
    backgroundColor: 'white', 
  },
  underline: {
    borderBottomColor: '#3366FF',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  goalItem: {
    backgroundColor: '#3366FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  goalText: {
    color: 'white',
    fontWeight: 'bold',
  },
});