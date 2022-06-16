// In App.js in a new project

//Dependency imports 
import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

//navigation declaration
const Tab = createBottomTabNavigator();
//variable to contain json file
const ordersData = require("./assets/data/orders.json");

//home screen function
function HomeScreen() {
  return (
    <View style={styles.container}>
     <Text>Home Screen</Text>
    </View>
  );
}

//consult screen function
function ConsultScreen() {
  return (
    <View style={styles.container}>
      <Text>Consult Screen</Text>
    </View>
  );
}

//order screen function
function OrderScreen() {

  //declaration of variables to use for data access
  const [isLoading, setLoading] =  useState(true);
  const [data, setData] = useState([]);

  //fetching data
  useEffect(() => {
    fetch(ordersData)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.log(error))
    .finally(setLoading(false));

  }, []);

  //return view of data
  return (
    <SafeAreaView style={styles.container}>
     {isLoading ? (
       <ActivityIndicator />
     ) : (
       <FlatList data={data} keyExtractor={({ orderID }, index) => orderID}
       renderItem={({ item }) => (
        <Text>
        {item.orderStatus}
        {item.pharmacyName}
        {item.orderTotal}
        </Text>
       )}
       />
     )}
    </SafeAreaView>
  );
}

//profile screen function
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

//stylesheet for screens
const styles = StyleSheet.create({
  container:{
     flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: "#fff"
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        //styling of the bottom tab bar
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                //setting icons for the nav bottom bars
                <Ionicons
                  name={
                    focused
                      ? 'ios-home'
                      : 'ios-home'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Consults') {
              return (
                <Ionicons
                  name={focused ? 'ios-chatbox' : 'ios-chatbox'}
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Orders') {
              return (
                <Ionicons
                  name={focused ? 'ios-cart' : 'ios-cart'}
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Profile') {
              return (
                <Ionicons
                  name={focused ? 'ios-person' : 'ios-person'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          //setting colours for the bottom nav bar icons
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'aqua',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Consults" component={ConsultScreen} options={{ tabBarBadge: 0 }} />
        <Tab.Screen name="Orders" component={OrderScreen} options={{ tabBarBadge: 0 }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      
      </Tab.Navigator>
    </NavigationContainer>
  );
}