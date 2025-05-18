import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader size={80} color="#bfd6ea" loading />
    </div>
  );
};

export default Loader;
