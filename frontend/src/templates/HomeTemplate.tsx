import Header from "../components/Header";

const HomeTemplate = () => {
  const a = localStorage.getItem("accessToken");
  return (
    <div>
      <Header />
    </div>
  );
};

export default HomeTemplate;
