// src/pages/admin/index.tsx
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import withAuth from '../../components/withAuth';
import Link from 'next/link';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

function AdminPanel() {
  const [productos, setProductos]: any = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        setProductos(response.data.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/admin/nuevo">
        Nuevo Producto
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto: any) => (
            <TableRow key={producto.id}>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>${producto.precio}</TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  component={Link}
                  href={`/admin/editar/${producto.id}`}
                  style={{ marginRight: 8 }}
                >
                  Editar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleEliminar(producto.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

const handleEliminar = async (id: number) => {
  try {
    await api.delete(`/productos/${id}`);
    // Actualiza la lista de productos después de eliminar
    setProductos((prevProductos: any): any => prevProductos.filter((producto: any) => producto.id !== id));
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

export default withAuth(AdminPanel);
