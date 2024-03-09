import 'react-native-gesture-handler';
import { Button, LogBox, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import { store } from './store/store';
import { MenuProvider } from 'react-native-popup-menu';
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  useEffect(() => {
    //Load fonts
    const prepare = async () => {
      try {
        await Font.loadAsync({
          "black": require("./assets/fonts/Roboto-Black.ttf"),
          "blackItalic": require('./assets/fonts/Roboto-BlackItalic.ttf'),
          "bold": require('./assets/fonts/Roboto-Bold.ttf'),
          "boldItalic": require('./assets/fonts/Roboto-BoldItalic.ttf'),
          "italic": require('./assets/fonts/Roboto-Italic.ttf'),
          "light": require('./assets/fonts/Roboto-Light.ttf'),
          "lightItalic": require('./assets/fonts/Roboto-LightItalic.ttf'),
          "medium": require('./assets/fonts/Roboto-Medium.ttf'),
          "mediumItalic": require('./assets/fonts/Roboto-MediumItalic.ttf'),
          "regular": require('./assets/fonts/Roboto-Regular.ttf'),
          "thin": require('./assets/fonts/Roboto-Thin.ttf'),
          "thinItalic": require('./assets/fonts/Roboto-ThinItalic.ttf')
        })
      } catch (error) {
        console.log(error)
      }
      finally {
        setAppIsLoaded(true);
      }
    }

    prepare()
  }, [])

  const onLayoutHandler = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded])
  if (!appIsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider
        onLayout={onLayoutHandler}>
        <MenuProvider>
          <AppNavigator />
        </MenuProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'regular'
  }
});
