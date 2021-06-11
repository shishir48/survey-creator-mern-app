import React from "react"
import { reduxForm, Field } from "redux-form"
import SurveyField from "./SurveyField"
import _ from "lodash"
import { Link } from "react-router-dom"
import validateEmails from "../../utils/validateEmails"
import formField from "./formField"

class SurveyForm extends React.Component {
    renderFields() {
        return _.map(formField, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            )
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        className="teal btn-flat right white-text"
                        type="submit"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    const error = {}
    error.recipients = validateEmails(values.recipients || "")
    _.each(formField, ({ name }) => {
        if (!values[name]) {
            error[name] = "you must enter a value"
        }
    })

    return error
}

export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false,
})(SurveyForm)
