class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    return this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(param1, param2) {
    return this.libros.push({
      nombre: param1,
      autor: param2,
    });
  }

  getBookNames() {
     return this.libros.map(({ nombre }) => {return nombre});
  }
}

const usuario = new Usuario("Juan", "Perez");

console.log(`El usuario es ${usuario.getFullName()}`);

usuario.addMascota("Toto");
usuario.addMascota("Luck");

console.log(usuario.mascotas);

console.log(usuario.countMascotas());

usuario.addBook("Dolarizar", "Alfredo Romano ");
usuario.addBook("Dolarizar1", "Alfredo Romano1 ");

console.log(usuario.libros);

console.log(usuario.getBookNames())
