import { View, Text, FlatList, StyleSheet } from 'react-native';
import GoalItem from './GoalItem';

export default function GoalList({ goals }) {
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <Text style={styles.listTitle}>LIST OF GOALS</Text>
      <FlatList
        data={goals}
        renderItem={(itemData) => <GoalItem text={itemData.item.text} />}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    backgroundColor: '#3366FF',
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
});