import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './Homepage';
import InstructorHomepage from './Instructor/InstructorHomepage';
import SelectGroup from './Instructor/SelectGroup';
import GroupDetails from './Instructor/GroupDetails';
import ChildList from './Instructor/ChildList';
import ChildProfile from './Instructor/ChildProfile';
import ManagerHomepage from './Manager/ManagerHomepage';
import ManagerCenterSettings from './Manager/ManagerCenterSettings';
import ManagerSystemReports from './Manager/ManagerSystemReports';
import ManagerManageChildren from './Manager/ManagerManageChildren';
import ManagerManageInstructors from './Manager/ManagerManageInstructors';
import ManagerAttendanceReport from './Manager/ManagerAttendanceReport';
import ParentHomepage from './Parent/ParentHomepage';
import ParentChat from './Parent/ParentChat';
import ParentProgressReport from './Parent/ParentProgressReport';
import ParentScheduleMeeting from './Parent/ParentScheduleMeeting';
import ParentScheduleMeetingNew from './Parent/ParentScheduleMeetingNew';
import EditAchievement from './Instructor/EditAchievement';
import CreateGroup from './Instructor/CreateGroup';
import LoginPage from './LoginPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="InstructorHomepage" component={InstructorHomepage} />
        <Stack.Screen name="SelectGroup" component={SelectGroup} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="ChildList" component={ChildList} />
        <Stack.Screen name="ChildProfile" component={ChildProfile} />
        <Stack.Screen name="ManagerHomepage" component={ManagerHomepage} />
        <Stack.Screen name="ManagerCenterSettings" component={ManagerCenterSettings} />
        <Stack.Screen name="ManagerSystemReports" component={ManagerSystemReports} />
        <Stack.Screen name="ManagerAttendanceReport" component={ManagerAttendanceReport} />
        <Stack.Screen name="ManagerManageChildren" component={ManagerManageChildren} />
        <Stack.Screen name="ManagerManageInstructors" component={ManagerManageInstructors} />
        <Stack.Screen name="ParentHomepage" component={ParentHomepage} />
        <Stack.Screen name="ParentChat" component={ParentChat} />
        <Stack.Screen name="ParentProgressReport" component={ParentProgressReport} />
        <Stack.Screen name="ParentScheduleMeetingNew" component={ParentScheduleMeetingNew} />
        <Stack.Screen name="ParentScheduleMeeting" component={ParentScheduleMeeting} />
        <Stack.Screen name="EditAchievement" component={EditAchievement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
