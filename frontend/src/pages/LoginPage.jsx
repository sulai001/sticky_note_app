import Login from '../components/Login'

function LoginPage({ onLoginSuccess, onSwitchToSignup }) {
  return (
    <Login 
      onLoginSuccess={onLoginSuccess} 
      onSwitchToSignup={onSwitchToSignup}
    />
  )
}

export default LoginPage