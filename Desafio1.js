class Usuario {
 
    constructor (nombre, apellido) {
        this.nombre = nombre ;
        this.apellido = apellido;
        this.libros = [{
        }]
     
        this.mascotas = []
    }
     
    getFullName() {
        return (`${this.nombre} ${this.apellido}`)
        }
       
    addMascota(mascota){
     return this.mascotas.push(mascota)
    }
     
    countMascotas() {
        return this.mascotas.length
    }
     
    addBook(param1, param2 ) {
       return this.libros.push( {
        nombre: param1, autor : param2
       }
       )
    }
    getBookNames(){
    // hacer un map
    }
    }
     
     
    const usuario = new Usuario ("Juan", "Perez")
     
     
    console.log(usuario.getFullName())