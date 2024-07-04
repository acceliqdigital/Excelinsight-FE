import { SxProps } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { ReactNode } from 'react'

export type inputChangeEventType = React.ChangeEvent<HTMLInputElement>;
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

export interface CustomButtonProp {
	handleClick?: () => void;
	btnChild: string | ReactNode;
	buttonStyles?: SxProps;
	variant?: "outlined" | "contained" | "text";
	type?: "submit" | "button";
	disabled?: boolean;
	showLoader?: boolean;
}