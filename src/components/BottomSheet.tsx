import {Colors} from '@constants/Colors';
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  View,
  GestureResponderEvent,
  PanResponderGestureState,
  ModalProps,
  KeyboardAvoidingViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CustomStyles {
  wrapper?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  draggableIndicatorContainer?: StyleProp<ViewStyle>;
  draggableIndicator?: StyleProp<ViewStyle>;
}

interface BottomSheetProps {
  height?: number;
  openAnimationDuration?: number;
  closeAnimationDuration?: number;
  closeOnBackgroundPress?: boolean;
  closeOnBackPress?: boolean;
  showIndicator?: boolean;
  draggable?: boolean;
  customStyles?: CustomStyles;
  modalProps?: Partial<ModalProps>;
  avoidingViewProps?: Partial<KeyboardAvoidingViewProps>;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface BottomSheetRef {
  show: () => void;
  hide: () => void;
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const {
      height = 300,
      openAnimationDuration = 300,
      closeAnimationDuration = 200,
      closeOnBackgroundPress = true,
      closeOnBackPress = true,
      showIndicator = true,
      draggable = true,
      customStyles = {},
      draggableIndicatorContainer = {},
      modalProps = {},
      avoidingViewProps = {},
      onOpen,
      onClose,
      children,
    } = props;

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const animatedTranslateY = useRef(new Animated.Value(height)).current; // Starts off-screen
    const pan = useRef(new Animated.Value(0)).current; // Drag position for PanResponder

    useImperativeHandle(ref, () => ({
      show: () => toggleSheet(true),
      hide: () => toggleSheet(false),
    }));

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => draggable,
          onMoveShouldSetPanResponder: (
            _e: GestureResponderEvent,
            gestureState: PanResponderGestureState,
          ) => draggable && gestureState.dy > 0,
          onPanResponderMove: Animated.event([null, {dy: pan}], {
            useNativeDriver: false,
          }),
          onPanResponderRelease: (
            _e: GestureResponderEvent,
            gestureState: PanResponderGestureState,
          ) => {
            if (gestureState.dy > 100) {
              toggleSheet(false);
            } else {
              resetPanPosition();
            }
          },
        }),
      [draggable, pan],
    );

    const toggleSheet = (visible: boolean): void => {
      if (visible) {
        setIsVisible(true);
        onOpen?.();
        Animated.timing(animatedTranslateY, {
          toValue: 0,
          duration: openAnimationDuration,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(animatedTranslateY, {
          toValue: height,
          duration: closeAnimationDuration,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false);
          resetPanPosition();
          onClose?.();
        });
      }
    };

    const resetPanPosition = (): void => {
      pan.setValue(0); // Reset pan to zero to prevent unintended translations
    };

    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={closeOnBackPress ? () => toggleSheet(false) : undefined}
        {...modalProps}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[styles.background, customStyles.wrapper]}
          {...avoidingViewProps}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={
              closeOnBackgroundPress ? () => toggleSheet(false) : undefined
            }
          />
          <Animated.View
            style={[
              styles.sheetContainer,
              {
                transform: [
                  {
                    translateY: Animated.add(animatedTranslateY, pan),
                  },
                ],
              },
              {height: height},
              customStyles.container,
            ]}>
            {draggable && (
              <View
                style={styles.dragIndicatorWrapper}
                {...panResponder.panHandlers}>
                <View
                  style={[
                    styles.dragIndicatorBlock,
                    customStyles.draggableIndicatorContainer,
                  ]}>
                  <View
                    style={[
                      styles.dragIndicator,
                      customStyles.draggableIndicator,
                    ]}
                  />
                </View>
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00000077',
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  sheetContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',

    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dragIndicatorWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  dragIndicatorBlock: {
    width: '100%',
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragIndicator: {
    width: '15%',
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default BottomSheet;
