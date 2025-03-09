import {Text} from '@components/index';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {
  NativeStackScreenProps,
  RootStackParamList,
  SCREENS,
} from '@navigation/index';
import {Header, SettingOptionButton} from '@components/index';
import {useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {LOGO_ICON, LOGOUT_ICON} from '@assets/svg';

interface ScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'More'> {}

const More: React.FC<ScreenProps> = ({route, navigation}) => {
  const dispatch = useDispatch();
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://via.placeholder.com/150', // Replace with a real image URL
  };

  const logout = async () => {};

  return (
    <View style={styles.container}>
      <Header heading="Profile" />
      <View
        style={{marginTop: 20, alignItems: 'center', paddingHorizontal: 16}}>
        <Image source={{uri: user.profileImage}} style={styles.profileImage} />
        {/* User Name */}
        <Text style={styles.name}>{user.name}</Text>

        {/* User Email */}
        <Text style={styles.email}>{user.email}</Text>
        <SettingOptionButton
          onPress={logout}
          textColor={'#sFF6347'}
          text={'Logout'}
          Icon={<SvgXml width={'17'} height={'15'} xml={LOGOUT_ICON} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default More;
