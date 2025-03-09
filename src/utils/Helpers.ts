import { Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS, check} from 'react-native-permissions';


export const requestCamPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const status = await check(permission);

  if (status === RESULTS.GRANTED) {
    console.log('Camera permission already granted');
    return true;
  } else if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
    const newStatus = await request(permission);
    return newStatus === RESULTS.GRANTED;
  } else {
    return false;
  }
};

export const logger = (text: string, obj: any) => {
  console.log(`LOGG => ${text}`, obj)
}