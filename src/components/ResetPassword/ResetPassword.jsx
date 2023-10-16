import { sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [sentSuccessful, setSentSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSentSuccessful(true);
    } catch (error) {
      setWrongEmail(true);
      throw new Error(`Error occured: ${error.message}`);
    } finally {
      if (sentSuccessful) {
        setTimeout(() => {
          setSentSuccessful(false);
          navigate("/");
        }, 2700);
      } else {
        setTimeout(() => {
          setWrongEmail(false);
        }, 3000);
      }
    }
  };

  return (
    <center style={{ width: "10cm", margin:'auto', width: '40%'}}>
      <h2 style={{ marginBottom: "0.5cm", marginTop: "0.75cm" }}>
        Reset your password
      </h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>

      {sentSuccessful && (
        <div className="alert alert-success" role="alert">
          <strong>Reset link sent successfully.</strong> Please check your
          email!
        </div>
      )}

      {wrongEmail && (
        <div className="alert alert-danger" role="alert">
          <strong>Wrong email!</strong> Please enter a valid one!
        </div>
      )}
    </center>
  );
};
