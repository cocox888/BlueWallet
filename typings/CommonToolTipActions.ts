import { Platform } from 'react-native';
import loc from '../loc';

const keys = {
  CopyTXID: 'copyTX_ID',
  CopyBlockExplorerLink: 'copy_blockExplorer',
  ExpandNote: 'expandNote',
  OpenInBlockExplorer: 'open_in_blockExplorer',
  CopyAmount: 'copyAmount',
  CopyNote: 'copyNote',
  ManageWallets: 'manageWallets',
  ImportWallet: 'importWallet',
  HideBalance: 'hideBalance',
  ViewInBitcoin: 'viewInBitcoin',
  ViewInSats: 'viewInSats',
  ViewInFiat: 'viewInFiat',
  Entropy: 'entropy',
  SearchAccount: 'searchAccount',
  Passphrase: 'passphrase',
  MoreInfo: 'moreInfo',
  SaveChanges: 'saveChanges',
  ClearClipboard: 'clearClipboard',
  PaymentsCode: 'paymentsCode',
  ResetToDefault: 'resetToDefault',
  ClearHistory: 'clearHistory',
  ScanQR: 'scan_qr',
  RemoveAllRecipients: 'RemoveAllRecipients',
  AddRecipient: 'AddRecipient',
  RemoveRecipient: 'RemoveRecipient',
  ChoosePhoto: 'choose_photo',
  ImportFile: 'import_file',
  InsertContact: 'insert_contact',
  SignPSBT: 'sign_psbt',
  SendMax: 'send_max',
  AllowRBF: 'allow_rbf',
  ImportTransaction: 'import_transaction',
  ImportTransactionMultsig: 'import_transaction_multisig',
  ImportTransactionQR: 'import_transaction_qr',
  CoinControl: 'coin_control',
  CoSignTransaction: 'co_sign_transaction',
  CopyToClipboard: 'copyToClipboard',
  Share: 'share',
  SignVerify: 'signVerify',
  ExportPrivateKey: 'exportPrivateKey',
  PasteFromClipboard: 'pasteFromClipboard',
  Hide: 'hide',
  SortASC: 'sortASC',
  SortDESC: 'sortDESC',
  SortHeight: 'sortHeight',
  SortValue: 'sortValue',
  SortLabel: 'sortLabel',
  SortStatus: 'sortStatus',
  SortBalance: 'sortBalance',
  MostRecentTransaction: 'mostRecentTransaction',
  Reset: 'reset',
} as const;

const icons = {
  Eye: { iconValue: 'eye' },
  EyeSlash: { iconValue: 'eye.slash' },
  Link: { iconValue: 'link' },
  Note: { iconValue: 'note.text' },
  ManageWallets: { iconValue: 'slider.horizontal.3' },
  ImportWallet: { iconValue: 'square.and.arrow.down.on.square' },
  ViewInBitcoin: { iconValue: 'bitcoinsign.circle' },
  ViewInFiat: { iconValue: 'coloncurrencysign.circle' },
  Entropy: { iconValue: 'dice' },
  SearchAccount: { iconValue: 'magnifyingglass' },
  Passphrase: { iconValue: 'rectangle.and.pencil.and.ellipsis' },
  MoreInfo: { iconValue: 'info.circle' },
  SaveChanges: { iconValue: 'checkmark' },
  InsertContact: { iconValue: 'at.badge.plus' },
  SignPSBT: { iconValue: 'signature' },
  SendMax: { iconValue: 'dial.high' },
  AllowRBF: { iconValue: 'arrowshape.up.circle' },
  ImportTransaction: { iconValue: 'square.and.arrow.down' },
  ImportTransactionMultsig: { iconValue: 'square.and.arrow.down.on.square' },
  ImportTransactionQR: { iconValue: 'qrcode.viewfinder' },
  CoinControl: { iconValue: 'switch.2' },
  CoSignTransaction: { iconValue: 'signature' },
  PaymentsCode: { iconValue: 'qrcode.viewfinder' },
  ClearHistory: {
    iconValue: 'trash',
  },
  RemoveAllRecipients: { iconValue: 'person.2.slash' },
  AddRecipient: { iconValue: 'person.badge.plus' },
  RemoveRecipient: { iconValue: 'person.badge.minus' },
  ScanQR: { iconValue: Platform.OS === 'ios' ? 'qrcode.viewfinder' : 'ic_menu_camera' },
  ChoosePhoto: { iconValue: Platform.OS === 'ios' ? 'photo.on.rectangle' : 'ic_menu_gallery' },
  Clipboard: { iconValue: Platform.OS === 'ios' ? 'document.on.clipboard' : 'ic_menu_file' },
  ExportPrivateKey: { iconValue: 'key' },
  Share: { iconValue: 'square.and.arrow.up' },
  Signature: { iconValue: 'signature' },
  PasteFromClipboard: { iconValue: 'document.on.clipboard' },
  ImportFile: { iconValue: 'document.viewfinder' },
  Hide: { iconValue: 'eye.slash' },
  ClearClipboard: { iconValue: 'clipboard' },
  SortASC: { iconValue: 'arrow.down.to.line' },
  SortDESC: { iconValue: 'arrow.up.to.line' },
  MostRecentTransaction: { iconValue: 'clock' },
  Reset: { iconValue: 'arrow.counterclockwise' },
} as const;

export const CommonToolTipActions = {
  CopyTXID: {
    id: keys.CopyTXID,
    text: loc.transactions.details_copy_txid,
    icon: icons.Clipboard,
  },
  CopyBlockExplorerLink: {
    id: keys.CopyBlockExplorerLink,
    text: loc.transactions.details_copy_block_explorer_link,
    icon: icons.Clipboard,
  },
  OpenInBlockExplorer: {
    id: keys.OpenInBlockExplorer,
    text: loc.transactions.details_view_in_browser,
    icon: icons.Link,
  },
  ExpandNote: {
    id: keys.ExpandNote,
    text: loc.transactions.expand_note,
    icon: icons.Note,
  },
  CopyAmount: {
    id: keys.CopyAmount,
    text: loc.transactions.details_copy,
    icon: icons.Clipboard,
  },
  AddRecipient: {
    id: keys.AddRecipient,
    text: loc.send.details_add_rec_add,
    icon: icons.AddRecipient,
  },
  RemoveRecipient: {
    id: keys.RemoveRecipient,
    text: loc.send.details_add_rec_rem,
    icon: icons.RemoveRecipient,
  },
  CopyNote: {
    id: keys.CopyNote,
    text: loc.transactions.details_copy_note,
    icon: icons.Clipboard,
  },
  ManageWallet: {
    id: keys.ManageWallets,
    text: loc.wallets.manage_title,
    icon: icons.ManageWallets,
  },
  ImportWallet: {
    id: keys.ImportWallet,
    text: loc.wallets.add_import_wallet,
    icon: icons.ImportWallet,
  },
  HideBalance: {
    id: keys.HideBalance,
    text: loc.transactions.details_balance_hide,
    icon: icons.EyeSlash,
  },
  Hide: {
    id: keys.Hide,
    text: loc.total_balance_view.hide,
    icon: icons.EyeSlash,
  },
  ViewInFiat: {
    id: keys.ViewInFiat,
    text: loc.total_balance_view.display_in_fiat,
    icon: icons.ViewInFiat,
    hidden: false,
  },
  ViewInSats: {
    id: keys.ViewInSats,
    text: loc.total_balance_view.display_in_sats,
    icon: icons.ViewInBitcoin,
    hidden: false,
  },
  ViewInBitcoin: {
    id: keys.ViewInBitcoin,
    text: loc.total_balance_view.display_in_bitcoin,
    icon: icons.ViewInBitcoin,
    hidden: false,
  },
  Entropy: {
    id: keys.Entropy,
    text: loc.wallets.add_entropy_provide,
    icon: icons.Entropy,
    menuState: false,
  },
  RemoveAllRecipients: {
    id: keys.RemoveAllRecipients,
    text: loc.send.details_add_rec_rem_all,
    icon: icons.RemoveAllRecipients,
  },
  SearchAccount: {
    id: keys.SearchAccount,
    text: loc.wallets.import_search_accounts,
    icon: icons.SearchAccount,
    menuState: false,
  },
  Passphrase: {
    id: keys.Passphrase,
    text: loc.wallets.import_passphrase,
    icon: icons.Passphrase,
    menuState: false,
  },
  MoreInfo: {
    id: keys.MoreInfo,
    text: loc.wallets.more_info,
    icon: icons.MoreInfo,
    hidden: false,
  },
  SaveChanges: {
    id: keys.SaveChanges,
    text: loc._.save,
    icon: icons.SaveChanges,
  },
  PaymentsCode: {
    id: keys.PaymentsCode,
    text: loc.bip47.purpose,
    icon: icons.PaymentsCode,
    menuState: false,
  },
  ScanQR: {
    id: keys.ScanQR,
    text: loc.wallets.list_long_scan,
    icon: icons.ScanQR,
  },
  ChoosePhoto: {
    id: keys.ChoosePhoto,
    text: loc.wallets.list_long_choose,
    icon: icons.ChoosePhoto,
  },
  ImportFile: {
    id: keys.ImportFile,
    text: loc.wallets.import_file,
    icon: icons.ImportFile,
  },
  InsertContact: {
    id: keys.InsertContact,
    text: loc.send.details_insert_contact,
    icon: icons.InsertContact,
    hidden: true,
  },
  SignPSBT: {
    id: keys.SignPSBT,
    text: loc.send.psbt_sign,
    icon: icons.SignPSBT,
    hidden: true,
  },
  SendMax: {
    id: keys.SendMax,
    text: loc.send.details_adv_full,
    icon: icons.SendMax,
    hidden: true,
  },
  AllowRBF: {
    id: keys.AllowRBF,
    text: loc.send.details_adv_fee_bump,
    icon: icons.AllowRBF,
    hidden: true,
    menuState: false,
  },
  ImportTransaction: {
    id: keys.ImportTransaction,
    text: loc.send.details_adv_import,
    icon: icons.ImportTransaction,
    hidden: true,
  },
  ImportTransactionQR: {
    id: keys.ImportTransactionQR,
    text: loc.send.details_adv_import_qr,
    icon: icons.ImportTransactionQR,
    hidden: true,
  },
  ImportTransactionMultsig: {
    id: keys.ImportTransactionMultsig,
    text: loc.send.details_adv_import,
    icon: icons.ImportTransactionMultsig,
    hidden: true,
  },
  CoSignTransaction: {
    id: keys.CoSignTransaction,
    text: loc.multisig.co_sign_transaction,
    icon: icons.CoSignTransaction,
    hidden: true,
  },
  CoinControl: {
    id: keys.CoinControl,
    text: loc.cc.header,
    icon: icons.CoinControl,
    hidden: false,
  },
  CopyToClipboard: {
    id: keys.CopyToClipboard,
    text: loc.transactions.details_copy,
    icon: icons.Clipboard,
  },
  Share: {
    id: keys.Share,
    text: loc.receive.details_share,
    icon: icons.Share,
  },
  SignVerify: {
    id: keys.SignVerify,
    text: loc.addresses.sign_title,
    icon: icons.Signature,
  },
  ExportPrivateKey: {
    id: keys.ExportPrivateKey,
    text: loc.addresses.copy_private_key,
    icon: icons.ExportPrivateKey,
  },
  ResetToDefault: {
    id: keys.ResetToDefault,
    text: loc.settings.electrum_reset,
  },
  Reset: {
    id: keys.Reset,
    text: loc.receive.reset,
    icon: icons.Reset,
  },
  ClearHistory: {
    id: keys.ClearHistory,
    text: loc.settings.electrum_clear,
    icon: icons.ClearHistory,
  },
  PasteFromClipboard: {
    id: keys.PasteFromClipboard,
    text: loc.wallets.paste_from_clipboard,
    icon: icons.PasteFromClipboard,
  },
  ClearClipboard: {
    id: keys.ClearClipboard,
    text: loc.wallets.clear_clipboard_on_import,
    icon: icons.Clipboard,
    menuState: true,
  },
  SortASC: {
    id: keys.SortASC,
    text: loc.cc.sort_asc,
    icon: icons.SortASC,
    keepsMenuPresented: true,
  },
  SortDESC: {
    id: keys.SortDESC,
    text: loc.cc.sort_desc,
    icon: icons.SortDESC,
    keepsMenuPresented: true,
  },
  SortHeight: {
    id: keys.SortHeight,
    text: loc.cc.sort_height,
  },
  SortValue: {
    id: keys.SortValue,
    text: loc.cc.sort_value,
  },
  SortLabel: {
    id: keys.SortLabel,
    text: loc.cc.sort_label,
  },
  SortStatus: {
    id: keys.SortStatus,
    text: loc.cc.sort_status,
  },
  SortBalance: {
    id: keys.SortBalance,
    text: loc.wallets.balance,
    icon: icons.ViewInBitcoin,
  },
  MostRecentTransaction: {
    id: keys.MostRecentTransaction,
    text: loc.transactions.details_title,
    icon: icons.MostRecentTransaction,
  },
} as const;
