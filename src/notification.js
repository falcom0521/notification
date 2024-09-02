import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const NotificationScreen = () => {
  const token = "959|q5zUTfyJPzCiS5ITfSC6ON0k2V0f2hbTufvtkOPPceab9f41";
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://18.237.111.97:2000/api/notifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.status === "success") {
        setNotifications(result.data); // Use 'data' array from the response
      } else {
        console.error('Failed to fetch notifications:', result.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.notificationItem,
        { backgroundColor: item.is_read ? 'white' : '#grey' }, // Change color if unread
      ]}
    >
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/blue.png')} // Replace with your icon path
          style={styles.notificationIcon}
          resizeMode="contain"
        />
        {notifications.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread_count}</Text>
          </View>
        )}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.message}</Text>
        <Text style={styles.notificationDate}>{new Date(item.created_at).toLocaleString()}</Text>
      </View>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.Header}>
          <TouchableOpacity onPress={fetchNotifications}>
            <Text style={styles.Headertext}>Notifications</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Vector.png')}
              style={styles.HeaderImage}
              resizeMode="cover"
            />
            {notifications.length > 0 && (
              <View style={styles.badgeHeader}>
                <Text style={styles.badgeText}>{notifications.length}</Text>
              </View>
            )}
          </View>
        </View>
        
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignContent: 'center',
  },
  Headertext: {
    fontSize: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  HeaderImage: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  badgeHeader: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
  filter: {
    flexDirection: 'row',
    paddingLeft: moderateScale(10),
  },
  filterlatest: {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  filterContent: {
    fontSize: 18,
  },
  filterprevious: {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
  notificationList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'grey',
    alignItems: 'center',
    borderRadius:10,
    marginBottom:20,
    height:moderateScale(80)
  },
  iconContainer: {
    position: 'relative',
  },
  notificationIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 16,
  },
  notificationDate: {
    fontSize: 14,
    
    textAlign: 'right',
  },
});

export default NotificationScreen;
