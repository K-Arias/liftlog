import { useState } from "react";


function ExerciseList({ exercises, deleteExercise, updateExercise }) {
  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editSets, setEditSets] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editRir, setEditRir] = useState("");
  const [editNotes, setEditNotes] = useState("");


  function startEdit(ex) {
    setEditingId(ex.id);

    setEditName(ex.name);
    setEditSets(ex.sets);
    setEditReps(ex.reps);
    setEditWeight(ex.weight);
    setEditRir(ex.rir);
    setEditNotes(ex.notes);
  }


  function cancelEdit() {
    setEditingId(null);

    setEditName("");
    setEditSets("");
    setEditReps("");
    setEditWeight("");
    setEditRir("");
    setEditNotes("");
  }


  function saveEdit(id) {
    const fixedExercise = {
      id: id,
      name: editName,
      sets: editSets,
      reps: editReps,
      weight: editWeight,
      rir: editRir,
      notes: editNotes
    };

    updateExercise(id, fixedExercise);
    cancelEdit();
  }


  return (
    <section className="card">
      <h3>exercises added</h3>

      {exercises.length === 0 ? (
        <p>nothing added yet</p>
      ) : (
        <div>
          {exercises.map((ex) => (
            <div className="miniCard" key={ex.id}>
              {editingId === ex.id ? (
                <div className="formBox">
                  <input 
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    placeholder="exercise name"
                  />

                  <div className="smallGrid">
                    <input 
                      value={editSets}
                      onChange={(event) => setEditSets(event.target.value)}
                      placeholder="sets"
                    />

                    <input 
                      value={editReps}
                      onChange={(event) => setEditReps(event.target.value)}
                      placeholder="reps"
                    />

                    <input 
                      value={editWeight}
                      onChange={(event) => setEditWeight(event.target.value)}
                      placeholder="weight"
                    />

                    <input 
                      value={editRir}
                      onChange={(event) => setEditRir(event.target.value)}
                      placeholder="RIR"
                    />
                  </div>

                  <textarea 
                    value={editNotes}
                    onChange={(event) => setEditNotes(event.target.value)}
                    placeholder="notes"
                  />

                  <div className="buttonRow">
                    <button className="mainBtn" onClick={() => saveEdit(ex.id)}>
                      save edit
                    </button>

                    <button className="secondBtn" onClick={cancelEdit}>
                      cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>{ex.name}</h4>

                  <p>
                    {ex.weight ? ex.weight + " lbs" : "no weight yet"} - {ex.sets} sets x {ex.reps} reps
                  </p>

                  <p>RIR: {ex.rir}</p>

                  {ex.notes && <p>notes: {ex.notes}</p>}

                  <div className="buttonRow">
                    <button className="secondBtn" onClick={() => startEdit(ex)}>
                      edit
                    </button>

                    <button className="badBtn" onClick={() => deleteExercise(ex.id)}>
                      delete exercise
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExerciseList;