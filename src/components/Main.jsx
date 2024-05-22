import { useStore } from "../data/store.js";
import Day from "./day/Day";
import PrioList from "./prio-list/PrioList.jsx";
import { splitTodosIntoDays } from "../utils/list.js";

const Main = () => {
  const { todos, todayName } = useStore((state) => ({
    todos: state.todos,
    todayName: state.todayName,
  }));

  const days = splitTodosIntoDays(todos);

  const dayNames = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  return (
    <main>
      <div className="day-view">
        {days.map((d, index) => (
          <Day day={d} name={dayNames[index]} key={`${todayName}-${index}`} />
        ))}
      </div>

      <hr />

      <PrioList />
    </main>
  );
};

export default Main;
