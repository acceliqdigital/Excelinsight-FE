import { SxProps } from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";
import { ReactNode } from 'react'

export type inputChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type textAreaChangeEventType = React.ChangeEvent<HTMLTextAreaElement>;
export type KeybordEventType = React.KeyboardEvent<HTMLInputElement>;


export interface GenericObjectInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
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

export interface HeaderProp{
  headerName: string,
  selectionIsPrivate: boolean
}

export type CustomResponse<T> = {
  data: T;
  status: number;
};

export interface UploadFormikProps {
  'dataFiles': (File | null)[]
  'supplementaryFiles': (File | null)[],
  mergedColummns: HeaderProp[],
  mergedDF: GenericObjectInterface[][]
  businessModelDescription: string,
  businessInsightsReport: string,
  outputFormatDescription: string,
  uploadStage: 'upload' |  'formatSpecification' | 'columnDiscard' | 'discardedColumnView' | 'processing' | 'discrepencyDisplay' | 'loading'
}

export interface CustomFileUploadProp {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  inputBoxStyles?: CSSProperties;
  inputLabel?: ReactNode
  name?: string
  selectedFileParent?: File | null
  disabled?: boolean;
  defaultValue?:string
  value?: string;
  placeholder?: string;
  handleChange?: (files: FileList) => boolean;
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