import React from "react";

const FeedbackPage = (props) => {
    return (
        <>
            <h2>Feedback</h2>
            {props.match.params.firstName}
        </>
    );
};

export default FeedbackPage;
