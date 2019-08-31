import {
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Inscricoes from './pages/Inscricoes';
import Perfil from './pages/Perfil';

export default (isSigned = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn,
                    SignUp,
                }),
                App: createBottomTabNavigator(
                    {
                        Dashboard,
                        Inscricoes,
                        Perfil,
                    },
                    {
                        resetOnBlur: true,
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#fff',
                            inactiveTintColor: 'rgba(255,255,255,0.6)',
                            style: {
                                backgroundColor: '#000',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: isSigned ? 'App' : 'Sign',
                // initialRouteName: 'App',
            }
        )
    );
