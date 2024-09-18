import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from '../pages/Welcome_new'
import SignUp from '../pages/Signup_new'
import CadastroPage from '../pages/Cadastro'
import PageMain from '../pages/Main'
import EnviarSMS from '../pages/Portaria'
import Info from '../pages/Info';
import Ouvidoria from '../pages/Ouvidoria';
import Reservas from '../pages/Reservas';
import BannerAd from '../pages/Banners';
import SendMessageScreen from '../pages/Portaria';
import BoletosScreen from '../pages/Fatura';
import Assembleias from '../pages/Assembleia';
import Monitoramento from '../pages/Monitoramento';
import { ConsultaPage } from '../pages/Consulta';
import FirstAccessPage from '../pages/First_Access';
import InterfoneScreen from '../pages/Interfone';
import BlocosApartamentosScreen from '../pages/Interfone';
import ChamadaScreen from '../pages/Interfone';
import ChatScreen from '../pages/Chat';
import TestCallScreen from '../pages/Interfone';
import LoginPage from '../pages/Signup_new';





const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={LoginPage} options={{headerShown: false}}/>
            <Stack.Screen name="Cadastro" component={CadastroPage} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={PageMain} options={{headerShown: false}}/>
            <Stack.Screen name="EnviarSMS" component={EnviarSMS} options={{headerShown: false}}/>
            <Stack.Screen name="Info" component={Info} options={{headerShown: false}}/>
            <Stack.Screen name="Ouvidoria" component={Ouvidoria} options={{headerShown: false}}/>
            <Stack.Screen name="Reservas" component={Reservas} options={{headerShown: false}}/>
            <Stack.Screen name="Banners" component={BannerAd} options={{headerShown: false}}/>
            <Stack.Screen name="Portaria" component={SendMessageScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Fatura" component={BoletosScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Assembleia" component={Assembleias} options={{headerShown: false}}/>
            <Stack.Screen name="Monitoramento" component={Monitoramento} options={{headerShown: false}}/>
            <Stack.Screen name="Consulta" component={ConsultaPage} options={{headerShown: false}}/>
            <Stack.Screen name="First_Access" component={FirstAccessPage} options={{headerShown: false}}/>
            <Stack.Screen name="Interfone" component={TestCallScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )

}


//