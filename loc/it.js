module.exports = {
  _: {
    storage_is_encrypted: 'Il tuo archivio è criptato. È necessaria una password per decriptarlo',
    enter_password: 'Inserisci password',
    bad_password: 'Password errata, riprova',
    never: 'mai',
    continue: 'Continua',
    ok: 'OK',
  },
  wallets: {
    select_wallet: 'Seleziona Portafoglio',
    options: 'Opzioni',
    createBitcoinWallet:
      'Non hai un portafoglio Bitcoin attualmente. Per ricaricare un portafoglio Lightning, è necessario creare o importare un portafoglio Bitcoin. Vuoi continuare lo stesso?',
    list: {
      app_name: 'BlueWallet',
      title: 'Portafogli',
      header:
        'Un portafoglio rappresenta la coppia fra un segreto (chiave privata) e un indirizzo' +
        'che puoi condividere per ricevere Bitcoin.',
      add: 'Aggiungi Portafoglio',
      create_a_wallet: 'Crea un portafoglio',
      create_a_wallet1: 'È gratuito e puoi crearne',
      create_a_wallet2: 'quanti ne vuoi',
      latest_transaction: 'Transazioni recenti',
      empty_txs1: 'Le tue transazioni appariranno qui,',
      empty_txs2: 'Nessuna transazione',
      empty_txs1_lightning:
        'Lightning wallet should be used for your daily transactions. Fees are unfairly cheap and speed is blazing fast.',
      empty_txs2_lightning: '\nTo start using it tap on "manage funds" and topup your balance.',
      tap_here_to_buy: 'Clicca qui per comprare Bitcoin',
    },
    reorder: {
      title: 'Riordina Portafogli',
    },
    add: {
      title: 'Aggiungi Portafoglio',
      description:
        'Puoi scansionare il Backup di un Paper-Wallet (in WIF - Wallet Import Format), o creare un nuovo portafoglio. I portafogli Segwit sono supportati di default.',
      scan: 'Scan',
      create: 'Crea',
      label_new_segwit: 'Nuovo SegWit',
      label_new_lightning: 'Nuovo Lightning',
      wallet_name: 'Nome Portafoglio',
      wallet_type: 'Tipo',
      or: 'o',
      import_wallet: 'Importa Portafoglio',
      imported: 'Importato',
      coming_soon: 'In arrivo',
      lightning: 'Lightning',
      bitcoin: 'Bitcoin',
    },
    details: {
      title: 'Portafoglio',
      address: 'Indirizzo',
      type: 'Tipo',
      label: 'Etichetta',
      destination: 'Destinazione',
      description: 'Descrizione',
      are_you_sure: 'Sei sicuro?',
      yes_delete: 'Si, elimina',
      no_cancel: 'No, annulla',
      delete: 'Elimina',
      save: 'Salva',
      delete_this_wallet: 'Elimina questo portafoglio',
      export_backup: 'Esporta / Backup',
      buy_bitcoin: 'Compra Bitcoin',
      show_xpub: 'Mostra XPUB del portafoglio',
    },
    export: {
      title: 'Esporta portafoglio',
    },
    xpub: {
      title: 'XPUB del Portafoglio',
      copiedToClipboard: 'Copiata negli appunti.',
    },
    import: {
      title: 'Importa',
      explanation:
        'Scrivi qui la tua frase mnemonica, chiave privata, WIF, o qualunque altra cosa tu abbia. BlueWallet tenterà di indovinare il formato corretto e importerà il tuo portafoglio',
      imported: 'Importato',
      error: 'Importazione fallita. Assicurati che le informazioni fornite siano valide.',
      success: 'Fatto',
      do_import: 'Importa',
      scan_qr: 'o scansionare un codice QR?',
    },
    scanQrWif: {
      go_back: 'Indietro',
      cancel: 'Annulla',
      decoding: 'Decodifica',
      input_password: 'Inserisci password',
      password_explain: 'Questa è una chiave privata BIP38 criptata',
      bad_password: 'Password errata',
      wallet_already_exists: 'Questo portafoglio esiste già',
      bad_wif: 'WIF errato',
      imported_wif: 'Importa WIF ',
      with_address: ' con indirizzo ',
      imported_segwit: 'SegWit importato',
      imported_legacy: 'Legacy importato',
      imported_watchonly: 'Watch-only importato',
    },
  },
  transactions: {
    list: {
      tabBarLabel: 'Transazioni',
      title: 'Transazioni',
      description: 'Una lista delle transazioni in entrata e in uscita dei tuoi portafogli',
      conf: 'conf',
    },
    details: {
      title: 'Transazione',
      from: 'Da',
      to: 'A',
      copy: 'Copia',
      transaction_details: 'Dettagli transazione',
      show_in_block_explorer: 'Mostra sul block explorer',
    },
  },
  send: {
    header: 'Invia',
    details: {
      title: 'Crea transazione',
      amount_field_is_not_valid: 'Importo non valido',
      fee_field_is_not_valid: 'Commissione non valida',
      address_field_is_not_valid: 'Indirizzo non valido',
      total_exceeds_balance: "L'importo da inviare eccede i fondi disponibili.",
      create_tx_error: "Si è verificato un errore nella creazione della transazione. Assicurati che l'indirizzo sia valido",
      address: 'Indirizzo',
      amount_placeholder: 'Importo da inviare (in BTC)',
      fee_placeholder: 'Più commissione (in BTC)',
      note_placeholder: 'Nota',
      cancel: 'Annulla',
      scan: 'Scansiona',
      send: 'Invia',
      create: 'Crea',
      remaining_balance: 'Fondi rimanenti',
    },
    confirm: {
      header: 'Conferma',
      sendNow: 'Invia ora',
    },
    success: {
      done: 'Fatto',
    },
    create: {
      details: 'Dettagli',
      title: 'Crea transazione',
      error: 'Errore nella creazione della transazione. Indirizzo o importo invalido',
      go_back: 'Indietro',
      this_is_hex: "Questo è l'hex della transazione, firmato e pronto per essere trasmesso sulla rete.",
      to: 'A',
      amount: 'Importo',
      fee: 'Commissione',
      tx_size: 'Grandezza TX',
      satoshi_per_byte: 'Satoshi per byte',
      memo: 'Memo',
      broadcast: 'Trasmetti',
      not_enough_fee: 'Commissione non sufficiente. Aumenta la commissione',
    },
  },
  receive: {
    header: 'Ricevi',
    details: {
      title: "Condividi questo indirizzo con l'acquirente",
      share: 'Condividi',
      copiedToClipboard: 'Copiato negli appunti.',
      label: 'Descrizione',
      create: 'Crea',
      setAmount: 'Ricevi con importo',
    },
    scan_lnurl: 'Scan to receive'
  },
  buyBitcoin: {
    header: 'Compra Bitcoin',
    tap_your_address: 'Clicca sul tuo indirizzo per copiarlo negli appunti:',
    copied: 'Copiato negli appunti!',
  },
  settings: {
    header: 'Impostazioni',
    plausible_deniability: 'Negazione plausibile...',
    storage_not_encrypted: 'Archivio: non criptato',
    storage_encrypted: 'Archivio: criptato',
    password: 'Password',
    password_explain: "Crea la password che userai per decriptare l'archivio",
    retype_password: 'Reinserisci password',
    passwords_do_not_match: 'Le password non corrispondono',
    encrypt_storage: 'Cripta archivio',
    lightning_settings: 'Impostazioni Lightning',
    lightning_settings_explain:
      'Per connetterti al tuo nodo LND personale installa LndHub' +
      ' e inserisci il suo URL qui nelle impostazioni. Lascialo vuoto per utilizzare il nodo LndHub di default (lndhub.io)',
    electrum_settings: 'Electrum Settings',
    electrum_settings_explain: 'Set to blank to use default',
    save: 'Salva',
    about: 'Informazioni',
    language: 'Lingua',
    currency: 'Valuta',
    advanced_options: 'Advanced Options',
    enable_advanced_mode: 'Enable advanced mode',
  },
  plausibledeniability: {
    title: 'Negazione Plausibile',
    help:
      'In alcune circostanze, potresti essere costretto a rivelare la ' +
      'password. Per mantenere i tuoi Bitcoin al sicuro, BlueWallet può creare un altro ' +
      'archivio criptato, con una password diversa. Se costretto, ' +
      'puoi rivelare questa password alle terze parti. Se inserita in ' +
      'BlueWallet, questa sbloccherà un "falso" archivio. Esso sembrerà ' +
      'autentico alle terze parti, ma manterrà segretamente il tuo archivio principale ' +
      'con i Bitcoin al sicuro.',
    help2: 'Il nuovo archivio sarà completamente funzionante, e puoi conservarci ' + 'piccole quantità così sembrerà più credibile.',
    create_fake_storage: 'Crea archivio falso criptato',
    go_back: 'Indietro',
    create_password: 'Crea una password',
    create_password_explanation: "La password per l'archivio falso non deve corrispondere a quella dell'archivio principale",
    password_should_not_match: "La password per l'archivio falso non deve corrispondere a quella dell'archivio principale",
    retype_password: 'Reinserisci password',
    passwords_do_not_match: 'Le password non corrispondono, riprova',
    success: 'Fatto',
  },
  lnd: {
    title: 'Gestisci fondi',
    choose_source_wallet: 'Scegli un portafoglio sorgente',
    refill_lnd_balance: 'Ricarica saldo del portafoglio Lightning',
    refill: 'Ricarica',
    withdraw: 'Preleva',
    expired: 'Scaduto',
    placeholder: 'Fattura',
    sameWalletAsInvoiceError: 'Non puoi pagare una fattura con lo stesso portafoglio utilizzato per crearla.',
  },
  pleasebackup: {
    title: 'Your wallet is created...',
    text:
      "Please take a moment to write down this mnemonic phrase on a piece of paper. It's your backup you can use to restore the wallet on other device. You can use Electrum wallet on desktop (https://electrum.org/) to restore the same wallet.",
    ok: 'OK, I wrote this down!',
  },
  lndViewInvoice: {
    wasnt_paid_and_expired: 'This invoice was not paid for and has expired',
    has_been_paid: 'This invoice has been paid for',
    please_pay: 'Please pay',
    sats: 'sats',
    for: 'For:',
    additional_info: 'Additional Information',
    open_direct_channel: 'Open direct channel with this node:',
  },
};
