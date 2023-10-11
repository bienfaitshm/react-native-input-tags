<!-- @format -->

# react-native-input-tags

[![Build Status](https://travis-ci.org/peterp/react-native-input-tags.svg?branch=master)](https://travis-ci.org/peterp/react-native-input-tags)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/react-native-input-tags)
[![npm version](https://badge.fury.io/js/react-native-input-tags.svg)](https://badge.fury.io/js/react-native-input-tags)

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

```jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Tags from 'react-native-input-tags';

const MyTagInput = () => (
  <Tags
    initialText="monkey"
    textInputProps={{
      placeholder: 'Any type of animal',
    }}
    initialTags={['dog', 'cat', 'chicken']}
    onChangeTags={tags => console.log(tags)}
    onTagPress={(index, tagLabel, event, deleted) =>
      console.log(index, tagLabel, event, deleted ? 'deleted' : 'not deleted')
    }
    containerStyle={{ justifyContent: 'center' }}
    inputStyle={{ backgroundColor: 'white' }}
    renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
      <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
        <Text>{tag}</Text>
      </TouchableOpacity>
    )}
  />
);
```

## Render Props

### `renderTag`

If you would like to add new functionality or modify the way that the tags are
rendered then pass in a renderTag prop.

| PropName | Description                                                  |
| -------- | ------------------------------------------------------------ |
| tag      | text of the tag                                              |
| index    | position in the array of tags                                |
| onPress  | Removes the tag if `deleteTagsOnPress` and readonly is false |

## Props

| PropName          | Description                                                                                    | Default         |
| ----------------- | ---------------------------------------------------------------------------------------------- | --------------- |
| initialText       | The input element's text                                                                       |                 |
| textInputProps    | [forward props to the textInput](https://facebook.github.io/react-native/docs/textinput#props) |                 |
| initialTags       | ['the', 'initial', 'tags']                                                                     |                 |
| createTagOnString | Triggers new tag creation                                                                      | [",", ".", " "] |
| onChangeTags      | Fires when tags are added or removed                                                           |                 |
| maxNumberOfTags   | The max number of tags that can be entered                                                     | infinity        |
| onTagPress        | Fires when tags are pressed                                                                    |                 |
| readonly          | Tags cannot be modified                                                                        | false           |
| deleteTagOnPress  | Remove the tag when pressed                                                                    | true            |
| renderTag         | Manage the rendering of your own `Tag`                                                         |                 |

## Style modification props

| PropName            | Description                    | Default |
| ------------------- | ------------------------------ | ------- |
| style               | Style (`containerStyle` alias) |         |
| containerStyle      | Style                          |         |
| inputContainerStyle | Style                          |         |
| inputStyle          | Style                          |         |
| tagContainerStyle   | Style                          |         |
| tagTextStyle        | Style                          |         |
