import { useState } from "react";


function ExerciseForm({ addExercise, findLastTime }) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [rir, setRir] = useState("");
  const [notes, setNotes] = useState("");


  const oldOne = name ? findLastTime(name) : null;


  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "") {
      alert("exercise needs a name");
      return;
    }

    const newExercise = {
      id: Date.now(),
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
      rir: rir,
      notes: notes
    };

    addExercise(newExercise);

    setName("");
    setSets("");
    setReps("");
    setWeight("");
    setRir("");
    setNotes("");
  }


  return (
    <section className="card">
      <h3>add exercise</h3>

      <form onSubmit={handleSubmit} className="formBox">
        <input 
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="exercise name"
        />

        <div className="smallGrid">
          <input 
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            placeholder="sets"
          />

          <input 
            value={reps}
            onChange={(event) => setReps(event.target.value)}
            placeholder="reps"
          />

          <input 
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="weight"
          />

          <input 
            value={rir}
            onChange={(event) => setRir(event.target.value)}
            placeholder="RIR"
          />
        </div>

        <textarea 
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="notes, machine setup, seat height, whatever"
        />

        {oldOne && (
          <div className="oldBox">
            <p>last time:</p>
            <p>
              {oldOne.weight} lbs - {oldOne.sets} sets x {oldOne.reps} reps, RIR {oldOne.rir}
            </p>
          </div>
        )}

        <button className="mainBtn" type="submit">
          add exercise
        </button>
      </form>
    </section>
  );
}

export default ExerciseForm;