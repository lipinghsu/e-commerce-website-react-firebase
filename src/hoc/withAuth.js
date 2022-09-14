import { useAuth } from './../customHooks'

const WithAuth = props => useAuth(props) && props.children;

// when we export from hoc, we need to wrap WithAuth with withRouter. 
export default WithAuth;