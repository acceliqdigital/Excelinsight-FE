import { KeybordEventType } from "@/utilities/commonInterface";
import { useFormik } from "formik";
import { ReactNode } from "react";
import CustomButton from "../CustomButton";
import { colors } from "@/utilities/themes/colors";
export default function OTP({
  title,
  subtitle,
  goBackHandler,
	handleSubmit,
  submitMessage = "verify OTP",
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  goBackHandler?: () => void;
  submitMessage?: string;
	handleSubmit: () => void
}) {
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""],
    },
    onSubmit: (values) => {
      console.log(values);
			handleSubmit()
    },
  });
  const inputOnKeyDown = (e: KeybordEventType, index: number) => {
    const target = e.target as HTMLInputElement;
    if (e.key == "Enter") return;

    if (e.key === "Backspace") {
      formik.setFieldValue(
        "otp",
        formik.values.otp.map((v, i) => (i == index ? "" : v))
      );
      const previousElementSibling =
        target.previousElementSibling as HTMLInputElement | null;
      if (previousElementSibling) {
        previousElementSibling.focus();
      }
    } else {
      if (!isNaN(parseInt(e.key))) {
        formik.setFieldValue(
          "otp",
          formik.values.otp.map((v, i) => (i == index ? e.key : v))
        );
        const nextElementSibling = e.currentTarget
          .nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
          nextElementSibling.focus();
        }
      }
    }
  };
  return (
    <div>
      <div className="text-lg-1 text-center my-moderate">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="mx-auto inline-block">
            {formik.values.otp.map((value, index) => (
              <input
                defaultValue={''}
                type="text"
                key={index}
                value={value}
                onKeyDown={(event) => inputOnKeyDown(event, index)}
                autoComplete="one-time-code"
                maxLength={1}
                className="text-center bg-primary-background mr-basic md:h-14 md:w-14 h-10 w-10 rounded-lg border border-primary-theme"
              />
            ))}
          </div>
        </div>
        <h4 className="my-basic text-center">
          Didn't receive it? Resend in{" "}
          <span className="text-link-blue">00:51</span>
        </h4>
        <CustomButton
          buttonStyles={{
            width: "100%",
            bgcolor: colors.BLACK,
            ":hover": {
              bgcolor: colors.BLACK,
            },
            mt: 4,
          }}
          type="submit"
          variant="contained"
          btnChild={<span className="capitalize">{submitMessage}</span>}
        />
        {goBackHandler && (
          <h5 className="text-right my-basic">
            <span
              className="text-link-blue cursor-pointer"
              onClick={goBackHandler}
            >
              Go back?
            </span>
          </h5>
        )}
      </form>
    </div>
  );
}
