import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextInput, FlatList, Linking, TouchableOpacity, StyleSheet, Text, View, Platform, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Icon } from 'react-native-elements';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import BigNumber from 'bignumber.js';
import { BlueText } from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import Privacy from '../../blue_modules/Privacy';
import { BitcoinUnit } from '../../models/bitcoinUnits';
import loc from '../../loc';
import { DynamicQRCode } from '../../components/DynamicQRCode';
import { isDesktop } from '../../blue_modules/environment';
import { useNavigation, useRoute } from '@react-navigation/native';
import presentAlert from '../../components/Alert';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useTheme } from '../../components/themes';
import { satoshiToBTC } from '../../blue_modules/currency';
const bitcoin = require('bitcoinjs-lib');

const SendCreate = () => {
  const { fee, recipients, memo = '', satoshiPerByte, psbt, showAnimatedQr, tx } = useRoute().params;
  const transaction = bitcoin.Transaction.fromHex(tx);
  const size = transaction.virtualSize();
  const { colors } = useTheme();
  const { setOptions } = useNavigation();

  const styleHooks = StyleSheet.create({
    transactionDetailsTitle: {
      color: colors.feeText,
    },
    transactionDetailsSubtitle: {
      color: colors.foregroundColor,
    },
    separator: {
      backgroundColor: colors.inputBorderColor,
    },
    root: {
      backgroundColor: colors.elevated,
    },
    cardText: {
      color: colors.foregroundColor,
    },
  });

  useEffect(() => {
    Privacy.enableBlur();

    console.log('send/create - useEffect');
    return () => {
      Privacy.disableBlur();
    };
  }, []);

  const exportTXN = useCallback(async () => {
    const fileName = `${Date.now()}.txn`;
    if (Platform.OS === 'ios') {
      const filePath = RNFS.TemporaryDirectoryPath + `/${fileName}`;
      await RNFS.writeFile(filePath, tx);
      Share.open({
        url: 'file://' + filePath,
        saveToFiles: isDesktop,
      })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          RNFS.unlink(filePath);
        });
    } else if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (granted === RESULTS.GRANTED) {
        console.log('Storage Permission: Granted');
        const filePath = RNFS.DownloadDirectoryPath + `/${fileName}`;
        try {
          await RNFS.writeFile(filePath, tx);
          presentAlert({ message: loc.formatString(loc.send.txSaved, { filePath }) });
        } catch (e) {
          console.log(e);
          presentAlert({ message: e.message });
        }
      } else {
        console.log('Storage Permission: Denied');
        Alert.alert(loc.send.permission_storage_title, loc.send.permission_storage_denied_message, [
          {
            text: loc.send.open_settings,
            onPress: () => {
              Linking.openSettings();
            },
            style: 'default',
          },
          { text: loc._.cancel, onPress: () => {}, style: 'cancel' },
        ]);
      }
    }
  }, [tx]);

  useEffect(() => {
    setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity accessibilityRole="button" onPress={exportTXN}>
          <Icon size={22} name="share-alternative" type="entypo" color={colors.foregroundColor} />
        </TouchableOpacity>
      ),
    });
  }, [colors, exportTXN, setOptions]);

  const _renderItem = ({ index, item }) => {
    return (
      <>
        <View>
          <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_to}</Text>
          <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>{item.address}</Text>
          <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_amount}</Text>
          <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>
            {satoshiToBTC(item.value)} {BitcoinUnit.BTC}
          </Text>
          {recipients.length > 1 && (
            <BlueText style={styles.itemOf}>{loc.formatString(loc._.of, { number: index + 1, total: recipients.length })}</BlueText>
          )}
        </View>
      </>
    );
  };
  _renderItem.propTypes = {
    index: PropTypes.number,
    item: PropTypes.shape({
      address: PropTypes.string,
      value: PropTypes.number,
    }),
  };

  const renderSeparator = () => {
    return <View style={[styles.separator, styleHooks.separator]} />;
  };

  const ListHeaderComponent = (
    <View>
      {showAnimatedQr && psbt ? <DynamicQRCode value={psbt.toHex()} /> : null}
      <BlueText style={[styles.cardText, styleHooks.cardText]}>{loc.send.create_this_is_hex}</BlueText>
      <TextInput testID="TxhexInput" style={styles.cardTx} height={72} multiline editable={false} value={tx} />

      <TouchableOpacity accessibilityRole="button" style={styles.actionTouch} onPress={() => Clipboard.setString(tx)}>
        <Text style={styles.actionText}>{loc.send.create_copy}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.actionTouch}
        onPress={() => Linking.openURL('https://coinb.in/?verify=' + tx)}
      >
        <Text style={styles.actionText}>{loc.send.create_verify}</Text>
      </TouchableOpacity>
    </View>
  );

  const ListFooterComponent = (
    <View>
      <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_fee}</Text>
      <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>
        {new BigNumber(fee).toFixed()} {BitcoinUnit.BTC}
      </Text>
      <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_tx_size}</Text>
      <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>{size} vbytes</Text>
      <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_satoshi_per_vbyte}</Text>
      <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>{satoshiPerByte} Sat/vB</Text>
      {memo?.length > 0 && (
        <>
          <Text style={[styles.transactionDetailsTitle, styleHooks.transactionDetailsTitle]}>{loc.send.create_memo}</Text>
          <Text style={[styles.transactionDetailsSubtitle, styleHooks.transactionDetailsSubtitle]}>{memo}</Text>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={[styles.root, styleHooks.root]}
      extraData={recipients}
      data={recipients}
      renderItem={_renderItem}
      keyExtractor={(_item, index) => `${index}`}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets
    />
  );
};

export default SendCreate;

const styles = StyleSheet.create({
  transactionDetailsTitle: {
    fontWeight: '500',
    fontSize: 17,
    marginBottom: 2,
  },
  root: {
    paddingHorizontal: 20,
  },
  transactionDetailsSubtitle: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 20,
  },
  itemOf: {
    alignSelf: 'flex-end',
  },
  separator: {
    height: 0.5,
    marginVertical: 16,
  },
  cardText: {
    fontWeight: '500',
  },
  cardTx: {
    borderColor: '#ebebeb',
    backgroundColor: '#d2f8d6',
    borderRadius: 4,
    marginTop: 20,
    color: '#37c0a1',
    fontWeight: '500',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  actionTouch: {
    marginVertical: 24,
  },
  actionText: {
    color: '#9aa0aa',
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
  },
});

SendCreate.navigationOptions = navigationStyle({}, (options, { theme, navigation, route }) => {
  return {
    ...options,
    title: loc.send.create_details,
  };
});
