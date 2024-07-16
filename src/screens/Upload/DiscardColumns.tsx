import { HeaderProp, UploadFormikProps } from "@/utilities/commonInterface";
import { FormikProps } from "formik";
import { ReactNode, useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { constants } from "@/utilities/constants";
import { read, utils } from "xlsx";
import { showWarningMessage } from "@/utilities/PopupUserExperience/PopupUserExperience";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import ColumnSelection from "@/components/ColumnSelection";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/utilities/themes/colors";
import { Checklist } from "@mui/icons-material";

/**
 * file name: {
 * 	headername: name of header
 * 	selectionIsPrivate: is th header selected for private
 * }[]
 */
interface ExcelHeadersProps {
  [key: string]: HeaderProp[];
}
export default function DiscardColumns({
  formik,
}: {
  formik: FormikProps<UploadFormikProps>;
}): ReactNode {
  const [excelHeaders, setExcelHeaders] = useState<ExcelHeadersProps | null>(
    null
  );
  const [loadingExcelData, setLoadingExcelData] = useState<boolean>(false);
  useEffect(() => {
    setExcelHeaders({
      file: [],
    });
    return;
    (async () => {
      setLoadingExcelData(true);
      const excelDataStore = {} as ExcelHeadersProps;
      for (let i = 0; i < formik.values.dataFiles.length; i++) {
        const file = formik.values.dataFiles[i];
        if (file === null) continue;
        try {
          const buffer = await file.arrayBuffer();
          const excel = read(buffer);
          const sheetNames = excel.SheetNames;
          excelDataStore[file.name] = [];
          const headersAllSheets: string[] = [];
          for (let j = 0; j < sheetNames.length; j++) {
            const sheet = excel.Sheets[sheetNames[j]];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const excelGrid = utils.sheet_to_json<any[]>(sheet, {
              header: 1,
            });
            const headers = excelGrid.at(0) ? excelGrid[0] : [];
            // eslint-disable-next-line valid-typeof
            headersAllSheets.push(
              ...headers
                .filter(
                  (header) => typeof header !== undefined || header !== null
                )
                .map<string>((header) => header.toString())
            );
          }
          excelDataStore[file.name] = headersAllSheets.map((header) => ({
            headerName: header,
            selectionIsPrivate: false,
          }));
        } catch (error) {
          console.log(error);
          showWarningMessage(`Could not process ${file.name}`);
        }
        if (Object.keys(excelDataStore).length > 0)
          setExcelHeaders(excelDataStore);
      }
    })().then(() => setLoadingExcelData(false));
  }, [formik.values.dataFiles]);
  return (
    <>
      <div className="flex flex-row py-large px-xLarge">
        <span
          className="text-black cursor-pointer mr-1 leading-lg-1"
          onClick={() =>
            formik.setFieldValue("uploadStage", "formatSpecification")
          }
        >
          <ArrowBackRoundedIcon />
        </span>
        <div className="grow">
          <h2 className="text-lg-1 font-semi-bold">Security Details</h2>
          <h3 className="text-md-1 text-grey font-medium">
            Understand how we handle your private data.
          </h3>
          <p className="py-moderate-1 font-medium">
            {constants.SECURITY_DETAILS_VERBOSE}
          </p>
          <p className="py-basic font-semi-bold text-grey">
            Note: {constants.SECURITY_DETAILS_NOTE}
          </p>
          {/* Security details excel file column view */}
          {loadingExcelData == true && <CircularProgress />}
          {loadingExcelData == false ? (
            // When non parsable excel files are uploaded
            excelHeaders == null ? (
              <div>Please upload valid excel files</div>
            ) : (
              // If some excel files are uploaded that are valid
              <>
                <div
                  style={{
                    gridTemplateColumns: `repeat(${formik.values.dataFiles.length}, minmax(0, 1fr))`,
                  }}
                  className="flex items-center gap-2 pt-moderate-1 "
                >
                  <h4 className="text-lg-2 font-semi-bold">Merged Excel.xls</h4>
                  {
                    // formik.values.dataFiles.map((dataFile) => {
                    // 	return (
                    // 		<h4 key={`${dataFile?.name}`} className="text-lg-2">{dataFile?.name}</h4>
                    // 	)
                    // })
                  }
                  <Tooltip title="Select all">
                    <IconButton
                      onClick={() => {
                        console.log(
                          formik.values.mergedColummns,
                          "formik.values.mergedColummns"
                        );
                        formik.setFieldValue(
                          "mergedColummns",
                          formik.values.mergedColummns.map((header) => {
                            return {
                              ...header,
                              selectionIsPrivate: true,
                            };
                          })
                        );
                      }}
                    >
                      <Checklist />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="border-b my-basic" />
                <div
                  style={{
                    // gridTemplateColumns: `repeat(${Object.keys(excelHeaders).length}, minmax(0, 1fr))`
                    gridTemplateColumns: `repeat(${1}, minmax(0, 1fr))`,
                  }}
                  className="grid gap-2"
                >
                  {formik.values.mergedColummns.length > 0 && (
                    <ColumnSelection
                      handleSelectionForIndex={(i) => {
                        // setExcelHeaders({
                        // 	...excelHeaders,
                        // 	[fileName]: excelHeaders[fileName].map((header, index) => i == index ? {
                        // 		...header,
                        // 		selectionIsPrivate: !header.selectionIsPrivate
                        // 	} : header)
                        // })
                        // formik.values.mergedColummns;
                        formik.setFieldValue(
                          "mergedColummns",
                          formik.values.mergedColummns.map(
                            (header, columnIndex) => {
                              if (columnIndex == i) {
                                return {
                                  ...header,
                                  selectionIsPrivate:
                                    !header.selectionIsPrivate,
                                };
                              }
                              return header;
                            }
                          )
                        );
                      }}
                      headerList={formik.values.mergedColummns}
                    />
                  )}
                  {/* {
											Object.keys(excelHeaders).map((fileName, fileIndex) => {
												return <ColumnSelection key={`excelColumn${fileIndex}`} handleSelectionForIndex={(i) => {
													setExcelHeaders({
														...excelHeaders,
														[fileName]: excelHeaders[fileName].map((header, index) => i == index ? {
															...header,
															selectionIsPrivate: !header.selectionIsPrivate
														} : header)
													})
												}} headerList={excelHeaders[fileName]} />
											})
										} */}
                </div>
              </>
            )
          ) : null}
          <div className="w-[40%] my-large mx-auto">
            <CustomButton
              variant="contained"
              buttonStyles={{
                bgcolor: colors.BLACK,
                width: "100%",
                py: 1,
              }}
              type="submit"
              btnChild={
                <span className="capitalize font-semi-bold text-white">
                  Submit
                </span>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
