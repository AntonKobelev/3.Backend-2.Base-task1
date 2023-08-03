
// create var fs (file system) version with promises and get access to module fs for work to file system computer
const fs = require('fs/promises')

// use module path
const path = require('path')

// create var notesPath
const notesPath = path.join(__dirname, 'db.json')

// use module chalk for decoration console
const chalk = require('chalk')

async function addNote(title) {
    // get data from db.json
    const notes = await getNotes()

    // create new note
    const note = {
        title: title,
        id: Date.now().toString()
    }

    notes.push(note)
    // wait and recording data to file db.json
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Add note!'))
}

async function getNotes(){
    // read notes from db.json
    const notes = await fs.readFile(notesPath, 'utf-8')
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes): []
}

// printing all notes
async function printNotes() {
    const notes = await getNotes()
    console.log('Print all notes:')
    notes.forEach((note) => {
        console.log(chalk.blue(note.id, note.title))
    })
}

// deleting note by id
async function delNote(id) {
    // get all notes
    const notes = await getNotes()
    const filteredNotes = notes.filter((note) => note.id !== id)
    console.log('filteredNotes', filteredNotes)
    console.log(chalk.green(`Delete note with id: ${id}`))
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes))
}

// export functions
module.exports = {
    addNote, printNotes, delNote
}