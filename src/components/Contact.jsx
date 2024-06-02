import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const { phone, name } = useContext(AppContext);

  return (
    <>
      <div>
        <h3>Contact</h3>
        <h3>Phone:{phone}</h3>
        <h4>Name:{name}</h4>
      </div>
    </>
  );
};

export default Contact;
