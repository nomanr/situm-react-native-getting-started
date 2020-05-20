## Setup Guide
Note: This section will be removed once final version is published to `npm`.

Firstly need to setup react-native development environment. To get started please follow instructions under section **React Native CLI Quickstart** on this [guide.](https://reactnative.dev/docs/environment-setup) 

1. Clone [Getting Started](https://github.com/situmtech/situm-react-native-plugin) project
2. Clone [Situm Plugin](https://github.com/situmtech/situm-react-native-plugin) Project
3. Place both cloned projects in same workspace directory, e.g. 
    ```
    - workspace
        |-situm-react-native-plugin
        |-situm-react-native-getting-started
4. Checkout to `situm-react-native-getting-started` directory
5. Run command `yarn` to install all the dependencies 
6. Checkout to `situm-react-native-getting-started/ios` directory
7. Run command `pod install` to install plugin dependency 
8. On the root directory of the project, run `react-native run-ios` command to launch the project on iOS simulator. 

You can also open iOS project in Xcode to build and launch the project. Same goes for Android. 
