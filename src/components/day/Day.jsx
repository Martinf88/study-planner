import Item from "./Item";

// OBS, det är tillåtet att lägga till flera props
// När du testar, rendera komponenten med olika värden på props
const Day = ({ day, name }) => {
  return (
    <div className="day">
      <h2> {name} </h2>

      {day.map((item) => (
        <Item key={item.id} item={item} />
      ))}

      <div className="controls">
        <button> Ny uppgift </button>
      </div>
    </div>
  );
};

export default Day;
