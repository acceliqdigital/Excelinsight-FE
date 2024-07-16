import CustomTextInput from "@/components/CustomInputs/CustomTextInput";
import { constants } from "@/utilities/constants";
import { useFormik } from "formik";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomButton from "@/components/CustomButton";
import { colors } from "@/utilities/themes/colors";
import { useNavigate } from "react-router-dom";
import { routes } from "@/utilities/routes";
import {
  API_END_POINTS,
  CONTENT_TYPES,
  headersList,
  postData,
} from "@/utilities/api/apiConfig";
import { GenericObjectInterface } from "@/utilities/commonInterface";
import { AxiosError } from "axios";
import { ApiStatusCodes } from "@/utilities/api/apiStatusCodes";
import { useDispatch } from "react-redux";
import { updateUserCredentials } from "@/redux/reducers/userReducer";
import { showErrorMessage } from "@/utilities/PopupUserExperience/PopupUserExperience";

interface FormikLoginProps {
  email: string;
  password: string;
  showPassword: boolean;
}

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginRequest = async (value: FormikLoginProps) => {
    try {
      CONTENT_TYPES.APPLICATION_JSON;
      const headers = {
        ...headersList,
        "Content-Type": CONTENT_TYPES.APPLICATION_JSON,
      };
      const response = await postData<GenericObjectInterface>(
        headers,
        JSON.stringify({
          username_or_email: value.email,
          password: value.password,
        }),
        API_END_POINTS.LOGIN
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const formik = useFormik<FormikLoginProps>({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log(values);
      handleLoginRequest(values)
        .then((response) => {
          console.log(response);
          dispatch(
            updateUserCredentials({
              userEmail: values.email,
              userToken: response.data.token,
            })
          );
          navigate(routes.UPLOAD);
        })
        .catch((error) => {
          if (
            (error as AxiosError).response?.status == ApiStatusCodes.FORBIDDEN
          ) {
            dispatch(
              updateUserCredentials({
                userEmail: values.email,
                userToken: (error as AxiosError<GenericObjectInterface>)
                  .response?.data["token"],
              })
            );
            navigate(routes.HOME);
          } else if (
            (error as AxiosError).response?.status ==
            ApiStatusCodes.UNAUTHORIZED
          ) {
            showErrorMessage("Login credentials were invalid");
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  return (
    <>
      <div className="mb-large">
        <h2 className="text-lg">{constants.LOG_IN}</h2>
        <h3 className="text-md-1">{constants.ENTER_CREDENTIALS_MESSAGE}</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <CustomTextInput
          inputLabel="email address"
          name="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="example@email.com"
          children
          type="text"
        />
        <CustomTextInput
          inputLabel="Password"
          name="password"
          rightIcon={
            <span
              className="cursor-pointer"
              onClick={() =>
                formik.setFieldValue(
                  "showPassword",
                  !formik.values.showPassword
                )
              }
            >
              {formik.values.showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </span>
          }
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
          children
          type={formik.values.showPassword ? "text" : "password"}
        />
        <div
          onClick={() => navigate(`${routes.HOME}${routes.FORGOT_PASSWORD}`)}
          className="text-md-1 my-basic text-right underline cursor-pointer"
        >
          {constants.FORGOT_PASSWORD_PROMPT}
        </div>
        <CustomButton
          buttonStyles={{
            width: "100%",
            my: 2,
            bgcolor: colors.BLACK,
            boxShadow: "none",
            ":hover": {
              bgcolor: colors.BLACK,
            },
          }}
          showLoader={formik.isSubmitting}
          btnChild={<span className="capitalize text-white">Log In</span>}
          variant="contained"
          type="submit"
        />
      </form>
    </>
  );
}
