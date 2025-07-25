import Signup from '../components/Signup'

function SignupPage({ onSignupSuccess, onSwitchToLogin }) {
  return (
    <Signup 
      onSignupSuccess={onSignupSuccess} 
      onSwitchToLogin={onSwitchToLogin}
    />
  )
}

export default SignupPage