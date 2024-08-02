import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Easing, ViewStyle } from 'react-native';
import BottomModal, { BottomModalHandle } from './BottomModal';
import { useTheme } from './themes';
import loc from '../loc';
import { SecondButton } from './SecondButton';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../blue_modules/hapticFeedback';

export const MODAL_TYPES = {
  ENTER_PASSWORD: 'ENTER_PASSWORD',
  CREATE_PASSWORD: 'CREATE_PASSWORD',
  SUCCESS: 'SUCCESS',
} as const;

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];

interface PromptPasswordConfirmationModalProps {
  modalType: ModalType;
  onConfirmationSuccess: (password: string) => Promise<boolean>;
  onConfirmationFailure: () => void;
}

export interface PromptPasswordConfirmationModalHandle {
  present: () => Promise<void>;
  dismiss: () => Promise<void>;
}

const PromptPasswordConfirmationModal = forwardRef<PromptPasswordConfirmationModalHandle, PromptPasswordConfirmationModalProps>(
  ({ modalType, onConfirmationSuccess, onConfirmationFailure }, ref) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const modalRef = useRef<BottomModalHandle>(null);
    const fadeOutAnimation = useRef(new Animated.Value(1)).current;
    const fadeInAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const stylesHook = StyleSheet.create({
      modalContent: {
        backgroundColor: colors.elevated,
        width: '100%',
      },
      input: {
        backgroundColor: colors.inputBackgroundColor,
        borderColor: colors.formBorder,
        color: colors.foregroundColor,
        width: '100%',
      },
      feeModalCustomText: {
        color: colors.buttonAlternativeTextColor,
      },
      feeModalLabel: {
        color: colors.successColor,
      },
    });

    useImperativeHandle(ref, () => ({
      present: async () => {
        resetState();
        modalRef.current?.present();
        if (modalType === MODAL_TYPES.CREATE_PASSWORD) {
          passwordInputRef.current?.focus();
        } else if (modalType === MODAL_TYPES.ENTER_PASSWORD) {
          passwordInputRef.current?.focus();
        }
      },
      dismiss: async () => modalRef.current?.dismiss(),
    }));

    const resetState = () => {
      setPassword('');
      setConfirmPassword('');
      setIsSuccess(false);
      setIsLoading(false);
      fadeOutAnimation.setValue(1);
      fadeInAnimation.setValue(0);
      scaleAnimation.setValue(1);
      shakeAnimation.setValue(0);
    };

    const handleShakeAnimation = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]).start(() => {
        confirmPasswordInputRef.current?.focus();
        confirmPasswordInputRef.current?.setNativeProps({ selection: { start: 0, end: confirmPassword.length } });
      });
    };

    const handleSuccessAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeOutAnimation, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsSuccess(true);
        Animated.timing(fadeInAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            modalRef.current?.dismiss();
          }, 1000);
        });
      });
    };

    const handleSubmit = async () => {
      setIsLoading(true);
      let success = false;
      if (modalType === MODAL_TYPES.CREATE_PASSWORD) {
        if (password === confirmPassword && password) {
          success = await onConfirmationSuccess(password);
          if (success) {
            triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
            handleSuccessAnimation();
          } else {
            triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
            setIsLoading(false);
            onConfirmationFailure();
          }
        } else {
          setIsLoading(false);
          handleShakeAnimation();
          triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
        }
      } else if (modalType === MODAL_TYPES.ENTER_PASSWORD) {
        success = await onConfirmationSuccess(password);
        setIsLoading(false);
        if (success) {
          triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
          handleSuccessAnimation();
        } else {
          handleShakeAnimation();
          triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
        }
      }
    };

    const handleCancel = async () => {
      resetState();
      onConfirmationFailure();
      await modalRef.current?.dismiss();
    };

    useEffect(() => {
      resetState();
      if (modalType === MODAL_TYPES.CREATE_PASSWORD) {
        passwordInputRef.current?.focus();
      } else if (modalType === MODAL_TYPES.ENTER_PASSWORD) {
        passwordInputRef.current?.focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalType]);

    const animatedViewStyle: Animated.WithAnimatedObject<ViewStyle> = {
      opacity: fadeOutAnimation,
      transform: [{ scale: scaleAnimation }],
      width: '100%',
    };

    return (
      <BottomModal
        ref={modalRef}
        showCloseButton={false}
        onDismiss={handleCancel}
        grabber={false}
        sizes={[350]}
        backgroundColor={colors.modal}
        contentContainerStyle={styles.modalContent}
        footer={
          (!isSuccess && (
            <Animated.View style={{ opacity: fadeOutAnimation, transform: [{ scale: scaleAnimation }] }}>
              <View style={styles.feeModalFooter}>
                <SecondButton testID="CancelButton" title={loc._.cancel} onPress={handleCancel} disabled={isLoading} />
                <View style={styles.feeModalFooterSpacing} />
                <SecondButton
                  title={isLoading ? '' : loc._.ok}
                  onPress={handleSubmit}
                  testID="OKButton"
                  loading={isLoading}
                  disabled={isLoading || !password || (modalType === MODAL_TYPES.CREATE_PASSWORD && !confirmPassword)}
                />
              </View>
            </Animated.View>
          )) ||
          null
        }
      >
        {!isSuccess && (
          <Animated.View style={animatedViewStyle}>
            <Text style={[styles.textLabel, stylesHook.feeModalLabel]}>
              {modalType === MODAL_TYPES.CREATE_PASSWORD ? loc.settings.password_explain : loc._.enter_password}
            </Text>
            <View style={styles.inputContainer}>
              <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                <TextInput
                  testID="PasswordInput"
                  ref={passwordInputRef}
                  secureTextEntry
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.input, stylesHook.input]}
                  autoFocus
                  onSubmitEditing={handleSubmit} // Handle Enter key as OK
                />
              </Animated.View>
              {modalType === MODAL_TYPES.CREATE_PASSWORD && (
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                  <TextInput
                    testID="ConfirmPasswordInput"
                    ref={confirmPasswordInputRef}
                    secureTextEntry
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={[styles.input, stylesHook.input]}
                    onSubmitEditing={handleSubmit} // Handle Enter key as OK
                  />
                </Animated.View>
              )}
            </View>
          </Animated.View>
        )}
        {isSuccess && (
          <Animated.View
            style={{
              opacity: fadeInAnimation,
              transform: [{ scale: scaleAnimation }],
            }}
          >
            <View style={styles.successContainer}>
              <View style={styles.circle}>
                <Text style={styles.checkmark}>✔️</Text>
              </View>
            </View>
          </Animated.View>
        )}
      </BottomModal>
    );
  },
);

export default PromptPasswordConfirmationModal;

const styles = StyleSheet.create({
  modalContent: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%', // Ensure modal content takes full width
  },
  feeModalFooter: {
    paddingBottom: 36,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeModalFooterSpacing: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%', // Ensure full width
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    fontSize: 16,
    width: '100%', // Ensure full width
  },
  textLabel: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 30,
  },
});
