import React from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

// ---- Message Utils ----
let nextId = 1;
const getNextId = () => nextId++;

const createTextMessage = (text) => ({
  id: getNextId(),
  type: 'text',
  text,
});

const createImageMessage = (uri) => ({
  id: getNextId(),
  type: 'image',
  uri,
});

const createLocationMessage = (coordinate) => ({
  id: getNextId(),
  type: 'location',
  coordinate,
});

// ---- MAIN COMPONENT ----
export default class Index extends React.Component {
  state = {
    messages: [
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('Hello!'),
      createTextMessage('World!'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (this.state.fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handlePressMessage = (item) => {
    if (item.type === 'text') {
      Alert.alert(
        'Delete Message?',
        item.text,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => this.deleteMessage(item.id),
          },
        ]
      );
    } else if (item.type === 'image') {
      this.setState({ fullscreenImageId: item.id });
    }
  };

  deleteMessage = (id) => {
    this.setState({
      messages: this.state.messages.filter((m) => m.id !== id),
    });
  };

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  renderFullscreenImage = () => {
    const { fullscreenImageId, messages } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find((m) => m.id === fullscreenImageId);
    if (!image) return null;

    return (
      <TouchableHighlight
        style={styles.overlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreen} source={{ uri: image.uri }} />
      </TouchableHighlight>
    );
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => this.handlePressMessage(item)}
    >
      {item.type === 'text' && (
        <View style={styles.bubble}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}

      {item.type === 'image' && (
        <Image style={styles.image} source={{ uri: item.uri }} />
      )}

      {item.type === 'location' && (
        <View style={styles.location}>
          <Text>
            📍 {item.coordinate.latitude}, {item.coordinate.longitude}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          inverted
          data={this.state.messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderItem}
        />
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  row: { marginVertical: 5 },
  bubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 15,
    maxWidth: '70%',
  },
  text: { color: 'white' },
  image: { width: 200, height: 200, borderRadius: 10 },
  location: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});