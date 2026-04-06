import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function GoalItem(props) {
  return (
    <Pressable
      onPress={props.onDelete}
      android_ripple={{ color: '#ff6666' }}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#3366FF',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  goalText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pressedItem: {
    opacity: 0.5,
  },
});