import MessagesContainer from "../../components/messages/MessagesContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full h-full rounded-lg overflow-hidden border border-gray-300">
      <Sidebar />
      <MessagesContainer />
    </div>
  );
};

export default Home;
