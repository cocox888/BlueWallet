import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, StyleSheet, Platform, Pressable, Text } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { BlueText, BlueSpacing20, BlueCard, BlueHeaderDefaultSub, BlueSpacing40 } from '../../BlueComponents';
import loc from '../../loc';
import { BlueStorageContext } from '../../blue_modules/storage-context';
import { useTheme } from '../../components/themes';
import ListItem from '../../components/ListItem';
import A from '../../blue_modules/analytics';
import { useSettings } from '../../components/Context/SettingsContext';
import { setBalanceDisplayAllowed } from '../../components/WidgetCommunication';

enum SettingsPrivacySection {
  None,
  All,
  ReadClipboard,
  QuickActions,
  Widget,
}

const SettingsPrivacy: React.FC = () => {
  const { colors } = useTheme();
  const { isStorageEncrypted } = useContext(BlueStorageContext);
  const {
    isDoNotTrackEnabled,
    setDoNotTrackStorage,
    setIsPrivacyBlurEnabledState,
    isWidgetBalanceDisplayAllowed,
    setIsWidgetBalanceDisplayAllowedStorage,
    isClipboardGetContentEnabled,
    setIsClipboardGetContentEnabledStorage,
    isQuickActionsEnabled,
    setIsQuickActionsEnabledStorage,
  } = useSettings();
  const [isLoading, setIsLoading] = useState<number>(SettingsPrivacySection.All);

  const [storageIsEncrypted, setStorageIsEncrypted] = useState<boolean>(true);
  const [isPrivacyBlurEnabledTapped, setIsPrivacyBlurEnabledTapped] = useState<number>(0);
  const styleHooks = StyleSheet.create({
    root: {
      backgroundColor: colors.background,
    },
    widgetsHeader: {
      color: colors.foregroundColor,
    },
  });

  useEffect(() => {
    (async () => {
      try {
        setStorageIsEncrypted(await isStorageEncrypted());
      } catch (e) {
        console.log(e);
      }
      setIsLoading(SettingsPrivacySection.None);
    })();
  }, [isStorageEncrypted]);

  const onDoNotTrackValueChange = async (value: boolean) => {
    setIsLoading(SettingsPrivacySection.All);
    try {
      setDoNotTrackStorage(value);
      A.setOptOut(value);
    } catch (e) {
      console.debug('onDoNotTrackValueChange catch', e);
    }
    setIsLoading(SettingsPrivacySection.None);
  };

  const onQuickActionsValueChange = async (value: boolean) => {
    setIsLoading(SettingsPrivacySection.QuickActions);
    try {
      setIsQuickActionsEnabledStorage(value);
    } catch (e) {
      console.debug('onQuickActionsValueChange catch', e);
    }
    setIsLoading(SettingsPrivacySection.None);
  };

  const onWidgetsTotalBalanceValueChange = async (value: boolean) => {
    setIsLoading(SettingsPrivacySection.Widget);
    try {
      await setBalanceDisplayAllowed(value);
      setIsWidgetBalanceDisplayAllowedStorage(value);
    } catch (e) {
      console.debug('onWidgetsTotalBalanceValueChange catch', e);
    }
    setIsLoading(SettingsPrivacySection.None);
  };

  const openApplicationSettings = () => {
    openSettings();
  };

  const onDisablePrivacyTapped = () => {
    setIsPrivacyBlurEnabledState(!(isPrivacyBlurEnabledTapped >= 10));
    setIsPrivacyBlurEnabledTapped(prev => prev + 1);
  };

  return (
    <ScrollView style={[styles.root, styleHooks.root]} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      {Platform.OS === 'android' ? <BlueHeaderDefaultSub leftText={loc.settings.general} /> : null}
      <ListItem
        hideChevron
        title={loc.settings.privacy_read_clipboard}
        Component={TouchableWithoutFeedback}
        switch={{
          onValueChange: setIsClipboardGetContentEnabledStorage,
          value: isClipboardGetContentEnabled,
          disabled: isLoading === SettingsPrivacySection.All,
          testID: 'ClipboardSwitch',
        }}
      />
      <BlueCard>
        <Pressable accessibilityRole="button" onPress={onDisablePrivacyTapped}>
          <BlueText>{loc.settings.privacy_clipboard_explanation}</BlueText>
        </Pressable>
      </BlueCard>
      <BlueSpacing20 />
      {!storageIsEncrypted && (
        <>
          <ListItem
            hideChevron
            title={loc.settings.privacy_quickactions}
            Component={TouchableWithoutFeedback}
            switch={{
              onValueChange: onQuickActionsValueChange,
              value: isQuickActionsEnabled,
              disabled: isLoading === SettingsPrivacySection.All,
              testID: 'QuickActionsSwitch',
            }}
          />
          <BlueCard>
            <BlueText>{loc.settings.privacy_quickactions_explanation}</BlueText>
          </BlueCard>
        </>
      )}
      <ListItem
        hideChevron
        title={loc.settings.privacy_do_not_track}
        Component={TouchableWithoutFeedback}
        switch={{ onValueChange: onDoNotTrackValueChange, value: isDoNotTrackEnabled, disabled: isLoading === SettingsPrivacySection.All }}
      />
      <BlueCard>
        <BlueText>{loc.settings.privacy_do_not_track_explanation}</BlueText>
      </BlueCard>
      {Platform.OS === 'ios' && !storageIsEncrypted && (
        <>
          <BlueSpacing40 />
          <Text adjustsFontSizeToFit style={[styles.widgetsHeader, styleHooks.widgetsHeader]}>
            {loc.settings.widgets}
          </Text>
          <ListItem
            hideChevron
            title={loc.settings.total_balance}
            Component={TouchableWithoutFeedback}
            switch={{
              onValueChange: onWidgetsTotalBalanceValueChange,
              value: isWidgetBalanceDisplayAllowed,
              disabled: isLoading === SettingsPrivacySection.All,
            }}
          />
          <BlueCard>
            <BlueText>{loc.settings.total_balance_explanation}</BlueText>
          </BlueCard>
        </>
      )}
      <BlueSpacing20 />

      <BlueSpacing20 />
      <ListItem title={loc.settings.privacy_system_settings} chevron onPress={openApplicationSettings} testID="PrivacySystemSettings" />
      <BlueSpacing20 />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  widgetsHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 17,
  },
});

export default SettingsPrivacy;
