import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  function textInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Your course goals"
        style={styles.input}
        value={enteredGoalText}
        onChangeText={textInputHandler}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}
        onPress={addGoalHandler}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={styles.buttonText}>ADD GOAL</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#3366FF', 
    padding: 10, 
    width: '65%', 
    borderRadius: 5, 
    backgroundColor: 'white' 
  },
  button: { 
    backgroundColor: '#3366FF', 
    padding: 10, 
    borderRadius: 5
  },
  buttonPressed: { 
    backgroundColor: '#254eda' 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  }
});