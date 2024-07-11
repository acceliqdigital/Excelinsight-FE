import CustomButton from "@/components/CustomButton";
import CustomFileUpload from "@/components/CustomInputs/CustomFileUpload";
import CustomTextAreaInput from "@/components/CustomInputs/CustomTextAreaInput";
import { GenericObjectInterface, HeaderProp, UploadFormikProps } from "@/utilities/commonInterface";
import { colors } from "@/utilities/themes/colors";
import { useFormik } from "formik";
import OutputFormat from "@/screens/Upload/outputFormat";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { showWarningMessage } from "@/utilities/PopupUserExperience/PopupUserExperience";
import DiscardColumns from "./DiscardColumns";
import { CircularProgress } from "@mui/material";
import { API_END_POINTS, CONTENT_TYPES, headersList, postData } from "@/utilities/api/apiConfig";
import Descrepencies from "./Descrepencies";
import { useState } from "react";

export default function Upload() {
  const [discrepencyPayload, setDiscrepencyPayload] = useState<GenericObjectInterface | null>(null)
  const formik = useFormik<UploadFormikProps>({
    initialValues: {
      dataFiles: [null],
      supplementaryFiles: [null],
      businessModelDescription: "",
      businessInsightsReport: "",
      outputFormatDescription: "",
      mergedColummns: [],
      mergedDF: [],
      uploadStage: "upload",
    },
    onSubmit: async (values, {
      setSubmitting,
    }) => {
      console.log(values);
      setSubmitting(false)
      console.log('semnding data to backend')
      formik.setFieldValue('uploadStage', 'loading')
      // resetForm()
      if(formik.values.uploadStage == 'formatSpecification'){
        try {
          const headers = {
            ...headersList,
            'Content-Type': CONTENT_TYPES.FORM_DATA
          }
          const formData = new FormData()
          formData.append('name_1', values.dataFiles[0] ? values.dataFiles[0].name : 'null')
          formData.append('file_1', values.dataFiles[0] ? values.dataFiles[0] : 'null')
  
          formData.append('name_2', values.dataFiles[1] ? values.dataFiles[1].name : 'null')
          formData.append('file_2', values.dataFiles[1] ? values.dataFiles[1] : 'null')
  
          formData.append('name_3', values.dataFiles[2] ? values.dataFiles[2].name : 'null')
          formData.append('file_3', values.dataFiles[2] ? values.dataFiles[2] : 'null')
  
          formData.append('name_4', values.supplementaryFiles[0] ? values.supplementaryFiles[0].name : 'null')
          formData.append('file_4', values.supplementaryFiles[0] ? values.supplementaryFiles[0] : 'null')
  
          formData.append('name_5', values.supplementaryFiles[1] ? values.supplementaryFiles[1].name : 'null')
          formData.append('file_5', values.supplementaryFiles[1] ? values.supplementaryFiles[1] : 'null')
  
          const response = await postData<GenericObjectInterface>(headers, formData, API_END_POINTS.INSIGHT_EXCEL_UPLOAD)
          console.log(response)
          const mergedColummns = (response.data['merged_df_columns'] as string[]).map<HeaderProp>(columnName => ({
            headerName: columnName,
            selectionIsPrivate: false
          }))
          formik.setFieldValue('mergedColummns', mergedColummns)
          formik.setFieldValue('mergedDF', response.data['merged_df_data'])
        } catch (error) {
          console.log(error)
        } finally {
          formik.setFieldValue('uploadStage', 'columnDiscard')
        }
      } else if(formik.values.uploadStage == 'columnDiscard') {
        try {
          const headers = {
            ...headersList,
            'Content-Type': CONTENT_TYPES.APPLICATION_JSON
          }
          const response = await postData<GenericObjectInterface>(
            headers,
            JSON.stringify({
              'selected_columns': formik.values.mergedColummns.filter((column) => column.selectionIsPrivate).map<string>(column => column.headerName),
              'merged_df': {
                'merged_df_data': formik.values.mergedDF,
                'merged_df_columns': formik.values.mergedColummns.map<string>(c => c.headerName)
              }
            }),
            API_END_POINTS.INSIGHT_EXCEL_FILTER
          )
          console.log(response)
          console.log(JSON.parse(response.data['discrepancies']))
          setDiscrepencyPayload(JSON.parse(response.data['discrepancies']))
          formik.setFieldValue('uploadStage', 'discrepencyDisplay')
        } catch (error) {
          console.log(error)
          formik.setFieldValue('uploadStage', 'upload')
        }
      }
    },
  });
  return (
    <div className="flex flex-row grow self-stretch">
      <div className="w-1/4"></div>
      <div className="bg-white w-3/4 p-moderate grow rounded-md m-basic mr-0">
        <form onSubmit={formik.handleSubmit} className="h-full">
          {formik.values.uploadStage == "upload" && (
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg-1 font-semi-bold">Data File Upload</h2>
                {formik.values.dataFiles.map((_, index) => {
                  return (
                    <div className="flex flex-row" key={`dataFiles${index}`}>
                      <div className="w-[90%] my-basic">
                        <CustomFileUpload
                          selectedFileParent={_}
                          acceptString=".xls,.xlsx"
                          handleChange={(files) => {
                            if (files.item(0)) {
                              console.log(!formik.values.dataFiles.find(file => file?.name === files.item(0)?.name))
                              // File doesnt already exist
                              if(!formik.values.dataFiles.find(file => file?.name === files.item(0)?.name)){
                                formik.setFieldValue(
                                  "dataFiles",
                                  formik.values.dataFiles.map((dataFile, i) => {
                                    if (i == index) return files.item(0);
                                    else return dataFile;
                                  })
                                );
                                return true
                              } else {
                                return false
                              }
                            }
                            return false
                          }}
                        />
                      </div>
                      {index == formik.values.dataFiles.length - 1 && (
                        <span onClick={() => formik.values.dataFiles.length < 3 ? formik.setFieldValue('dataFiles', [...formik.values.dataFiles, null]) : showWarningMessage('You can add upto 3 excel files')} className="flex flex-row justify-center bg-primary-theme rounded-full cursor-pointer m-auto">
                          <AddRoundedIcon />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg-1 font-semi-bold">Supplementary Document Upload</h2>
                {
                  formik.values.supplementaryFiles.map((_, index) => {
                    return (
                      <div key={`supplementFile${index}`} className="flex flex-row">
                        <div className="w-[90%] my-basic">
                          <CustomFileUpload
                            acceptString=".txt"
                            selectedFileParent={_}
                            handleChange={(files) => {
                              if (files.item(0)) {
                                formik.setFieldValue(
                                  "supplementaryFiles",
                                  formik.values.supplementaryFiles.map((supplementaryFile, i) => {
                                    if (i == index) return files.item(0);
                                    else return supplementaryFile;
                                  })
                                );
                              }
                              return true
                            }}
                          />
                        </div>
                        {index == formik.values.supplementaryFiles.length - 1 && (
                          <span onClick={() => formik.values.supplementaryFiles.length < 2 ? formik.setFieldValue('supplementaryFiles', [...formik.values.supplementaryFiles, null]) : showWarningMessage('You can add upto 2 supplementary files')} className="flex flex-row justify-center bg-primary-theme rounded-full cursor-pointer m-auto">
                            <AddRoundedIcon />
                          </span>
                        )}
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-start-1 col-end-3">
                <h2 className="text-lg-1 font-semi-bold">
                  Business Model Description
                </h2>
                <div>
                  <CustomTextAreaInput
                    value={formik.values.businessModelDescription}
                    name="businessModelDescription"
                    placeholder="Type here ..."
                    handleChange={formik.handleChange}
                    inputLabel={
                      <span className="font-semi-bold tracking-wide">
                        Describe your Business model
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-start-1 col-end-3">
                <div className="w-[40%] mx-auto">
                  <CustomButton
                    variant="contained"
                    buttonStyles={{
                      bgcolor: colors.BLACK,
                      width: "100%",
                      py: 1,
                    }}
                    handleClick={() => {
                      formik.setFieldValue("uploadStage", "formatSpecification");
                    }}
                    btnChild={
                      <span className="capitalize font-semi-bold text-white">
                        Next
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {
            formik.values.uploadStage == 'loading' && (
              <CircularProgress />
            )
          }
          {formik.values.uploadStage == "formatSpecification" && (
            <OutputFormat formik={formik} />
          )}
          {
            formik.values.uploadStage == 'columnDiscard' && (
              <DiscardColumns formik={formik} />
            )
          }
          {
            formik.values.uploadStage == 'discrepencyDisplay' && (
              <Descrepencies discrepencyPayload={discrepencyPayload} formik={formik} />
            )
          }
        </form>
      </div>
    </div>
  );
}
