
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

// function getNewId(notes) { //DEPRECATED
//     //Find the last item and generate the next id 
//     let lastItem = notes[notes.length - 1];
//     console.log(lastItem); //testing purposes

//     let lastID = lastItem.id;
//     newID = parseInt(lastID) + 1;
//     console.log(newID); //testing purposes

//     return (newID.toString());
// }

function getNewId(notes) {
    //build array of ids
    var aIds = getAllIds(notes);
    //find first free id
    var newId = getFreeId(aIds);

    return newId;
}

function getAllIds(notes) { //I need to sort the IDs
    let aIds = []
    for (let i = 0; i < notes.length; i++) {
        let id = notes[i].id;
        aIds.push(id);
    }
    return aIds;
}

function getFreeId(aIds) {
    let freeId = '1';
    for (let i = 0; i < aIds.length; i++) {
        console.log(freeId); //testing purposes
        console.log(aIds[i]);
        console.log(freeId === aIds[i]); //testing purposes
        if (freeId === aIds[i]) {
            let newId = parseInt(freeId) + 1;
            freeId = newId.toString();
            console.log("old id " + aIds[i]); //test
            console.log("new id: " + freeId); //test
        } else {
            console.log("here"); //test
            break;
        }
    }
    return freeId;
}

module.exports = { getModifiedDate, getModifiedTime, getNewId };