import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ScanLndInvoiceComponent,
  SelectWalletComponent,
  SuccessComponent,
  LnurlPayComponent,
  LnurlPaySuccessComponent,
} from './LazyLoadScanLndInvoiceStack';
import { useTheme } from '../components/themes';
import navigationStyle from '../components/navigationStyle';
import loc from '../loc';

const Stack = createNativeStackNavigator();

const ScanLndInvoiceRoot = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="ScanLndInvoice"
        component={ScanLndInvoiceComponent}
        options={navigationStyle({ closeButton: true, headerBackVisible: false, title: loc.send.header, statusBarStyle: 'light' })(theme)}
        initialParams={{ uri: undefined, walletID: undefined, invoice: undefined }}
      />
      <Stack.Screen
        name="SelectWallet"
        component={SelectWalletComponent}
        options={navigationStyle({ title: loc.wallets.select_wallet })(theme)}
      />
      <Stack.Screen
        name="Success"
        component={SuccessComponent}
        options={navigationStyle({ headerShown: false, gestureEnabled: false })(theme)}
      />
      <Stack.Screen
        name="LnurlPay"
        component={LnurlPayComponent}
        options={navigationStyle({
          title: '',
          closeButton: true,
        })(theme)}
      />
      <Stack.Screen
        name="LnurlPaySuccess"
        component={LnurlPaySuccessComponent}
        options={navigationStyle({
          title: '',
          closeButton: true,
          headerBackVisible: false,
          gestureEnabled: false,
        })(theme)}
      />
    </Stack.Navigator>
  );
};

export default ScanLndInvoiceRoot;
