import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ExerciseForm from "../components/ExerciseForm";
import ExerciseList from "../components/ExerciseList";


function CurrentWorkout({
  currentLift,
  presets,
  startWorkout,
  startFromPreset,
  deletePreset,
  addExerciseToCurrent,
  deleteExerciseFromCurrent,
  changeCurrentName,
  updateExerciseInCurrent,
  endWorkout,
  findLastTime
}) {
  const navigate = useNavigate();

  const [startName, setStartName] = useState("");


  function handleStart(event) {
    event.preventDefault();

    startWorkout(startName);
    setStartName("");
  }


  function handlePresetStart(id) {
    const worked = startFromPreset(id);

    if (worked) {
      navigate("/workout");
    }
  }


  function handleEnd() {
    const worked = endWorkout();

    if (worked) {
      navigate("/history");
    }
  }


  if (!currentLift) {
    return (
      <div>
        <h1>Start workout</h1>

        <section className="card">
          <form onSubmit={handleStart} className="formBox">
            <label>workout name</label>

            <input 
              value={startName}
              onChange={(event) => setStartName(event.target.value)}
              placeholder="upper day, leg day, chest day..."
            />

            <button className="mainBtn" type="submit">
              start blank workout
            </button>
          </form>
        </section>

        <section className="card">
          <h3>Start from preset</h3>

          {presets.length === 0 ? (
            <p>no presets saved yet</p>
          ) : (
            <div>
              {presets.map((pre) => (
                <div className="miniCard" key={pre.id}>
                  <h4>{pre.dayName}</h4>
                  <p>{pre.exercises.length} exercises saved</p>

                  <div className="buttonRow">
                    <button className="mainBtn" onClick={() => handlePresetStart(pre.id)}>
                      use preset
                    </button>

                    <button className="badBtn" onClick={() => deletePreset(pre.id)}>
                      delete preset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }


  return (
    <div>
      <h1>Current workout</h1>

      <section className="card">
        <label>workout name</label>

        <input 
          value={currentLift.dayName}
          onChange={(event) => changeCurrentName(event.target.value)}
          placeholder="workout name"
        />
      </section>

      <ExerciseForm 
        addExercise={addExerciseToCurrent}
        findLastTime={findLastTime}
      />

      <ExerciseList 
        exercises={currentLift.exercises}
        deleteExercise={deleteExerciseFromCurrent}
        updateExercise={updateExerciseInCurrent}
      />

      <button className="mainBtn fullBtn" onClick={handleEnd}>
        end workout and send to history
      </button>
    </div>
  );
}

export default CurrentWorkout;