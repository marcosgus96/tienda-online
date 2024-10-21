// src/pages/admin/index.tsx
import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from '@mui/material';
import withAuth from '../../components/withAuth';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

function AdminPanel() {
  const [productos, setProductos] = useState<Producto[]>([]);

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

  const handleEliminar = async (id: number) => {
    try {
      await api.delete(`/productos/${id}`);
      // Actualiza la lista de productos después de eliminar
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <Container sx={{ paddingTop: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          component={Link}
          href="/admin/nuevo"
        >
          Nuevo Producto
        </Button>
      </Box>
      
      <Table sx={{ minWidth: 650, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Precio</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.id} hover sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>${producto.precio}</TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  href={`/admin/editar/${producto.id}`}
                  sx={{ color: 'primary.main', marginRight: '10px' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleEliminar(producto.id)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default withAuth(AdminPanel);

