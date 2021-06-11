import React from "react"
import SurveyForm from "./SurveyForm"
import SurveyFormReview from "./SurveyFormReview"
import { reduxForm } from "redux-form"

class SurveyNew extends React.Component {
    state = { showFormReview: false }

    renderContent = () => {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            )
        } else {
            return (
                <SurveyForm
                    onFormSubmit={() => this.setState({ showFormReview: true })}
                />
            )
        }
    }
    render() {
        return <div>{this.renderContent()}</div>
    }
}

export default reduxForm({ form: "surveyForm" })(SurveyNew)
