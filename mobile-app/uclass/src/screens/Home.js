import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { NavigationContainer } from "@react-navigation/native"

import ScheduleTab from "./tabs/schedule/Schedule"
import ClassesTab from "./tabs/classes/Classes"
import FriendsTab from "./tabs/friends/Friends"
import AccountTab from "./tabs/account/Account"

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCalendar, faAddressBook, faUserFriends, faCog } from "@fortawesome/free-solid-svg-icons"

import { colors, screen } from "../constants"

const HomeScreen = ({ session }) => {
    const Tab = createBottomTabNavigator()

    const icons = {
        Schedule: faCalendar,
        Classes: faAddressBook,
        Friends: faUserFriends,
        Account: faCog
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                lazy: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    height: 70 + screen.bottom,
                    paddingTop: 10
                },
                tabBarLabelStyle: {
                    marginTop: 2,
                    fontSize: 10
                },
                tabBarActiveTintColor: colors.red,
                tabBarInactiveTintColor: colors.darkGrey,
                tabBarIcon: ({ focused, color, size }) => <FontAwesomeIcon icon={icons[route.name]} color={color} size={24} />
            })}>
                <Tab.Screen name={"Schedule"} component={ScheduleTab} />
                <Tab.Screen name={"Classes"} component={ClassesTab} />
                <Tab.Screen name={"Friends"} component={FriendsTab} />
                <Tab.Screen name={"Account"} component={AccountTab} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default HomeScreen