init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout.totalDuration===0) {
      document.querySelector("#continue-btn").classList.add("d-none")
    } else {
      location.search = "?id=" + workout._id;
    }
  }
}

