import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  withTiming,
  interpolate,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';

const IMAGE_OFFSET = 90;
const PI = Math.PI;
const HALF_PI = PI / 2;

const ParallaxBackground = ({ backgroundImage, frontImageTree, frontImageFirst }) => {
  const { width, height } = useWindowDimensions();

  const sensor = useAnimatedSensor(SensorType.ROTATION, { interval: 10 });
  const imageStyle = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;

    return {
      top: withTiming(interpolate(pitch, [HALF_PI, -HALF_PI], [-IMAGE_OFFSET * 0.5, 0]), {
        duration: 250,
      }),
      left: withTiming(interpolate(roll, [PI, -PI], [-IMAGE_OFFSET * 2, -300]), {
        duration: 200,
      }),
    };
  });
  const frontTreeImageStyle = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;
    return {
      bottom: withTiming(
        interpolate(pitch, [HALF_PI, -HALF_PI], [-IMAGE_OFFSET / 1.8, -IMAGE_OFFSET * 1.4]),
        {
          duration: 200,
        },
      ),
      right: withTiming(interpolate(roll * 0.95, [-PI, PI], [IMAGE_OFFSET, -IMAGE_OFFSET * 3]), {
        duration: 150,
      }),
    };
  });

  const frontImageStyle = useAnimatedStyle(() => {
    const { pitch, roll } = sensor.sensor.value;
    return {
      bottom: withTiming(interpolate(pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET / 1.5, 0]), {
        duration: 200,
      }),
      left: withTiming(interpolate(roll * 0.95, [-3, 3], [-IMAGE_OFFSET * 2, 0]), {
        duration: 100,
      }),
    };
  });

  const fireflies = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30,
  ];

  const Firefly = () => {
    const size = Math.random().toFixed(2) * 13 + 4;

    const fireflyStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: withRepeat(
            withSequence(
              withTiming(Math.floor(Math.random() * height * 0.3) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * height * 0.3) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * height * 0.3) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * height * 0.3) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * height * 0.3) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
            ),
            -1,
          ),
        },
        {
          translateX: withRepeat(
            withSequence(
              withTiming(Math.floor(Math.random() * width) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * width) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * width) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * width) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
              withTiming(Math.floor(Math.random() * width) + 1, {
                duration: Math.floor(Math.random() * 10000) + 2000,
              }),
            ),
            -1,
          ),
        },
      ],
    }));

    return (
      <Animated.Text
        style={[
          {
            fontSize: size,
            color: '#F8EE99',
          },
          fireflyStyles,
        ]}>
        .
      </Animated.Text>
    );
  };

  return (
    <View style={styles.background}>
      <Animated.Image
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: 'absolute',
            zIndex: 0,
          },
          imageStyle,
        ]}
        source={backgroundImage}
      />
      <Animated.Image
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: 'absolute',
            zIndex: 3,
          },
          frontTreeImageStyle,
        ]}
        source={frontImageTree}
      />
      <Animated.View style={styles.fireflies_container}>
        <FlashList
          data={fireflies}
          estimatedItemSize={100}
          renderItem={({ item, index }) => <Firefly key={item + index} />}
        />
      </Animated.View>
      <Animated.Image
        style={[
          {
            width: width,
            height: height / 2,
            position: 'absolute',
            zIndex: 4,
          },
          frontImageStyle,
        ]}
        source={frontImageFirst}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fireflies_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    bottom: 0,
    width: '100%',
    height: '60%',
    position: 'absolute',
    zIndex: 2,
  },
});

export default ParallaxBackground;
