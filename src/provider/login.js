// import
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

// icon
import GoogleIcon from "../images/google_icon.svg";
import FacebookIcon from "../images/facebook_icon.svg";

// export
export const GoogleLoginProvider = (props) => {
  return (
    <GoogleLogin
      clientId="257182584784-k2kdfsbii17muh4rirar6m5nhm7mueuc.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={props.handlerLogin}
      onFailure={props.handlerLogin}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="gg-login-btn"
        >
          <span
            className="icon"
            style={{
              backgroundImage: `url(${GoogleIcon})`,
            }}
          ></span>
          <span className="text">Google</span>
        </button>
      )}
    />
  );
};

export const FacebookLoginProvider = (props) => {
  return (
    <FacebookLogin
      appId="187968122879403"
      textButton="FACEBOOK"
      fields="name,email,picture"
      callback={props.handlerLogin}
      render={(renderProps) => (
        <button
          className="gg-login-btn"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span
            className="icon"
            style={{
              backgroundImage: `url(${FacebookIcon})`,
            }}
          ></span>
          <span className="text">Facebook</span>
        </button>
      )}
    />
  );
};

export const GithubLogin = () => {};

const LoginProvider = ({ type, handlerLogin }) => {
  switch (type) {
    case "gg":
    case "google":
      return <GoogleLoginProvider handlerLogin={handlerLogin} />;
    case "fb":
    case "facebook":
      return <FacebookLoginProvider handlerLogin={handlerLogin} />;
  }
};

export default LoginProvider;
