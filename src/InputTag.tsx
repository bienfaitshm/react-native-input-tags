/** @format */

import React from "react";
import {
    View,
    Text,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TouchableOpacity,
    TextInputSubmitEditingEventData,
} from "react-native";
import Input from "./Input";
import styles from "./style";
import type {
    InputTagProps,
    InputTagPropsRef,
    TRenderTag,
    TTag,
    TagListProps,
    TagListRef,
    TagTextInputProps,
    TagTextInputRef,
} from "./type";
import { addTag, canAddTag, generateId, getLastTag, removeTag } from "./utils";

const KEYS_PRESS_VALUES = ["Backspace"];
const TAGS_STRING = [",", " "];

const TagTextInput = React.forwardRef<TagTextInputRef, TagTextInputProps>(
    (
        {
            textInputComponent: TextInput = Input,
            initialValue = "",
            createTagOnString = TAGS_STRING,
            createTagOnReturn,
            textInputStyle,
            getLastTag,
            removeTag,
            addTag,
        },
        ref
    ) => {
        const [tag, setTag] = React.useState<string>(initialValue);
        /** text input and event process */
        const add = React.useCallback((text: string) => {
            addTag?.({ id: generateId(), name: text.slice(0, -1) });
            setTag("");
        }, []);
        //
        const onSubmitEditing = React.useCallback(
            (_: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                if (createTagOnReturn) {
                    add(tag);
                }
            },
            [tag]
        );
        const onChangeText = React.useCallback(
            (text: string) => {
                if (text.length === 0) {
                    const lastTag = getLastTag?.();
                    lastTag && removeTag?.(lastTag);
                    setTag(lastTag?.name || "");
                    return;
                }
                if (canAddTag(text, createTagOnString)) {
                    add(text);
                    return;
                }
                //
                setTag(text);
            },
            [tag]
        );

        const onKeyPress = React.useCallback(
            ({
                nativeEvent: { key: keyValue },
            }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                if (KEYS_PRESS_VALUES.includes(keyValue) && tag?.length === 0) {
                    onChangeText("");
                }
            },
            [tag]
        );
        React.useImperativeHandle(ref,()=>({

        }),[])
        return (
            <TextInput
                style={textInputStyle}
                value={tag}
                onChangeText={onChangeText}
                onKeyPress={onKeyPress}
                onSubmitEditing={onSubmitEditing}
            />
        );
    }
);

const ChipTag: TRenderTag = ({ tag, onDelete, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.chip}>
            <Text>{tag.name}</Text>
            <TouchableOpacity
                onPress={onDelete}
                style={{ margin: 5, padding: 2 }}
            >
                <Text>x</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const TagList = React.forwardRef<TagListRef, TagListProps>(
    ({ initialTags = [], renderTag: Chip = ChipTag, handlerPressTag }, ref) => {
        const [tags, setTags] = React.useState<TTag[]>(initialTags);

        const handlerRemoveTag = React.useCallback((tag: TTag) => {
            setTags((tags) => removeTag(tags, tag));
        }, []);
        React.useImperativeHandle(
            ref,
            () => ({
                remove: handlerRemoveTag,
                getLastTag: () => getLastTag(tags),
                getTags: () => tags,
                add(tag) {
                    setTags((_tags) => addTag(_tags, tag));
                },
            }),
            [tags]
        );
        return <>
        {tags.map((tag) => (
            <Chip
                key={tag.id}
                tag={tag}
                onDelete={() => handlerRemoveTag(tag)}
                onPress={() => handlerPressTag?.(tag)}
            />
        ))}</>
    }
);

TagList.displayName = "TagList";

export default React.forwardRef<InputTagPropsRef, InputTagProps>(
    (
        {
            initialValue,
            textInputComponent,
            initialTags,
            renderTag,
            createTagOnReturn,
            createTagOnString,
        },
        ref
    ) => {
        const tagList = React.useRef<TagListRef>(null);
        React.useImperativeHandle(
            ref,
            () => ({
                getTags() {
                    return tagList.current?.getTags() || [];
                },
            }),
            []
        );
        return (
            <View style={styles.container}>
                <TagList
                    ref={tagList}
                    initialTags={initialTags}
                    renderTag={renderTag}
                />
                <TagTextInput
                    createTagOnString={createTagOnString}
                    createTagOnReturn={createTagOnReturn}
                    initialValue={initialValue}
                    textInputComponent={textInputComponent}
                    addTag={(tag) => tagList.current?.add(tag)}
                    removeTag={(tag) => tagList.current?.remove(tag)}
                    getLastTag={() => tagList.current?.getLastTag()}
                />
            </View>
        );
    }
);

export function useInputTag() {
    return React.useRef<InputTagPropsRef>(null);
}

