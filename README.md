# Android Audio Stream Player

#### Internet Radio & Podcast Audio Stream Player

#### Android Mobile App

---

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

- It is designed for a local internet radio station in my city. With some modifications - it can play just about any internet radio and/or online podcast.
- Just make sure you change all the API specific code, and adjust the design to your project.

---

Some of the libraries and techniques used in this project:

- **react-native-track-player** - the central focus point of this app - provides all the tools necessary to work with audio files
- **react-native-optimized-flatlist** - thousands of items from the API this app is using are loaded efficiently thanks to this library
- **react-native-mmkv** - the fastest key/value storage for React Native
- **react-native-fs** - provides native filesystem access
- **netinfo** - for detecting and reacting to different connectivity states
- **react-navigation** - provides a great navigating through app user experience
- **axios** - API calls made simple
- **slider** - for sliding and jumping to a different point in time of the podcast that is currently playing
- **react-native-progress** - a handy tool for displaying podcast download progress
- **react-native-vector-icons** - stylish icons nicely decorating the app

The list goes on...

---

## Screenshots & .apk binary

Screenshots of the app and the .apk binary file available for download** [HERE](https://it-drafter.github.io/android-audio-stream-player/ 'HERE')**.

---

---

## Run in Debug mode Locally with Emulator or Physical Device

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of this React Native project. Run the following command to start your \_Android app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.jsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

## Congratulations!

You have successfully run and modified your React Native App.

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you are curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
