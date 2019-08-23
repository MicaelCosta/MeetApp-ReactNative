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
                App: createBottomTabNavigator({
                    Dashboard,
                    Inscricoes,
                    Perfil,
                }),
            },
            {
                initialRouteName: isSigned ? 'App' : 'Sign',
            }
        )
    );
