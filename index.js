const yargs = require('yargs')
// getting file package.json
const pkg = require('./package.json')

// getting functions addNote, getNotes
const {addNote, printNotes, delNote} = require('./notes.controller')

// specialize version
yargs.version(pkg.version)

// commands registration
yargs.command({
    command: 'add',
    describe: 'add new note to list',
    // create object builder with fields which we want to get for this command
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            // required param
            demandOption: true
        }
    },
    // to get title
    handler({title}) {
        console.log('Add command: ', title)
        addNote(title)
    }})

yargs.command({
    command: 'list',
    describe: 'print all notes',
    async handler() {
        console.log('List command')
        const notes = await printNotes()
    }})
// add command delete by id
yargs.command({
    command: 'remove',
    describe: 'remove note by id',
    builder: {
        id: {
            type: 'string',
            describe: 'id note',
            demandOption: true
        }
    },
    async handler({id}) {
        console.log('Remove note by id')
        await delNote(id)
    }}
)



// initialize commands
yargs.parse()

