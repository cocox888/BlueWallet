import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import { BlueSpacing20 } from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import { DynamicQRCode } from '../../components/DynamicQRCode';
import { SquareButton } from '../../components/SquareButton';

import loc from '../../loc';
import presentAlert from '../../components/Alert';
import { scanQrHelper } from '../../helpers/scan-qr';
import { useTheme } from '../../components/themes';
import SafeArea from '../../components/SafeArea';
const bitcoin = require('bitcoinjs-lib');
const fs = require('../../blue_modules/fs');

const PsbtMultisigQRCode = () => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const openScannerButton = useRef();
  const { psbtBase64, isShowOpenScanner } = useRoute().params;
  const { name } = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const dynamicQRCode = useRef();
  const isFocused = useIsFocused();

  const psbt = bitcoin.Psbt.fromBase64(psbtBase64);
  const stylesHook = StyleSheet.create({
    root: {
      backgroundColor: colors.elevated,
    },
    modalContentShort: {
      backgroundColor: colors.elevated,
    },
    exportButton: {
      backgroundColor: colors.buttonDisabledBackgroundColor,
    },
  });
  const fileName = `${Date.now()}.psbt`;

  useEffect(() => {
    if (isFocused) {
      dynamicQRCode.current?.startAutoMove();
    } else {
      dynamicQRCode.current?.stopAutoMove();
    }
  }, [isFocused]);

  const onBarScanned = ret => {
    if (!ret.data) ret = { data: ret };
    if (ret.data.toUpperCase().startsWith('UR')) {
      presentAlert({ message: 'BC-UR not decoded. This should never happen' });
    } else if (ret.data.indexOf('+') === -1 && ret.data.indexOf('=') === -1 && ret.data.indexOf('=') === -1) {
      // this looks like NOT base64, so maybe its transaction's hex
      // we dont support it in this flow
      presentAlert({ message: loc.wallets.import_error });
    } else {
      // psbt base64?
      navigate({ name: 'PsbtMultisig', params: { receivedPSBTBase64: ret.data }, merge: true });
    }
  };

  const openScanner = async () => {
    const scanned = await scanQrHelper(navigate, name, true);
    onBarScanned({ data: scanned });
  };

  const exportPSBT = () => {
    dynamicQRCode.current?.stopAutoMove();
    setIsLoading(true);
    setTimeout(
      () =>
        fs.writeFileAndExport(fileName, psbt.toBase64()).finally(() => {
          setIsLoading(false);
          dynamicQRCode.current?.startAutoMove();
        }),
      10,
    );
  };

  return (
    <SafeArea style={stylesHook.root}>
      <ScrollView centerContent contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.modalContentShort, stylesHook.modalContentShort]}>
          <DynamicQRCode value={psbt.toHex()} ref={dynamicQRCode} />
          {!isShowOpenScanner && (
            <>
              <BlueSpacing20 />
              <SquareButton
                testID="CosignedScanOrImportFile"
                style={[styles.exportButton, stylesHook.exportButton]}
                onPress={openScanner}
                ref={openScannerButton}
                title={loc.multisig.scan_or_import_file}
              />
            </>
          )}
          <BlueSpacing20 />
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <SquareButton style={[styles.exportButton, stylesHook.exportButton]} onPress={exportPSBT} title={loc.multisig.share} />
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  modalContentShort: {
    marginLeft: 20,
    marginRight: 20,
  },
  exportButton: {
    height: 48,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

PsbtMultisigQRCode.navigationOptions = navigationStyle({}, opts => ({ ...opts, title: loc.multisig.header }));

export default PsbtMultisigQRCode;
