const {nanoid} = require('nanoid');
const notes = require('./notes')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
   
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
   
    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };
   
    notes.push(newNote);
   
    const isSuccess = notes.filter((note) => note.id === id).length > 0;
   
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = note.filter((n) => n.id === id)[0];

    if (note !== undefined)
    {
        return {
            status: 'success',
            data: {
                note,
            },
        }

    }
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    })
    response.code(404);
    return response;

}

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;

    const noteIndex = notes.findIndex((n) => n.id === id);

    const updatedAt = new Date().toISOString();

    if (noteIndex !== -1)
    {
        notes[noteIndex] = {
            ...noteIndex,
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'changed note'
        })
        response.code(200)
        return response;

    }

    const response = h.response({
        status: 'failed',
        message: 'dumbass'
    })
    response(404);
    return response;

}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const noteIndex = notes.findIndex((n) => n.id === id);

    if (noteIndex !== -1){
        notes.splice(noteIndex, 1);
        const response = h.response({
            status: 'success',
            message: 'deleted'
        })
        response(200);
        return response
    }
    const response = h.response({
        status: 'failed',
        message: 'dumbass'
    })
    response(404);
    return response;

}


module.exports = {addNoteHandler, getAllNotesHandler, 
    getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};