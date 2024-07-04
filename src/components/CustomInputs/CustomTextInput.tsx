import { CustomTextInputProp } from "@/utilities/commonInterface";

export default function CustomTextInput({
	inputBoxStyles,
	leftIcon,
	rightIcon,
  type,
  defaultValue='',
  name,
  value,
  placeholder='',
  handleChange,
  handleBlur,
  disabled = false,
  inputStyles,
  inputLabel
}: CustomTextInputProp){
  return (
    <>
      {
        (inputLabel && inputLabel.length>0) && <div className="text-md-1 capitalize py-basic">{inputLabel}</div>
      }
      <div
        style={inputBoxStyles}
        className="h-inputHeightMd w-full bg-primary-background border border-primary-theme rounded-md overflow-hidden flex items-center justify-between gap-4 pl-moderate"
      >
        {leftIcon && <div className="flex items-center">{leftIcon}</div>}
        <div className="flex-grow h-full flex items-center">
          <input
            type={type}
            name={name}
            id={name}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            style={inputStyles}
            disabled={disabled}
            className={`w-full h-full outline-none bg-primary-background ${
              disabled ? "text-dark-grey" : "text-black"
          }`}
          />
        </div>
        {rightIcon && (
          <div className="flex items-center min-w-[45px]">{rightIcon}</div>
        )}
      </div>
    </>
  );
}