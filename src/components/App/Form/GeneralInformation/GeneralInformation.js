import { Formik } from "formik";
import { InputBox, InputBoxWithDropdown } from "../../elements/InputBox";
import {
  NextSectionButton,
  SaveReviewedSectionButton,
} from "../../elements/Buttons";
import listOfCountries from "./listOfCountries";
import TextBox from "../../elements/TextBox";
import * as Yup from "yup";

const GeneralEducation = ({
  dataHistory,
  reviewMode,
  updateDataHistoryAndDisableReviewMode,
  updateDataHistoryAndDisplaySelectionMenu,
}) => {
  return (
    <main className="section GeneralInformation">
      <Formik
        initialValues={{
          firstName: dataHistory ? dataHistory.firstName : "",
          lastName: dataHistory ? dataHistory.lastName : "",
          phone: dataHistory ? dataHistory.phone : "",
          email: dataHistory ? dataHistory.email : "",
          home: dataHistory ? dataHistory.home : "",
          city: dataHistory ? dataHistory.city : "",
          country: dataHistory ? dataHistory.country : "",
          birthDate: dataHistory ? dataHistory.birthDate : "",
          workField: dataHistory ? dataHistory.workField : "",
          introduction: dataHistory ? dataHistory.introduction : "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Please enter your first name."),
          lastName: Yup.string().required("Please enter your last name."),
          phone: Yup.number()
            .required("Please enter your phone number.")
            .typeError("You did not enter a phone number."),
          email: Yup.string().email().required("Please enter your email."),
          home: Yup.string().required("Please enter your home address."),
          city: Yup.string().required("Please enter your city."),
          country: Yup.string().required("Please enter your country."),
          birthDate: Yup.date().required("Please enter your birth date."),
          workField: Yup.string().required("Please enter your work field."),
          introduction: Yup.string()
            .required("Please tell us more about you.")
            .max(50, "You have exceeded the maximum length."),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (reviewMode)
            updateDataHistoryAndDisableReviewMode(
              values,
              "general-information"
            );
          else
            updateDataHistoryAndDisplaySelectionMenu(
              values,
              "general-information"
            );
          setSubmitting(false);
        }}
      >
        {(formikProps) => (
          <form
            aria-label="form"
            className="form"
            onReset={formikProps.handleReset}
            onSubmit={formikProps.handleSubmit}
          >
            <InputBox
              type="text"
              name="firstName"
              label="Your first name"
              placeholder="Ada"
            />
            <InputBox
              type="text"
              name="lastName"
              label="Your last name"
              placeholder="Lovelace"
            />
            <InputBox
              type="tel"
              name="phone"
              label="Your phone"
              placeholder="+37 852 458"
            />
            <InputBox
              type="email"
              name="email"
              label="Your email"
              placeholder="ada.lovelace@mail.com"
            />
            <InputBox
              role="textbox"
              type="date"
              name="birthDate"
              label="Your birth date"
            />
            <InputBox
              type="text"
              name="workField"
              label="Your usual work field"
              placeholder="Computer scientist"
            />
            <InputBox
              type="text"
              name="home"
              label="Your home address"
              placeholder="St. James Street 3"
            />
            <InputBox
              type="text"
              name="city"
              label="Your city"
              placeholder="London"
            />
            <InputBoxWithDropdown
              type="text"
              name="country"
              label="Your country"
              placeholder="England"
              contents={listOfCountries}
            />
            <TextBox
              label="About you"
              maxCharacters={50}
              name="introduction"
              placeholder="Tell us more about your path..."
            />
            {reviewMode ? <SaveReviewedSectionButton /> : <NextSectionButton />}
          </form>
        )}
      </Formik>
    </main>
  );
};

export default GeneralEducation;
