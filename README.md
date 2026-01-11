# 🚀 Expo + EAS Production Build Guide

This project uses **Expo Router** and supports **Android production builds using EAS**.

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run in Development

```bash
npx expo start -c
```

---

## 🛠️ Fix: babel-plugin-module-resolver error

Install missing plugin:

```bash
npm install --save-dev babel-plugin-module-resolver
```

---

## 🧩 Create `babel.config.js` (Root folder)

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./app",
            "@assets": "./assets",
            "@src": "./src",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
```

---

## ⚙️ Setup EAS

```bash
npm install -g eas-cli
npx expo prebuild
npx expo login
npx expo configure
```

---

## 🗂️ Create `eas.json` (Root folder)

```json
{
  "cli": {
    "version": ">= 16.28.0",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": { "NODE_ENV": "development" },
      "node": "22.20.0"
    },
    "preview": {
      "distribution": "internal",
      "env": { "NODE_ENV": "preview" },
      "node": "22.20.0"
    },
    "production": {
      "autoIncrement": true,
      "android": { "buildType": "apk" },
      "env": { "NODE_ENV": "production" },
      "node": "22.20.0"
    }
  },
  "submit": { "production": {} }
}
```

---

## 📱 Build Android APK (Cloud)

```bash
npx expo prebuild
npx eas build -p android --profile production
```

---

## 📦 Local Android Bundle (Embed Export)

```bash
npx expo export:embed --eager --platform android --dev false
```

---

## 🧹 Clear Cache if Error Occurs

```bash
npx expo start -c
```
