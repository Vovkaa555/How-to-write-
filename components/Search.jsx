import {
  StyleSheet,
  Switch,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import { FlashList } from '@shopify/flash-list';

import { data } from '../assets/';

const Search = ({ isEnabled, setIsEnabled }) => {
  const [text, onChangeText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [random, setIsRandom] = useState('');

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const randomizer = () => {
    const randomIndex = Math.floor(Math.random() * (data.length - 1));
    data[randomIndex].explanation.length > 55 ? setIsRandom(() => data[randomIndex]) : randomizer();
  };

  let result = data
    .flat()
    .filter((item) => (item.title.includes(text.toLowerCase()) && text.length > 1 ? item : ''));
  return (
    <View style={styles.main}>
      {isActive ? (
        <View style={styles.main_screen}>
          <View style={styles.scroll_container}>
            <ScrollView style={styles.random_text_container}>
              <Text style={styles.title_text}>{random.title}</Text>
              <Text style={styles.explanation_text}>{random.explanation}</Text>
              <Text style={styles.author_text}>
                @The Cambridge Guide to English Usage by Pam Peters
              </Text>
            </ScrollView>
          </View>
          <View style={styles.buttons_block}>
            <TouchableOpacity style={styles.close_button} onPress={() => setIsActive(false)}>
              <Text style={styles.random_button_text}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.close_button} onPress={() => randomizer()}>
              <Text style={styles.random_button_text}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.main_screen}>
          <View style={styles.search_container}>
            <TextInput
              style={styles.search_input}
              onChangeText={(value) => onChangeText(value)}
              placeholder="Enter key word:"
              placeholderTextColor="grey"
              cursorColor="wheat"
              maxLength={20}
              value={text}
            />
            {text && (
              <TouchableOpacity style={styles.clear_button} onPress={() => onChangeText('')}>
                <Text style={styles.clear_button_text}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          {text.length > 0 ? (
            ''
          ) : (
            <View style={styles.random_container}>
              <TouchableOpacity
                style={styles.random_button}
                onPress={() => {
                  setIsActive(true);
                  randomizer();
                }}>
                <Text style={styles.random_button_text}>Random</Text>
              </TouchableOpacity>
              <View style={styles.switcher_container}>
                {isEnabled ? (
                  <Text style={styles.switcher_text}>Disable Animation</Text>
                ) : (
                  <Text style={styles.switcher_text}>Enable Animation</Text>
                )}
                <Switch
                  trackColor={{ false: '#767577', true: '#168723' }}
                  thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          )}
          {text.length > 1 &&
            (result.length > 0 ? (
              <View style={styles.response_container}>
                <FlashList
                  data={result}
                  estimatedItemSize={20}
                  renderItem={({ item }) => (
                    <View style={styles.explanation_container}>
                      <Text style={styles.title_text}>{item.title}</Text>
                      <Text style={styles.explanation_text}>{item.explanation}</Text>
                      <Text style={styles.author_text}>
                        @The Cambridge Guide to English Usage by Pam Peters
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View style={styles.not_found_block}>
                <Text style={styles.not_found_text}>Not found</Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 5,
  },
  main_screen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%',
    height: '95%',
    position: 'absolute',
    top: 40,
  },
  search_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: '95%',
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  search_input: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    height: '100%',
    color: 'wheat',
    fontSize: 30,
    fontFamily: 'MoonFlower',
    paddingLeft: 15,
    letterSpacing: 0.9,
  },
  clear_button: {
    backgroundColor: 'wheat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: '100%',
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
  },
  clear_button_text: {
    fontSize: 30,
    fontFamily: 'MoonFlower',
  },
  random_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    height: 50,
    marginTop: 10,
  },
  random_button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    height: '100%',
    width: '40%',
  },
  random_button_text: {
    color: 'wheat',
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'MoonFlower',
    letterSpacing: 1.8,
  },
  switcher_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    height: 50,
  },
  switcher_text: {
    color: 'wheat',
    fontSize: 20,
    fontFamily: 'MoonFlower',
    paddingLeft: 5,
  },
  response_container: {
    width: '95%',
    height: '90%',
  },
  explanation_container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
  },
  title_text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'wheat',
    paddingBottom: 5,
    fontFamily: 'MeriendaOne',
  },
  explanation_text: {
    color: 'wheat',
    lineHeight: 17,
    fontSize: 15,
    fontFamily: 'Signika',
  },
  author_text: {
    paddingTop: 5,
    color: 'wheat',
    fontSize: 7,
    fontFamily: 'MeriendaOne',
  },
  not_found_block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: '95%',
    height: 50,
    borderRadius: 10,
  },
  not_found_text: {
    fontSize: 30,
    color: 'wheat',
    fontFamily: 'MoonFlower',
  },
  scroll_container: {
    marginBottom: 85,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
  },
  random_text_container: {
    flexGrow: 0,
    width: '95%',
  },
  buttons_block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    width: '95%',
    height: 50,
    bottom: 25,
  },
  close_button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    height: '100%',
    width: '40%',
  },
});

export default Search;
