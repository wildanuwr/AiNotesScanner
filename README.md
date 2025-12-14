# AiNotesScanner

AiNotesScanner adalah aplikasi mobile berbasis [**React Native**](https://reactnative.dev) yang memungkinkan Anda memindai catatan fisik, mengenali teks menggunakan OCR, dan mengelola hasilnya secara digital. Proyek ini dibuat menggunakan [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Fitur Utama

- Scan dokumen/catatan menggunakan kamera.
- Ekstraksi teks otomatis (OCR).
- Simpan, edit, dan kelola hasil scan.
- Antarmuka sederhana dan mudah digunakan.

# Persiapan Lingkungan

Pastikan Anda telah mengikuti panduan [Set Up Your Environment](https://reactnative.dev/docs/environment-setup) untuk React Native.

## Instalasi

1. **Clone repositori ini:**

    ```sh
    git clone https://github.com/username/AiNotesScanner.git
    cd AiNotesScanner
    ```

2. **Install dependensi:**

    ```sh
    npm install
    # atau
    yarn install
    ```

3. **(Opsional) Install CocoaPods untuk iOS:**

    ```sh
    cd ios
    pod install
    cd ..
    ```

## Menjalankan Aplikasi

### 1. Jalankan Metro

```sh
npm start
# atau
yarn start
```

### 2. Build & Run

#### Android

```sh
npm run android
# atau
yarn android
```

#### iOS

```sh
npm run ios
# atau
yarn ios
```

> **Catatan:** Untuk iOS, pastikan Anda menggunakan MacOS dan sudah menjalankan `pod install` di folder `ios`.

## Cara Menggunakan

1. Buka aplikasi AiNotesScanner di perangkat/emulator.
2. Tekan tombol **Scan** untuk membuka kamera.
3. Ambil gambar catatan yang ingin di-scan.
4. Aplikasi akan otomatis mengenali teks (OCR) dan menampilkan hasilnya.
5. Simpan atau edit hasil scan sesuai kebutuhan.

## Struktur Proyek

```
AiNotesScanner/
├── App.tsx
├── src/
│   ├── components/
│   ├── screens/
│   ├── utils/
│   └── ...
├── android/
├── ios/
├── package.json
└── README.md
```

## Troubleshooting

Jika mengalami kendala, silakan cek [Troubleshooting React Native](https://reactnative.dev/docs/troubleshooting) atau buka issue di repositori ini.

## Sumber Belajar

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Camera](https://github.com/react-native-camera/react-native-camera)
- [React Native Vision Camera](https://github.com/mrousavy/react-native-vision-camera)
- [Tesseract OCR for React Native](https://github.com/jonathanpalma/react-native-tesseract-ocr)

---

Kontribusi dan saran sangat terbuka!  
Selamat mencoba AiNotesScanner 🚀
