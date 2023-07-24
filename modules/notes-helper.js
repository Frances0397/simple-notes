
function getModifiedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate); // Example output: "2023-07-24"
    return (formattedDate);
}

function getModifiedTime() {
    const currentDate = new Date();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function getNewId(notes) {
    //Find the last item and generate the next id
    let lastItem = notes[notes.length - 1];
    console.log(lastItem); //testing purposes

    let lastID = lastItem.id;
    newID = parseInt(lastID) + 1;
    console.log(newID); //testing purposes

    return (newID.toString());
}

module.exports = { getModifiedDate, getModifiedTime, getNewId };