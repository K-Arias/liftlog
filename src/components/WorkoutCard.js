function WorkoutCard({ workout, deleteWorkout, reopenWorkout, saveAsPreset }) {
  return (
    <section className="card workoutCard">
      <div className="cardTop">
        <div>
          <h3>{workout.dayName}</h3>
          <p>{workout.date}</p>
        </div>

        <div className="buttonRow">
          <button className="mainBtn" onClick={() => saveAsPreset(workout.id)}>
            save as preset
          </button>

          <button className="secondBtn" onClick={() => reopenWorkout(workout.id)}>
            reopen/edit
          </button>

          <button className="badBtn" onClick={() => deleteWorkout(workout.id)}>
            delete
          </button>
        </div>
      </div>

      {workout.exercises.map((ex) => (
        <div className="miniCard" key={ex.id}>
          <h4>{ex.name}</h4>

          <p>
            {ex.weight ? ex.weight + " lbs" : "no weight"} - {ex.sets} sets x {ex.reps} reps
          </p>

          <p>RIR: {ex.rir}</p>

          {ex.notes && <p>notes: {ex.notes}</p>}
        </div>
      ))}
    </section>
  );
}

export default WorkoutCard;