import UserSignUpForClassesPageComponent from "./components/UserSignUpForClassesPageComponent";
import axios from 'axios';

const getFreeClasses = async (days) => {
  const { data } = await axios.get("/api/classes/free-lessons", {params: { days }});
  return data;
};

const signUpForClasses = async (lessonID, comment) => {
  const { data } = await axios.post("/api/classes/sign-up-for-classes", { lessonID, comment });
  return data;
}

const UserSignUpForClassesPage = () => {

  return <UserSignUpForClassesPageComponent getFreeClasses={getFreeClasses} signUpForClasses={signUpForClasses} />

}

export default UserSignUpForClassesPage;