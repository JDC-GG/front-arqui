// src/services/api.js - Versión Mock

// Datos mock en memoria
let mockLibros = [
  { id: 1, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", isbn: "978-0307474728", genero: "Realismo mágico", año: 1967, disponible: true },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", isbn: "978-8420412146", genero: "Novela", año: 1605, disponible: true },
  { id: 3, titulo: "1984", autor: "George Orwell", isbn: "978-0451524935", genero: "Distopía", año: 1949, disponible: false },
  { id: 4, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", isbn: "978-0156012195", genero: "Fábula", año: 1943, disponible: true },
  { id: 5, titulo: "Rayuela", autor: "Julio Cortázar", isbn: "978-8420471891", genero: "Novela experimental", año: 1963, disponible: true },
  { id: 6, titulo: "Crónica de una Muerte Anunciada", autor: "Gabriel García Márquez", isbn: "978-0307387981", genero: "Novela", año: 1981, disponible: false },
  { id: 7, titulo: "La Casa de los Espíritus", autor: "Isabel Allende", isbn: "978-1501117015", genero: "Realismo mágico", año: 1982, disponible: true },
  { id: 8, titulo: "El Amor en los Tiempos del Cólera", autor: "Gabriel García Márquez", isbn: "978-0307387738", genero: "Romance", año: 1985, disponible: true },
];

let mockPrestamos = [
  { id: 1, usuario: 1, libro: 3, fecha_limite: "2025-10-15", devuelto: false, fecha_devolucion: null },
  { id: 2, usuario: 1, libro: 6, fecha_limite: "2025-10-20", devuelto: false, fecha_devolucion: null },
];

let nextPrestamoId = 3;

// Simular delay de red
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Mock
const api = {
  async get(url) {
    await delay();
    
    if (url === "/libros/") {
      return { data: mockLibros };
    }
    
    if (url.match(/\/libros\/\d+\//)) {
      const id = parseInt(url.match(/\/libros\/(\d+)\//)[1]);
      const libro = mockLibros.find(l => l.id === id);
      return { data: libro };
    }
    
    if (url === "/prestamos/") {
      // Agregar información del libro a cada préstamo
      const prestamosConLibros = mockPrestamos.map(p => ({
        ...p,
        libro: mockLibros.find(l => l.id === p.libro)
      }));
      return { data: prestamosConLibros };
    }
    
    if (url.match(/\/usuarios\/\d+\//)) {
      const id = parseInt(url.match(/\/usuarios\/(\d+)\//)[1]);
      // Retornar usuario mock (esto lo maneja auth.js)
      return { data: { id, nombre: "Usuario Mock" } };
    }
    
    throw new Error(`Endpoint no encontrado: ${url}`);
  },
  
  async post(url, data) {
    await delay();
    
    if (url === "/usuarios/") {
      return { data };
    }
    
    if (url === "/prestamos/") {
      const nuevoPrestamo = {
        id: nextPrestamoId++,
        ...data,
        devuelto: false,
        fecha_devolucion: null
      };
      
      mockPrestamos.push(nuevoPrestamo);
      
      // Marcar libro como no disponible
      const libro = mockLibros.find(l => l.id === data.libro);
      if (libro) libro.disponible = false;
      
      return { data: nuevoPrestamo };
    }
    
    if (url.match(/\/prestamos\/\d+\/return\//)) {
      const id = parseInt(url.match(/\/prestamos\/(\d+)\/return\//)[1]);
      const prestamo = mockPrestamos.find(p => p.id === id);
      
      if (prestamo) {
        prestamo.devuelto = true;
        prestamo.fecha_devolucion = new Date().toISOString().split('T')[0];
        
        // Marcar libro como disponible
        const libro = mockLibros.find(l => l.id === prestamo.libro);
        if (libro) libro.disponible = true;
      }
      
      return { data: prestamo };
    }
    
    throw new Error(`Endpoint no encontrado: ${url}`);
  }
};

export default api;