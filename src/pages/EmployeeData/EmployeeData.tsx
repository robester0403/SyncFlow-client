import Lottie from "lottie-react";
import { useEffect } from "react";
import commingSoonAnimation from "../../assets/animations/113096-coming-soon.json";
import "./EmployeeData.scss";
import useAuth from "../../hooks/useAuth";
import { getEmployees } from "../../utils/api";
const EmployeeData = () => {
  const { auth } = useAuth();
  useEffect(() => {
    // You don't need to have this async await logic here. You just need it in your api function.
    const employeeData = async () => {
      const response = await getEmployees(auth.accessToken);
      console.log(response);
    };
    employeeData();
  }, []);

  return (
    <Lottie className="employee-page" animationData={commingSoonAnimation} />
  );
};

export default EmployeeData;
