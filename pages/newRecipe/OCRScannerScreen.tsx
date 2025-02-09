import OCRScanner from '@/components/Overview/OCRScanner';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const OCRScannerScreen = () => {
  return (
    <View style={styles.container}>
        <OCRScanner/>
    </View>
  );
};

export default OCRScannerScreen;

const styles = StyleSheet.create({
  container: {}
});
