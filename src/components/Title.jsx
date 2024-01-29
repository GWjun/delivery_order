import { Link } from "react-router-dom";

const Title = ({ backUrl = "", children }) => {
  if (backUrl) {
    return (
      <>
        <Link to={backUrl}></Link>
        <h1 style={{ paddingRight: "44px" }}>{children}</h1>
      </>
    );
  }

  return <h1>{children}</h1>;
};

export default Title;
