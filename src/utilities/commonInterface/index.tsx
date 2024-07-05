import { SxProps } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { ReactNode } from 'react'

export type inputChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type textAreaChangeEventType = React.ChangeEvent<HTMLTextAreaElement>;
export type KeybordEventType = React.KeyboardEvent<HTMLInputElement>;

export interface CustomTextInputProp {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  inputBoxStyles?: CSSProperties;
  inputLabel?: string
  type: "text" | "password" | "number";
  name?: string
  disabled?: boolean;
  defaultValue?:string
  value?: string;
  placeholder?: string;
  handleChange?: (ev: inputChangeEventType) => void;
  handleBlur?: (ev: inputChangeEventType) => void;
  inputStyles?: CSSProperties;
}

export interface CustomTextAreaProp {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  inputBoxStyles?: CSSProperties;
  inputLabel?: ReactNode
  name?: string
  disabled?: boolean;
  defaultValue?:string
  value?: string;
  placeholder?: string;
  handleChange?: (ev: textAreaChangeEventType) => void;
  handleBlur?: (ev: textAreaChangeEventType) => void;
  inputStyles?: CSSProperties;
}

export interface CustomFileUploadProp {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  inputBoxStyles?: CSSProperties;
  inputLabel?: ReactNode
  name?: string
  disabled?: boolean;
  defaultValue?:string
  value?: string;
  placeholder?: string;
  handleChange?: (files: FileList) => void;
  handleBlur?: (ev: inputChangeEventType) => void;
  inputStyles?: CSSProperties;
  acceptString: string
}

export interface CustomButtonProp {
	handleClick?: () => void;
	btnChild: string | ReactNode;
	buttonStyles?: SxProps;
	variant?: "outlined" | "contained" | "text";
	type?: "submit" | "button";
	disabled?: boolean;
	showLoader?: boolean;
}