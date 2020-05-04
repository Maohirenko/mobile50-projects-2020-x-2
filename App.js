import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Movie from "./components/MovieScreen.js";
import Search from "./components/SearchScreen.js";

const Stack = createStackNavigator();
const width_proportion = '90%';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search" screenOptions={{
        headerStyle: { backgroundColor: '#0ca7c9' },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: 'Home', headerStyle: {
              backgroundColor: '#fff',
            }, headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            }, headerTintColor: '#000', headerTitleAlign: "left",
          }} />
        <Stack.Screen
          name="Movie"
          component={Movie}
          options={({ route }) => ({
            title: route.params.name, id: route.params.id, headerStyle: {
              backgroundColor: '#fff'
            }, headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              width: width_proportion,
            }, headerTintColor: '#000', headerTitleAlign: "left",
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
