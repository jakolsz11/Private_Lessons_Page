import AdminClassesPageComponent from "./components/AdminClassesPageComponent";
import axios from 'axios';

const getClasses = async (days) => {
  const {data} = await axios.get("/api/classes/my-classes", { params: { days } });
  return data;
};

const cancelClasses = async (days, title) => {
  const { data } = await axios.post("/api/classes/admin/cancel-classes", { days, title });
  return data;
}

const AdminClassesPage = () => {

  return <AdminClassesPageComponent getClasses={getClasses} cancelClasses={cancelClasses} />
}

export default AdminClassesPage;