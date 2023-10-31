import AdminDispositionsPageComponent from "./components/AdminDispositionsPageComponent";
import axios from 'axios';

const getDispositions = async (days) => {
  const { data } = await axios.get("/api/classes/dispositions", { params: {days}});
  return data;
};

const deleteDispositions = async (days, title) => {
  const {data} = await axios.delete("/api/classes/dispositions", { params: {days, title} });
  return data;
};

const addDisposition = async (newDispositionDay, startsTime, endsTime) => {
  const { data } = await axios.post("/api/classes/disposition", { newDispositionDay, startsTime, endsTime });
  return data;
};

const AdminDispositionsPage = () => {

  return <AdminDispositionsPageComponent getDispositions={getDispositions} deleteDispositions={deleteDispositions} addDisposition={addDisposition} />
    
}

export default AdminDispositionsPage;