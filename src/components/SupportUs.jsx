import {StyleSheet, View, ScrollView, RefreshControl, Text} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {WebView} from 'react-native-webview';
import {colorSchemeObj} from '../util/colors';
import GlobalContext from '../util/context';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const SupportUs = () => {
  const globalCtx = useContext(GlobalContext);

  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [webViewForceUpdate, setWebViewForceUpdate] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setWebViewForceUpdate(prevState => prevState + 1);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing, webViewForceUpdate]);

  const onError = e => {
    setError(true);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.scrollStyle(globalCtx.colorSchemeValue)}
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <WebView
          source={{uri: 'https://www.daskoimladja.com/podrzi.php'}}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.container(globalCtx.colorSchemeValue)}
          onError={onError}
          renderError={() => (
            <View style={styles.errorContainer(globalCtx.colorSchemeValue)}>
              <Text>Ne mogu da učitam sadržaj.</Text>
              <Text>Proveri internet konekciju.</Text>
              <Text>Povuci dole za refresh.</Text>
            </View>
          )}
          key={webViewForceUpdate}
        />
      </ScrollView>
    </View>
  );
};

export default SupportUs;

const styles = StyleSheet.create({
  container: colorScheme => {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSchemeObj[colorScheme].dark90,
    };
  },
  scrollStyle: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].light90,
      position: 'relative',
    };
  },
  errorContainer: colorScheme => {
    return {
      backgroundColor: colorSchemeObj[colorScheme].dark90,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
});
