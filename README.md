<!-- @format -->

# react-native-input-tags

[![Build Status](https://travis-ci.org/peterp/react-native-input-tags.svg?branch=master)](https://travis-ci.org/peterp/react-native-input-tags)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/react-native-input-tags)
[![npm version](https://badge.fury.io/js/react-native-input-tags.svg)](https://badge.fury.io/js/react-native-input-tags)

This project is inspired by [react-native-tags](https://www.npmjs.com/package/react-native-tags).

A React Native component that allows you to input text and formats the text
into a tag when a space or comma is entered. Tapping on the tag will remove it.

![Demo](https://camo.githubusercontent.com/e3d6f3f87e625ad787bda1e7b518307d29d21a23/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f6c34394a5036786c6847723138795a46652f67697068792e676966)

## Installation

```terminal
npm install --save react-native-input-tags
```

```terminal
yarn add react-native-input-tags
```

## Usage

```tsx
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import InputTag, { useInputTag } from 'react-native-input-tags';

export default function App() {
  const inputTag = useInputTag();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Tags:</Text>
      <View style={styles.separator} />
      <InputTag ref={inputTag} />
      <Button
        title="Submit"
        onPress={() => {
          console.log(inputTag.current?.getTags());
        }}
      />
    </View>
  );
}
```

### `useInputTag`

Is ref object,
useInputTag allows you to have access to inputTag values

```tsx
const inputTag = useInputTag();

// get all tags inputed
inputTag.current?.getTags();
```

| values  | Description                              |
| ------- | ---------------------------------------- |
| getTags | function return list of all tags inputed |

## Render Props

### `renderTag`

If you would like to add new functionality or modify the way that the tags are
rendered then pass in a renderTag prop.

| PropName | Description                                          |
| -------- | ---------------------------------------------------- |
| tag      | the tag item { id:string , name:string }             |
| onPress  | callback when the chip or tag is cliked for deleting |
| onPress  | callback when the chip or tag is cliked for pressing |

```tsx
//custom render tag
<InputTag
  ref={inputTag}
  renderTag={({ tag, onPress, onDelete }) => {
    return (
      <Text style={{ margin: 10 }} onPress={onDelete}>
        {tag.name}
      </Text>
    );
  }}
/>
```

### `textInputComponent`

If you would like to add new functionality or modify the way that the Textinput are
rendered then pass in a textInputComponent prop.

| PropName     | Description                                                                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value        | the tag string value input                                                                                                                                                                                                            |
| onChangeText | Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.                                                                                                            |
| onKeyPress   | Callback that is called when a key is pressed. This will be called with { nativeEvent: { key: keyValue } } where keyValue is 'Enter' or 'Backspace' for respective keys and the typed-in character otherwise including ' ' for space. |

Fires before onChange callbacks. Note: on Android only the inputs from soft keyboard are handled, not the hardware keyboard inputs. |
| onSubmitEditing | Callback that is called when the text input's submit button is pressed. |
| style | Text style |

```tsx
import { TextInput } from 'react-native';
//custom text input
<InputTag
  ref={inputTag}
  textInputComponent={props => {
    return <TextInput placeholder="Tag ici..." {...props} />;
  }}
/>;
```

## Props

| PropName           | Description                                                             | Default         |
| ------------------ | ----------------------------------------------------------------------- | --------------- |
| initialValue       | The input element's text                                                |                 |
| initialTags        | intial tags eg.`[{id:"yuf", name:"reactjs"}]`                           | []              |
| createTagOnString  | Triggers new tag creation                                               | [",", ".", " "] |
| handlerPressTag    | function call when the tag is pressed `function handlerPressTag(tag){}` | undenfied       |
| textInputComponent | render TextInput                                                        |                 |
| renderTag          | Manage the rendering of your own `Tag`                                  |                 |
