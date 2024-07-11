import { CustomFileUploadProp } from "@/utilities/commonInterface";
import { showWarningMessage } from "@/utilities/PopupUserExperience/PopupUserExperience";
import { Divider } from "@mui/material";
import { useRef, useState } from "react";

export default function CustomFileUpload({
	inputLabel,
	handleChange,
	acceptString,
  selectedFileParent = null
}: CustomFileUploadProp) {
  const selectedFileInput = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(selectedFileParent)
  return (
    <>
      {inputLabel && (
        <div className="text-md-1 capitalize py-basic">{inputLabel}</div>
      )}
      <div>
        <label className="w-full h-full cursor-pointer">
          <input
						onChange={() => {
							if(selectedFileInput.current?.files && selectedFileInput.current?.files?.length > 0){
                const fileSelectionVerdict = selectedFileInput.current?.files && handleChange && handleChange(selectedFileInput.current?.files)
                if(fileSelectionVerdict) setSelectedFile(selectedFileInput.current.files[0])
                else
                  showWarningMessage('File already selected!')
              }
						}}
            multiple={false}
            ref={selectedFileInput}
            accept={acceptString}
            type="file"
            className="hidden"
          />
          <div className="border border-primary-theme gap-4 rounded-md p-basic-1 flex flex-row justify-start text-grey">
            <div className="flex flex-row justify-center capitalize">
              choose file
            </div>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 2,
              }}
            />
            <div className="grow truncate">
              {selectedFile && selectedFile.name}
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
