import React from "react"
import { connect } from "react-redux"
import _ from "lodash"
import formField from "./formField"
import * as actions from "../../actions"
import { withRouter } from "react-router-dom"

const SurveyFormReview = (props) => {
    return (
        <div>
            {_.map(formField, ({ name, label }) => {
                return (
                    <div>
                        <label>{label}</label>
                        <div>{props.formValues[name]}</div>
                    </div>
                )
            })}
            <button
                className="yellow btn-flat white-text"
                onClick={props.onCancel}
            >
                back
            </button>
            <button
                onClick={() =>
                    props.sendSurvey(props.formValues, props.history)
                }
                className="btn-flat green darken-3 right white-text"
            >
                Submit
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
