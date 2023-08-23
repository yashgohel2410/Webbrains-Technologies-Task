import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginController = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //For getting the Error fields
  const [firstErrorFieldName, setFirstErrorFieldName] = useState("");
  const firstErrorFieldRef = useRef(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all required fields");
      const firstErrorField = ["username", "password"].find(
        (field) => !formData[field]
      );
      if (firstErrorField) {
        setFirstErrorFieldName(firstErrorField);
      }
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.status === 200) {
        toast.success("Login successful");
        const user = data.user.department;
        navigate(`/dashboard/${user}`);
      } else if (response.status === 401) {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (firstErrorFieldName && firstErrorFieldRef.current) {
      firstErrorFieldRef.current.focus();
    }
  }, [firstErrorFieldName]);

  return {
    handleInputChange,
    handleSubmit,
    formData,
    firstErrorFieldName,
    firstErrorFieldRef,
  };
};

export default LoginController;
