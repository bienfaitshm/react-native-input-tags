/** @format */

import React from 'react';
import { View, TextInput, ViewStyle, TextInputProps } from 'react-native';
import styles from './style';

export type InputProps = {
  inputContainerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: any;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  inputContainerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[styles.textInput, inputStyle]}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

export default Input;
