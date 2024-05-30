import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4361ee',
        tabBarInactiveTintColor: '#FAF9F6',
        headerShown: useClientOnlyValue(false, true),
        tabBarInactiveBackgroundColor: '#4361ee',
        tabBarActiveBackgroundColor: '#FAF9F6'
      }}>
        <Tabs.Screen
        name="roundList"
          options={{
            title: 'Saved Rounds',
            headerTitleStyle: {color: '#4361ee'},
            headerTintColor: '#FAF9F6',
            headerStyle: styles.bgColor,
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          }}
        />
        <Tabs.Screen
        name="index"
        options={{
          title: 'Scorecard',
          headerTitleStyle: {color: '#4361ee'},
          headerTintColor: '#FAF9F6',
          headerStyle: styles.bgColor,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="roulette"
        options={{
          title: 'Roulette',
          headerTitleStyle: {color: '#4361ee'},
          headerTintColor: '#FAF9F6',
          headerStyle: styles.bgColor,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#4361ee',
    height: 70,
  },
});