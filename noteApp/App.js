import { View, Text } from 'react-native'
import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNote from './pages/AddNote'
import MyNotes from './pages/MyNotes'
import LogOut from './pages/LogOut'
import EditNote from './pages/EditNote'
import ViewNote from './pages/ViewNote'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="LogOut" component={LogOut} options={{ headerShown: false }} />
        <Stack.Screen name="AddNote" component={AddNote} options={{ headerStyle: { backgroundColor: '#A0D7F6', }, headerTintColor: 'white', headerTitle: 'Add Your Note' }} />
        <Stack.Screen name="MyNotes" component={MyNotes} options={{ headerStyle: { backgroundColor: '#A0D7F6', }, headerTintColor: 'white', headerTitle: 'View All Notes' }} />
        <Stack.Screen name="EditNote" component={EditNote} options={{ headerStyle: { backgroundColor: '#A0D7F6', }, headerTintColor: 'white', headerTitle: 'Edit Your Note' }} />
        <Stack.Screen name="ViewNote" component={ViewNote} options={{ headerStyle: { backgroundColor: '#A0D7F6', }, headerTintColor: 'white', headerTitle: 'View Your Note' }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}