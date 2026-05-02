import { useNavigate } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard";


function History({ gymStuff, deleteWorkout, reopenWorkout, saveAsPreset }) {
  const navigate = useNavigate();


  function handleReopen(id) {
    const worked = reopenWorkout(id);

    if (worked) {
      navigate("/workout");
    }
  }


  return (
    <div>
      <h1>Workout history</h1>

      {gymStuff.length === 0 ? (
        <section className="card">
          <p>no finished workouts yet</p>
        </section>
      ) : (
        <div>
          {gymStuff.map((workout) => (
            <WorkoutCard 
              key={workout.id}
              workout={workout}
              deleteWorkout={deleteWorkout}
              reopenWorkout={handleReopen}
              saveAsPreset={saveAsPreset}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;