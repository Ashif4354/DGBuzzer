import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home/Home';
import Host from './src/pages/Host/Host';
import HostRoom from './src/pages/Host/HostRoom';
import Join from './src/pages/Join/Join';
import PlayerRoom from './src/pages/Join/PlayerRoom';
import NetworkInfo from './src/pages/NetworkInfo/NetworkInformation';

const NativeStack = createNativeStackNavigator();

const MyNativeStack = () => {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Group>
        <NativeStack.Screen name="Home" component={Home} />
        <NativeStack.Screen name="Host" component={Host} />
        <NativeStack.Screen name="HostRoom" component={HostRoom} />
        <NativeStack.Screen name="Join" component={Join} />
        <NativeStack.Screen name="PlayerRoom" component={PlayerRoom} />
      </NativeStack.Group>
      <NativeStack.Group screenOptions={{ presentation: 'modal' }}>
        <NativeStack.Screen name="NetworkInformation" component={NetworkInfo} />
      </NativeStack.Group>

    </NativeStack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <MyNativeStack />
    </NavigationContainer>
  )
}

export default App;