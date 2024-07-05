import { CustomTextAreaProp } from "@/utilities/commonInterface";

export default function CustomTextAreaInput({
	inputBoxStyles,
	leftIcon,
	rightIcon,
  defaultValue='',
  name,
  value,
  placeholder='Type here...',
  handleChange,
  disabled = false,
  inputStyles,
  inputLabel
}: CustomTextAreaProp){
  return (
    <>
      {
        (inputLabel) && <div className="text-md-1 capitalize py-basic">{inputLabel}</div>
      }
      <div
        style={inputBoxStyles}
        className="min-h-32 w-full bg-primary-background border border-primary-theme rounded-md overflow-hidden flex flex-col items-center justify-between gap-4 pl-moderate py-basic"
      >
        {leftIcon && <div className="flex items-center">{leftIcon}</div>}
        <div className="flex-grow h-full w-full flex flex-col items-center">
          <textarea
            name={name}
            id={name}
            rows={4}
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            style={inputStyles}
            disabled={disabled}
            className={`w-full h-full grow peer resize-none outline-none bg-primary-background ${
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