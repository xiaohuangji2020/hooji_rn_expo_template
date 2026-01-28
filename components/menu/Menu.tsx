import menuList from '@/assets/json/menu.json';
import ImageViewer from '@/components/images/ImageViewer';
import { StyleSheet, View } from 'react-native';

export function Menu() {
  return (
    menuList.map((menuItem, index) => (
      <View key={index} style={styles.container}>
        <ImageViewer imgSource={PlaceholderImage} />
        <Text>{menuItem.title}</Text>

      </View>
    ))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
