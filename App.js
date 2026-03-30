import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import InstructorHomepage from './Instructor/InstructorHomepage';
import SelectGroup from './Instructor/SelectGroup';
import ManagerHomepage from './Manager/ManagerHomepage';
import ManagerCenterSettings from './Manager/ManagerCenterSettings';
import ManagerSystemReports from './Manager/ManagerSystemReports';
import ParentHomepage from './Parent/ParentHomepage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="InstructorHomepage" component={InstructorHomepage} />
        <Stack.Screen name="SelectGroup" component={SelectGroup} />
        <Stack.Screen name="ManagerHomepage" component={ManagerHomepage} />
        <Stack.Screen name="ManagerCenterSettings" component={ManagerCenterSettings} />
        <Stack.Screen name="ManagerSystemReports" component={ManagerSystemReports} />
        <Stack.Screen name="ParentHomepage" component={ParentHomepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
