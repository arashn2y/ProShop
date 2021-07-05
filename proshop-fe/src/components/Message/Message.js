import { Alert } from "react-bootstrap";

const message = ({ variant, children }) => {
  return (
    <div>
      <Alert variant={variant} style={{ width: "100%" }}>
        {children}
      </Alert>
    </div>
  );
};

message.defaultProps = {
  variant: "info",
};

export default message;
