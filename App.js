import { StyleSheet, View, ImageBackground } from 'react-native';
import { useCallback, useState } from 'react';
import {
  backgroundImage,
  frontImageTree,
  frontImageFirst,
  backgroundWithoutAnimation,
} from './assets';
import ParallaxBackground from './components/ParallaxBackground';
import Search from './components/Search';
import { useFonts } from 'expo-font';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fontsLoaded] = useFonts({
    MeriendaOne: require('./assets/fonts/MeriendaOne-Regular.ttf'),
    Signika: require('./assets/fonts/Signika-Regular.ttf'),
    MoonFlower: require('./assets/fonts/MoonFlowerBold-MVppp.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Search isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
      {isEnabled ? (
        <ParallaxBackground
          backgroundImage={backgroundImage}
          frontImageTree={frontImageTree}
          frontImageFirst={frontImageFirst}
        />
      ) : (
        <View style={styles.container_without_animation}>
          <ImageBackground
            source={backgroundWithoutAnimation}
            resizeMode="cover"
            style={styles.image_background_without_animation}></ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  container_without_animation: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  image_background_without_animation: {
    flex: 1,
    justifyContent: 'center',
  },
});
