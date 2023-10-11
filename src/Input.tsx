/** @format */

import React from "react";
import {
    View,
    TextInput,
    ViewStyle,
    TextInputProps as TIP,
} from "react-native";
import styles from "./style";

export type TextInputProps = TIP;
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
