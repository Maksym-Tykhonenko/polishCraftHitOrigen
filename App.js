import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, ImageBackground, StyleSheet} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FoldersScreen from './src/screens/FoldersScreen';
import FolderDetailsScreen from './src/screens/FolderDetailsScreen';
import DailyGameScreen from './src/screens/DailyGameScreen';
import ArtsScreen from './src/screens/ArtsScreen';
import QuizScreen from './src/screens/QuizScreen';
import MuseumScreen from './src/screens/MuseumScreen';
import LegendsScreen from './src/screens/LegendsScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import MapScreen from './src/screens/MapScreen';
import PolishCraftHitOrigenProdactScreen from './src/screens/PolishCraftHitOrigenProdactScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  const [route, setRoute] = useState(true);
  //console.log('route==>', route)

  ///////// Route useEff
  // brilliant-magnificent-exhilaration.space
  useEffect(() => {
    const checkUrl = `https://reactnative.dev/`;

    const targetData = new Date('2024-11-06T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={
              {
                //idfa: idfa,
                //sab1: sab1,
                //pid: pid,
                //uid: appsUid,
                //adToken: adServicesToken,
                //adAtribution: adServicesAtribution,
                //adKeywordId: adServicesKeywordId,
                //customerUserId: customerUserId,
                //idfv: idfv,
              }
            }
            name="PolishCraftHitOrigenProdactScreen"
            component={PolishCraftHitOrigenProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DailyGameScreen"
          component={DailyGameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FoldersScreen"
          component={FoldersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FolderDetailsScreen"
          component={FolderDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ArtsScreen"
          component={ArtsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MuseumScreen"
          component={MuseumScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LegendsScreen"
          component={LegendsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlacesScreen"
          component={PlacesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: 'relative',
            flex: 1,
            //backgroundColor: 'rgba(0,0,0)',
          }}>
          <Animated.Image
            source={require('./src/assets/newDiz/loader1.png')}
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
          <Animated.Image
            source={require('./src/assets/newDiz/loader2.png')}
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
        </View>
      ) : (
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
