const { nanoid } = require("nanoid");
const books = require("./books");

const simpanBuku = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if(pageCount === readPage ) finished = true;

    const newBook = {
        id, name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt
    }
    
    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400);
        return response;
    }

    else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    }
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(isSuccess){
        
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201);
        return response
    }

    else{
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',

        })
        response.code(500);
        return response;
    }



}

const tampilSemuaBuku = (request,h) => {
    //const {id} = request.params;
    const ada = Object.keys(books).length;
    const{name,reading,finished} = request.query;
    let temp = books;

    if(name !== undefined){
        temp = books.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()));
    }

    if(reading !== undefined){
        temp = books.filter(n => n.reading === (reading === '1'));
    }

    if(finished !== undefined){
        temp = books.filter(n => n.finished === (finished === '1'));
    }

        const response = h.response({
            status: 'success',
            data: {
                books: temp.map((book) => ({
                    id : book.id,
                    name : book.name,
                    publisher : book.publisher
                }))
            }
        })
        response.code(200);
        return response;
}

const tampilDetailBuku = (request, h) => {
    const {id} = request.params;
    
    const book = books.filter((n) => n.id === id)[0];

    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book,
            }
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    })
    response.code(404);
    return response;
}

const mengubahDataBuku = (request, h) => {
    const {id} = request.params;
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;
    

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400);
        return response;
    }
    else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    }

    else if(index === -1){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
        response.code(404);
        return response;
    }

    books[index] = {
        ...books[index], name,year,author,summary,publisher,pageCount,readPage,reading,updatedAt
    };

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    })
    response.code(200);
    return response;

}

const HapusBuku = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);

    if(index === -1){
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })
        response.code(404);
        return response;
    }

    books.splice(index,1);
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    })
    response.code(200);
    return response;
}

module.exports = {simpanBuku,tampilSemuaBuku,tampilDetailBuku,mengubahDataBuku,HapusBuku};