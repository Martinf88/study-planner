import { useStore } from "../data/store";

// TODO: hämta dagens datum från store
const Footer = () => {
  const { todayName } = useStore((state) => ({
    todayName: state.todayName,
  }));

  return (
    <footer>
      <p className="today"> Idag är det: {todayName} </p>
      <p> Studieguide | 2024 </p>
    </footer>
  );
};

export default Footer;
