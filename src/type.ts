/** @format */

import { TextInputProps } from "react-native";

export type TTag = {
    name: string;
    id: string | number;
};

export type TTextInputStyle = TextInputProps["style"];

export type TRenderTag = React.FC<{
    tag: TTag;
    onPress?(): void;
    onDelete?(): void;
}>;

export type TagListRef = {
    add(tag: TTag): void;
    remove(tag: TTag): void;
    getLastTag(): TTag;
    getTags(): TTag[];
};

export type TagListProps = {
    initialTags?: TTag[];
    renderTag?: TRenderTag;
    handlerPressTag?(tag: TTag): void;
};

export type TagTextInputProps = {
    initialValue?: string;
    createTagOnString?: string[];
    createTagOnReturn?: boolean;
    getLastTag?(): TTag | undefined;
    getTags?(): TTag[];
    removeTag?(tag: TTag): void;
    addTag?(tag: TTag): void;
    textInputStyle?: TTextInputStyle;
    textInputComponent?: React.FC<
        Pick<
            TextInputProps,
            "onChangeText" | "value" | "onKeyPress" | "onSubmitEditing"
        > &
            Partial<{ style: TTextInputStyle }>
    >;
};

export type TagTextInputRef = {};

export type InputTagPropsRef = {
    getTags(): TTag[];
};

export type InputTagProps = {
    inputStyle?: TTextInputStyle;
} & Partial<
    Pick<
        TagTextInputProps,
        | "initialValue"
        | "textInputComponent"
        | "createTagOnReturn"
        | "createTagOnString"
        | "textInputStyle"
    >
> &
    Partial<
        Pick<TagListProps, "initialTags" | "renderTag" | "handlerPressTag">
    >;
