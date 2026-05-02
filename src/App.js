import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CurrentWorkout from "./pages/CurrentWorkout";
import History from "./pages/History";


function App() {
  const [gymStuff, setGymStuff] = useState([]);
  const [currentLift, setCurrentLift] = useState(null);
  const [presets, setPresets] = useState([]);


  useEffect(() => {
    const savedHistory = localStorage.getItem("gymStuff");
    const savedCurrent = localStorage.getItem("currentLift");
    const savedPresets = localStorage.getItem("presets");

    if (savedHistory) {
      setGymStuff(JSON.parse(savedHistory));
    }

    if (savedCurrent) {
      setCurrentLift(JSON.parse(savedCurrent));
    }

    if (savedPresets) {
      setPresets(JSON.parse(savedPresets));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("gymStuff", JSON.stringify(gymStuff));
  }, [gymStuff]);


  useEffect(() => {
    localStorage.setItem("presets", JSON.stringify(presets));
  }, [presets]);


  useEffect(() => {
    if (currentLift) {
      localStorage.setItem("currentLift", JSON.stringify(currentLift));
    } else {
      localStorage.removeItem("currentLift");
    }
  }, [currentLift]);


  function startWorkout(dayName) {

    const newOne = {
      id: Date.now(),
      dayName: dayName || "random lift day",
      date: new Date().toLocaleDateString(),
      exercises: []
    };

    setCurrentLift(newOne);
  }


  function startFromPreset(id) {
    if (currentLift) {
      alert("end your current workout first before starting from a preset");
      return false;
    }

    const pickedPreset = presets.find((pre) => pre.id === id);

    const presetExercises = pickedPreset.exercises.map((ex) => {
      return {
        id: Date.now() + Math.random(),
        name: ex.name,
        sets: "",
        reps: "",
        weight: ex.weight,
        rir: "",
        notes: ""
      };
    });

    const newLift = {
      id: Date.now(),
      dayName: pickedPreset.dayName,
      date: new Date().toLocaleDateString(),
      exercises: presetExercises
    };

    setCurrentLift(newLift);

    return true;
  }


  function addExerciseToCurrent(newExercise) {
    const updatedLift = {
      ...currentLift,
      exercises: [...currentLift.exercises, newExercise]
    };

    setCurrentLift(updatedLift);
  }


  function deleteExerciseFromCurrent(id) {
    const keptExercises = currentLift.exercises.filter((ex) => ex.id !== id);

    const updatedLift = {
      ...currentLift,
      exercises: keptExercises
    };

    setCurrentLift(updatedLift);
  }


  function changeCurrentName(newName) {
    const updatedLift = {
      ...currentLift,
      dayName: newName
    };

    setCurrentLift(updatedLift);
  }


  function updateExerciseInCurrent(id, changedExercise) {
    const updatedExercises = currentLift.exercises.map((ex) => {
      if (ex.id === id) {
        return changedExercise;
      }

      return ex;
    });

    setCurrentLift({
      ...currentLift,
      exercises: updatedExercises
    });
  }


  function endWorkout() {
    if (!currentLift) {
      return false;
    }

    if (currentLift.exercises.length === 0) {
      alert("add at least one exercise before ending it");
      return false;
    }

    setGymStuff([currentLift, ...gymStuff]);
    setCurrentLift(null);

    return true;
  }


  function deleteWorkout(id) {
    const leftOverStuff = gymStuff.filter((oneDay) => oneDay.id !== id);
    setGymStuff(leftOverStuff);
  }


  function reopenWorkout(id) {
    if (currentLift) {
      alert("end your current workout first before reopening another one");
      return false;
    }

    const pickedWorkout = gymStuff.find((oneDay) => oneDay.id === id);
    const leftOverStuff = gymStuff.filter((oneDay) => oneDay.id !== id);

    setCurrentLift(pickedWorkout);
    setGymStuff(leftOverStuff);

    return true;
  }


  function saveAsPreset(id) {
    const pickedWorkout = gymStuff.find((oneDay) => oneDay.id === id);

    const presetExercises = pickedWorkout.exercises.map((ex) => {
      return {
        id: Date.now() + Math.random(),
        name: ex.name,
        sets: "",
        reps: "",
        weight: ex.weight,
        rir: "",
        notes: ""
      };
    });

    const newPreset = {
      id: Date.now(),
      dayName: pickedWorkout.dayName,
      exercises: presetExercises
    };

    setPresets([newPreset, ...presets]);

    alert("preset saved");
  }


  function deletePreset(id) {
    const leftOverPresets = presets.filter((pre) => pre.id !== id);
    setPresets(leftOverPresets);
  }


  function findLastTime(exerciseName) {
    for (let i = 0; i < gymStuff.length; i++) {
      const found = gymStuff[i].exercises.find((ex) => {
        return ex.name.toLowerCase() === exerciseName.toLowerCase();
      });

      if (found) {
        return found;
      }
    }

    return null;
  }


  return (
    <Router>
      <div>
        <NavBar currentLift={currentLift} />

        <main className="page">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  currentLift={currentLift} 
                  gymStuff={gymStuff}
                  presets={presets}
                />
              } 
            />

            <Route 
              path="/workout" 
              element={
                <CurrentWorkout 
                  currentLift={currentLift}
                  presets={presets}
                  startWorkout={startWorkout}
                  startFromPreset={startFromPreset}
                  deletePreset={deletePreset}
                  addExerciseToCurrent={addExerciseToCurrent}
                  deleteExerciseFromCurrent={deleteExerciseFromCurrent}
                  changeCurrentName={changeCurrentName}
                  updateExerciseInCurrent={updateExerciseInCurrent}
                  endWorkout={endWorkout}
                  findLastTime={findLastTime}
                />
              } 
            />

            <Route 
              path="/history" 
              element={
                <History 
                  gymStuff={gymStuff}
                  deleteWorkout={deleteWorkout}
                  reopenWorkout={reopenWorkout}
                  saveAsPreset={saveAsPreset}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;