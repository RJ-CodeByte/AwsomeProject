// import { View, Text } from 'react-native'
// import React from 'react';
// import Home from '~/screen/home';
// import { Provider } from 'react-redux';
// import setupStore, { persistor } from '~/store/store.index';
// import { PersistGate } from 'redux-persist/integration/react';

// const App = () => {
//   return (
//     <Provider store={setupStore}>
// <PersistGate loading={null} persistor={persistor}>
//       <Home />
// </PersistGate>
//     </Provider>
//   )
// }

// export default App


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from 'react-native';
import config from 'react-native-config';


const iStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    greetingContainer: {
        // borderColor: AppColors.green,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    font: {
        fontWeight: '700',
    },
    greetingText: {
        // color: AppColors.black,
        marginTop: 5,
    },
});

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundColor = isDarkMode ? 'black' : 'white';

    const isFrom = config.APP_CONFIG ?? '';
    const isUrl = config.APP_URL ?? '';

    return (
        <SafeAreaView style={[iStyles.screenContainer, { backgroundColor }]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundColor}
            />
            <View style={iStyles.container}>
                <View style={iStyles.greetingContainer}>
                    <Text style={[iStyles.greetingText, iStyles.font]}>
                        Hi Sathish K,
                    </Text>
                    <Text style={[iStyles.greetingText, iStyles.font]}>
                        {`I am from ${isFrom}`}
                        {`I am from ${isUrl}`}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default App;