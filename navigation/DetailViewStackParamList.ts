export type DetailViewStackParamList = {
  WalletsList: undefined;
  WalletTransactions: { walletID: string; walletType: string };
  LDKOpenChannelRoot: undefined;
  LdkInfo: undefined;
  WalletDetails: { walletID: string };
  LdkViewLogs: undefined;
  TransactionDetails: { transactionId: string };
  TransactionStatus: { hash?: string; walletID?: string };
  CPFP: { transactionId: string };
  RBFBumpFee: { transactionId: string };
  RBFCancel: { transactionId: string };
  SelectWallet: undefined;
  LNDViewInvoice: { invoiceId: string };
  LNDViewAdditionalInvoiceInformation: { invoiceId: string };
  LNDViewAdditionalInvoicePreImage: { invoiceId: string };
  Broadcast: undefined;
  IsItMyAddress: undefined;
  GenerateWord: undefined;
  LnurlPay: undefined;
  LnurlPaySuccess: undefined;
  LnurlAuth: undefined;
  Success: undefined;
  WalletAddresses: { walletID: string };
  AddWalletRoot: undefined;
  SendDetailsRoot: undefined;
  LNDCreateInvoiceRoot: undefined;
  ScanLndInvoiceRoot: undefined;
  AztecoRedeemRoot: undefined;
  WalletExportRoot: undefined;
  ExportMultisigCoordinationSetupRoot: undefined;
  Settings: undefined;
  Currency: undefined;
  GeneralSettings: undefined;
  PlausibleDeniability: undefined;
  Licensing: undefined;
  NetworkSettings: undefined;
  About: undefined;
  DefaultView: undefined;
  ElectrumSettings: undefined;
  EncryptStorage: undefined;
  Language: undefined;
  LightningSettings: undefined;
  NotificationSettings: undefined;
  SelfTest: undefined;
  ReleaseNotes: undefined;
  Tools: undefined;
  SettingsPrivacy: undefined;
  ViewEditMultisigCosignersRoot: { walletID: string; cosigners: string[] };
  WalletXpubRoot: undefined;
  SignVerifyRoot: undefined;
  ReceiveDetailsRoot: undefined;
  ScanQRCodeRoot: {
    isLoading?: boolean;
    cameraStatusGranted?: boolean;
    backdoorPressed?: boolean;
    launchedBy?: string;
    urTotal?: number;
    urHave?: number;
    backdoorText?: string;
    onDismiss?: () => void;
    showFileImportButton?: boolean;
    backdoorVisible?: boolean;
    animatedQRCodeData?: Record<string, any>;
  };
  PaymentCodeRoot: undefined;
  ReorderWallets: undefined;
};
