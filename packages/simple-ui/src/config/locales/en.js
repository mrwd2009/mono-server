export default {
  auth: {
    validator: {
      requiredEmail: 'Please input your email.',
      validEmail: 'Please input valid email.',
      requiredPassword: 'Please input your password.',
      strongPassword: 'At least 11 characters with at least one capital letter, one lower case letter, one number, and one special character.',
      consistentPassword: 'Password and confirm password should be consistent.',
      requiredName: 'Please input your name.',
      confirmPassword: 'Please confirm your password.',
    },
    help: {
      forgetPassword: "Enter your email address that you used to register. We'll send you an email with your username and a link to reset your password.",
    },
    notification: {
      sendResetEmail: 'An password resetting email has sent, please check your email.',
      sendActivationEmail: 'An activation email has sent, please check your email.',
      resetPassword: 'Password reset successfully.',
      emptyRedirectRoute: 'You do not have permission to access target page.',
      passwordExpired: 'Your password has expired and must be changed.',
    },
  }
}