function createAssessment(token, actionName, callback, error) {
    let projectID = process.env.RECAPTCHA_PROJECTID;
    let recaptchaSiteKey = process.env.RECAPTHA_KEY;
    let recaptchaAction = actionName;
    let assessmentName = "submit_test";

    const {RecaptchaEnterpriseServiceClient} =
        require('@google-cloud/recaptcha-enterprise');

    // Create the reCAPTCHA client.
    const client = new RecaptchaEnterpriseServiceClient();

    // Set the properties of the event to be tracked.
    const event = ({
      token: token,
      siteKey: recaptchaSiteKey,
    });

    const assessment = ({
      event: event,
      name: assessmentName
    });

    const projectPath = client.projectPath(projectID)

    // Build the assessment request.
    const request = ({
      assessment: assessment,
      parent: projectPath
    });

    client.createAssessment(request, function (err, response) {
      // Check if the token is valid.
      if (!response.tokenProperties.valid) {
        console.log("The CreateAssessment call failed because the token was: " +
            response.tokenProperties.invalidReason);
            error("The CreateAssessment call failed because the token was: " +
            response.tokenProperties.invalidReason)
      } else {
        // Check if the expected action was executed.
        if (response.tokenProperties.action === recaptchaAction) {
          // Get the risk score and the reason(s).
          // For more information on interpreting the assessment,
          // see: https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
          console.log("The reCAPTCHA score is: " +
              response.riskAnalysis.score);
          callback(response);
          // List classification reasons.
          response.riskAnalysis.reasons.forEach(function (reason) {
            console.log(reason);
          });
        } else {
          console.log("The action attribute in your reCAPTCHA tag " +
              "does not match the action you are expecting to score");
              error("The action attribute in your reCAPTCHA tag " +
              "does not match the action you are expecting to score");
        }
      }
    });
  }
 module.exports = createAssessment;