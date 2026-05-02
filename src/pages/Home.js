import { Link } from "react-router-dom";


function Home({ currentLift, gymStuff, presets }) {
  return (
    <div>
      <section className="hero">
        <h1>Track today’s lift</h1>

        <p>
          Start a workout, use a saved preset, and log the session when you’re done.
        </p>

        <div className="buttonRow">
          <Link className="mainBtn" to="/workout">
            {currentLift ? "continue workout" : "start workout"}
          </Link>

          <Link className="secondBtn" to="/history">
            view history
          </Link>
        </div>
      </section>

      {currentLift ? (
        <section className="card">
          <h3>Workout in progress</h3>
          <p>{currentLift.dayName}</p>
          <p>exercises added: {currentLift.exercises.length}</p>
        </section>
      ) : (
        <section className="card">
          <h3>No workout in progress</h3>
          <p>Start one when you’re ready to lift.</p>
        </section>
      )}

      <section className="card">
        <h3>Saved stuff</h3>
        <p>finished workouts: {gymStuff.length}</p>
        <p>saved presets: {presets.length}</p>

        {gymStuff.length > 0 ? (
          <p>latest finished workout: {gymStuff[0].dayName}</p>
        ) : (
          <p>no finished workouts yet</p>
        )}
      </section>
    </div>
  );
}

export default Home;