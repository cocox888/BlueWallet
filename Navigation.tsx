import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useMemo } from 'react';
import { I18nManager, Platform, TouchableOpacity } from 'react-native';
import AddWalletStack from './navigation/AddWalletStack';
import { StackActions } from '@react-navigation/native';

import WalletAddresses from './screen/wallets/addresses';
import WalletDetails from './screen/wallets/details';
import GenerateWord from './screen/wallets/generateWord';
import WalletsList from './screen/wallets/WalletsList';
import SelectWallet from './screen/wallets/selectWallet';
import WalletTransactions from './screen/wallets/transactions';

import CPFP from './screen/transactions/CPFP';
import RBFBumpFee from './screen/transactions/RBFBumpFee';
import RBFCancel from './screen/transactions/RBFCancel';
import TransactionDetails from './screen/transactions/details';
import TransactionStatus from './screen/transactions/TransactionStatus';

import Broadcast from './screen/send/Broadcast';
import IsItMyAddress from './screen/send/isItMyAddress';
import Success from './screen/send/success';

import UnlockWith from './screen/UnlockWith';
import { isDesktop, isHandset } from './blue_modules/environment';
import navigationStyle from './components/navigationStyle';
import { useTheme } from './components/themes';
import loc from './loc';
import LdkInfo from './screen/lnd/ldkInfo';
import LNDViewAdditionalInvoiceInformation from './screen/lnd/lndViewAdditionalInvoiceInformation';
import LNDViewAdditionalInvoicePreImage from './screen/lnd/lndViewAdditionalInvoicePreImage';
import LNDViewInvoice from './screen/lnd/lndViewInvoice';
import LnurlAuth from './screen/lnd/lnurlAuth';
import LnurlPay from './screen/lnd/lnurlPay';
import LnurlPaySuccess from './screen/lnd/lnurlPaySuccess';
import DrawerList from './screen/wallets/DrawerList';
import LdkViewLogs from './screen/wallets/ldkViewLogs';
import { BlueStorageContext } from './blue_modules/storage-context';
import { useIsLargeScreen } from './hooks/useIsLargeScreen';
import HeaderRightButton from './components/HeaderRightButton';
import WalletExportStack from './navigation/WalletExportStack';
import SendDetailsStack from './navigation/SendDetailsStack';
import LNDCreateInvoiceRoot from './navigation/LNDCreateInvoiceStack';
import ReceiveDetailsStackRoot from './navigation/ReceiveDetailsStack';
import ScanLndInvoiceRoot from './navigation/ScanLndInvoiceStack';
import { useExtendedNavigation } from './hooks/useExtendedNavigation';
import ReorderWalletsStackRoot from './navigation/ReorderWalletsStack';
import WalletXpubStackRoot from './navigation/WalletXpubStack';
import ScanQRCodeStackRoot from './navigation/ScanQRCodeStack';
import ExportMultisigCoordinationSetupStackRoot from './navigation/ExportMultisigCoordinationSetupStack';
import ViewEditMultisigCosignersStackRoot from './navigation/ViewEditMultisigCosignersStack';
import SignVerifyStackRoot from './navigation/SignVerifyStack';
import AztecoRedeemStackRoot from './navigation/AztecoRedeemStack';
import LDKOpenChannelRoot from './navigation/LDKOpenChannelStack';
import PaymentCodeStackRoot from './navigation/PaymentCodeStack';
import {
  AboutComponent,
  CurrencyComponent,
  DefaultViewComponent,
  ElectrumSettingsComponent,
  EncryptStorageComponent,
  GeneralSettingsComponent,
  LanguageComponent,
  LicensingComponent,
  LightningSettingsComponent,
  NetworkSettingsComponent,
  NotificationSettingsComponent,
  PlausibleDeniabilityComponent,
  ReleaseNotesComponent,
  SelftestComponent,
  SettingsComponent,
  SettingsPrivacyComponent,
  ToolsComponent,
} from './navigation/LazyLoadSettingsStack';
import { Icon } from 'react-native-elements';

export const NavigationDefaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'modal',
  headerShadowVisible: false,
};
export const NavigationFormModalOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'formSheet',
};
export const NavigationDefaultOptionsForDesktop: NativeStackNavigationOptions = { headerShown: false, presentation: 'fullScreenModal' };
export const StatusBarLightOptions: NativeStackNavigationOptions = { statusBarStyle: 'light' };

const DrawerListContent = (props: any) => {
  return <DrawerList {...props} />;
};

const Drawer = createDrawerNavigator();
const DrawerRoot = () => {
  const isLargeScreen = useIsLargeScreen();

  const drawerStyle: DrawerNavigationOptions = useMemo(
    () => ({
      drawerPosition: I18nManager.isRTL ? 'right' : 'left',
      drawerStyle: { width: isLargeScreen ? 320 : '0%' },
      drawerType: isLargeScreen ? 'permanent' : 'back',
    }),
    [isLargeScreen],
  );

  return (
    <Drawer.Navigator screenOptions={drawerStyle} drawerContent={DrawerListContent}>
      <Drawer.Screen
        name="DetailViewStackScreensStack"
        component={DetailViewStackScreensStack}
        options={{ headerShown: false, gestureHandlerProps: { enableTrackpadTwoFingerGesture: false } }}
      />
    </Drawer.Navigator>
  );
};

const DetailViewRoot = createNativeStackNavigator();
const DetailViewStackScreensStack = () => {
  const { walletsInitialized } = useContext(BlueStorageContext);
  const theme = useTheme();
  const navigation = useExtendedNavigation();

  const popToTop = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  const SaveButton = useMemo(() => <HeaderRightButton testID="Save" disabled={true} title={loc.wallets.details_save} />, []);

  const useWalletListScreenOptions = useMemo(() => {
    const SettingsButton = (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={loc._.more}
        testID="SettingsButton"
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon size={22} name="more-horiz" type="material" color={theme.colors.foregroundColor} />
      </TouchableOpacity>
    );

    return {
      title: '',
      headerBackTitle: loc.wallets.list_title,
      navigationBarColor: theme.colors.navigationBarColor,
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.customHeader,
      },
      headerRight: I18nManager.isRTL ? undefined : () => SettingsButton,
      headerLeft: I18nManager.isRTL ? () => SettingsButton : undefined,
    };
  }, [navigation, theme.colors.customHeader, theme.colors.foregroundColor, theme.colors.navigationBarColor]);

  const walletListScreenOptions = useWalletListScreenOptions;
  return (
    <DetailViewRoot.Navigator
      initialRouteName="UnlockWithScreen"
      screenOptions={{ headerShadowVisible: false, animationTypeForReplace: 'push' }}
    >
      {!walletsInitialized ? (
        <DetailViewRoot.Screen
          name="UnlockWithScreen"
          component={UnlockWith}
          options={{ headerShown: false, statusBarStyle: 'auto', autoHideHomeIndicator: true }}
        />
      ) : (
        <DetailViewRoot.Group>
          <DetailViewRoot.Screen name="WalletsList" component={WalletsList} options={navigationStyle(walletListScreenOptions)(theme)} />
          <DetailViewRoot.Screen
            name="WalletTransactions"
            component={WalletTransactions}
            options={WalletTransactions.navigationOptions(theme)}
          />
          <DetailViewRoot.Screen
            name="LdkOpenChannel"
            component={LDKOpenChannelRoot}
            options={navigationStyle({
              title: loc.lnd.new_channel,
              headerLargeTitle: true,
              statusBarStyle: 'auto',
              closeButton: true,
              headerBackVisible: false,
              gestureEnabled: false,
              closeButtonFunc: popToTop,
            })(theme)}
          />
          <DetailViewRoot.Screen name="LdkInfo" component={LdkInfo} options={LdkInfo.navigationOptions(theme)} />
          <DetailViewRoot.Screen
            name="WalletDetails"
            component={WalletDetails}
            options={navigationStyle({
              headerTitle: loc.wallets.details_title,
              statusBarStyle: 'auto',
              headerRight: () => SaveButton,
            })(theme)}
          />
          <DetailViewRoot.Screen name="LdkViewLogs" component={LdkViewLogs} options={LdkViewLogs.navigationOptions(theme)} />
          <DetailViewRoot.Screen
            name="TransactionDetails"
            component={TransactionDetails}
            options={TransactionDetails.navigationOptions(theme)}
          />
          <DetailViewRoot.Screen
            name="TransactionStatus"
            component={TransactionStatus}
            initialParams={{
              hash: undefined,
              walletID: undefined,
            }}
            options={navigationStyle({
              title: '',
              statusBarStyle: 'auto',
              headerStyle: {
                backgroundColor: theme.colors.customHeader,
              },
              headerRight: () => SaveButton,
            })(theme)}
          />
          <DetailViewRoot.Screen name="CPFP" component={CPFP} options={CPFP.navigationOptions(theme)} />
          <DetailViewRoot.Screen name="RBFBumpFee" component={RBFBumpFee} options={RBFBumpFee.navigationOptions(theme)} />
          <DetailViewRoot.Screen name="RBFCancel" component={RBFCancel} options={RBFCancel.navigationOptions(theme)} />

          <DetailViewRoot.Screen
            name="SelectWallet"
            component={SelectWallet}
            options={navigationStyle({ title: loc.wallets.select_wallet })(theme)}
          />
          <DetailViewRoot.Screen
            name="LNDViewInvoice"
            component={LNDViewInvoice}
            options={navigationStyle({
              statusBarStyle: 'auto',
              headerTitle: loc.lndViewInvoice.lightning_invoice,
              headerStyle: {
                backgroundColor: theme.colors.customHeader,
              },
            })(theme)}
          />
          <DetailViewRoot.Screen
            name="LNDViewAdditionalInvoiceInformation"
            component={LNDViewAdditionalInvoiceInformation}
            options={navigationStyle({ title: loc.lndViewInvoice.additional_info })(theme)}
          />
          <DetailViewRoot.Screen
            name="LNDViewAdditionalInvoicePreImage"
            component={LNDViewAdditionalInvoicePreImage}
            options={navigationStyle({ title: loc.lndViewInvoice.additional_info })(theme)}
          />

          <DetailViewRoot.Screen
            name="Broadcast"
            component={Broadcast}
            options={navigationStyle({ title: loc.send.create_broadcast })(theme)}
          />
          <DetailViewRoot.Screen name="IsItMyAddress" component={IsItMyAddress} options={IsItMyAddress.navigationOptions(theme)} />
          <DetailViewRoot.Screen name="GenerateWord" component={GenerateWord} options={GenerateWord.navigationOptions(theme)} />
          <DetailViewRoot.Screen
            name="LnurlPay"
            component={LnurlPay}
            options={navigationStyle({
              title: '',
              closeButton: true,
              closeButtonFunc: popToTop,
            })(theme)}
          />
          <DetailViewRoot.Screen
            name="LnurlPaySuccess"
            component={LnurlPaySuccess}
            options={navigationStyle({
              title: '',
              closeButton: true,
              headerBackVisible: false,
              gestureEnabled: false,
              closeButtonFunc: popToTop,
            })(theme)}
          />
          <DetailViewRoot.Screen name="LnurlAuth" component={LnurlAuth} options={LnurlAuth.navigationOptions(theme)} />
          <DetailViewRoot.Screen
            name="Success"
            component={Success}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <DetailViewRoot.Screen name="WalletAddresses" component={WalletAddresses} options={WalletAddresses.navigationOptions(theme)} />

          <DetailViewRoot.Screen name="AddWalletRoot" component={AddWalletStack} options={NavigationFormModalOptions} />
          <DetailViewRoot.Screen
            name="SendDetailsRoot"
            component={SendDetailsStack}
            options={isDesktop ? NavigationDefaultOptionsForDesktop : NavigationDefaultOptions}
          />
          <DetailViewRoot.Screen name="LNDCreateInvoiceRoot" component={LNDCreateInvoiceRoot} options={NavigationDefaultOptions} />
          <DetailViewRoot.Screen name="ScanLndInvoiceRoot" component={ScanLndInvoiceRoot} options={NavigationDefaultOptions} />
          <DetailViewRoot.Screen name="AztecoRedeemRoot" component={AztecoRedeemStackRoot} options={NavigationDefaultOptions} />
          {/* screens */}
          <DetailViewRoot.Screen
            name="WalletExportRoot"
            component={WalletExportStack}
            options={{ ...NavigationDefaultOptions, ...StatusBarLightOptions }}
          />
          <DetailViewRoot.Screen
            name="ExportMultisigCoordinationSetupRoot"
            component={ExportMultisigCoordinationSetupStackRoot}
            options={NavigationDefaultOptions}
          />
          <DetailViewRoot.Screen
            name="Settings"
            component={SettingsComponent}
            options={navigationStyle({
              headerTransparent: true,
              title: Platform.select({ ios: loc.settings.header, default: '' }),
              headerLargeTitle: true,
              headerShadowVisible: false,
              animationTypeForReplace: 'push',
            })(theme)}
          />
          <DetailViewRoot.Screen
            name="Currency"
            component={CurrencyComponent}
            options={navigationStyle({ title: loc.settings.currency })(theme)}
          />
          <DetailViewRoot.Screen
            name="GeneralSettings"
            component={GeneralSettingsComponent}
            options={navigationStyle({ title: loc.settings.general })(theme)}
          />
          <DetailViewRoot.Screen
            name="PlausibleDeniability"
            component={PlausibleDeniabilityComponent}
            options={navigationStyle({ title: loc.plausibledeniability.title })(theme)}
          />
          <DetailViewRoot.Screen
            name="Licensing"
            component={LicensingComponent}
            options={navigationStyle({ title: loc.settings.license })(theme)}
          />
          <DetailViewRoot.Screen
            name="NetworkSettings"
            component={NetworkSettingsComponent}
            options={navigationStyle({ title: loc.settings.network })(theme)}
          />
          <DetailViewRoot.Screen name="About" component={AboutComponent} options={navigationStyle({ title: loc.settings.about })(theme)} />
          <DetailViewRoot.Screen
            name="DefaultView"
            component={DefaultViewComponent}
            options={navigationStyle({ title: loc.settings.default_title })(theme)}
          />
          <DetailViewRoot.Screen
            name="ElectrumSettings"
            component={ElectrumSettingsComponent}
            options={navigationStyle({ title: loc.settings.electrum_settings_server })(theme)}
          />
          <DetailViewRoot.Screen
            name="EncryptStorage"
            component={EncryptStorageComponent}
            options={navigationStyle({ title: loc.settings.encrypt_title })(theme)}
          />
          <DetailViewRoot.Screen
            name="Language"
            component={LanguageComponent}
            options={navigationStyle({ title: loc.settings.language })(theme)}
          />
          <DetailViewRoot.Screen
            name="LightningSettings"
            component={LightningSettingsComponent}
            options={navigationStyle({ title: loc.settings.lightning_settings })(theme)}
          />
          <DetailViewRoot.Screen
            name="NotificationSettings"
            component={NotificationSettingsComponent}
            options={navigationStyle({ title: loc.settings.notifications })(theme)}
          />
          <DetailViewRoot.Screen
            name="Selftest"
            component={SelftestComponent}
            options={navigationStyle({ title: loc.settings.selfTest })(theme)}
          />
          <DetailViewRoot.Screen
            name="ReleaseNotes"
            component={ReleaseNotesComponent}
            options={navigationStyle({ title: loc.settings.about_release_notes })(theme)}
          />
          <DetailViewRoot.Screen name="Tools" component={ToolsComponent} options={navigationStyle({ title: loc.settings.tools })(theme)} />
          <DetailViewRoot.Screen
            name="SettingsPrivacy"
            component={SettingsPrivacyComponent}
            options={navigationStyle({ headerLargeTitle: true, title: loc.settings.privacy })(theme)}
          />
          <DetailViewRoot.Screen
            name="ViewEditMultisigCosignersRoot"
            component={ViewEditMultisigCosignersStackRoot}
            options={{ ...NavigationDefaultOptions, ...StatusBarLightOptions, gestureEnabled: false, fullScreenGestureEnabled: false }}
            initialParams={{ walletID: undefined, cosigners: undefined }}
          />
          <DetailViewRoot.Screen
            name="WalletXpubRoot"
            component={WalletXpubStackRoot}
            options={{ ...NavigationDefaultOptions, ...StatusBarLightOptions }}
          />
          <DetailViewRoot.Screen
            name="SignVerifyRoot"
            component={SignVerifyStackRoot}
            options={{ ...NavigationDefaultOptions, ...StatusBarLightOptions }}
          />
          <DetailViewRoot.Screen name="ReceiveDetailsRoot" component={ReceiveDetailsStackRoot} options={NavigationDefaultOptions} />
          <DetailViewRoot.Screen
            name="LDKOpenChannelRoot"
            component={LDKOpenChannelRoot}
            options={navigationStyle({
              title: loc.lnd.new_channel,
              headerLargeTitle: true,
              statusBarStyle: 'auto',
              closeButton: true,
              headerBackVisible: false,
              gestureEnabled: false,
              closeButtonFunc: popToTop,
            })(theme)}
          />

          <DetailViewRoot.Screen
            name="ScanQRCodeRoot"
            component={ScanQRCodeStackRoot}
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              statusBarHidden: true,
            }}
            initialParams={{
              isLoading: false,
              cameraStatusGranted: undefined,
              backdoorPressed: undefined,
              launchedBy: undefined,
              urTotal: undefined,
              urHave: undefined,
              backdoorText: '',
              onDismiss: undefined,
              showFileImportButton: true,
              backdoorVisible: false,
              animatedQRCodeData: {},
            }}
          />

          <DetailViewRoot.Screen name="PaymentCodeRoot" component={PaymentCodeStackRoot} options={NavigationDefaultOptions} />
          <DetailViewRoot.Screen
            name="ReorderWallets"
            component={ReorderWalletsStackRoot}
            options={{
              headerShown: false,
              gestureEnabled: false,
              presentation: 'modal',
            }}
          />
        </DetailViewRoot.Group>
      )}
    </DetailViewRoot.Navigator>
  );
};

const MainRoot = () => {
  return isHandset ? <DetailViewStackScreensStack /> : <DrawerRoot />;
};

export default MainRoot;
