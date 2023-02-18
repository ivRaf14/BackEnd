const { simpanBuku, tampilSemuaBuku, tampilDetailBuku, mengubahDataBuku, HapusBuku } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: simpanBuku
    },

    {
        method: 'GET',
        path: '/books',
        handler: tampilSemuaBuku
    },
    
    {
        method: 'GET',
        path: '/books/{id}',
        handler: tampilDetailBuku
    },

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: mengubahDataBuku
    },

    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: HapusBuku
    }
]

module.exports=routes;