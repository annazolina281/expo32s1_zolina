import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Your Course Goals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3366FF',
  },
});