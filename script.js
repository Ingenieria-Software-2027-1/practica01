const libros = [
    {
        titulo: "Me alegro de que mi madre haya muerto",
        autor: "Jennette McCurdy",
        categoria: "Historias reales fuertes",
        imagen: "imagenes/Libro1.jpg"
    },
    {
        titulo: "Con mi hija No",
        autor: "Lydia Cacho",
        categoria: "Para entender el mundo",
        imagen: "imagenes/Libro2.png"
    },
    {
        titulo: "Una breve historia de casi todo",
        autor: "Bill Bryson",
        categoria: "Para aprender",
        imagen: "imagenes/Libro3.jpeg"
    },
    {
        titulo: "Seis mil",
        autor: "Laura C. Vela",
        categoria: "Para sentir",
        imagen: "imagenes/Libro4.jpeg"
    }
];

const contenedor = document.getElementById("libros-container");

function mostrarLibros(categoria) {

    const librosFiltrados = libros.filter(function(libro) {
        return libro.categoria === categoria;
    });

    contenedor.innerHTML = "";

    librosFiltrados.forEach(function(libro) {

        const tarjeta = document.createElement("article");

        tarjeta.innerHTML = `
            <img src="${libro.imagen}" alt="Portada de ${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p>${libro.autor}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}