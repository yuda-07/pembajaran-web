import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  infoService, 
  galleryService, 
  directoryService, 
  agendaService, 
  aboutService 
} from '../services/api';

interface DataContextType {
  // Data
  info: any[];
  gallery: any[];
  directory: any[];
  agenda: any[];
  about: any[];
  
  // Loading states
  loading: {
    info: boolean;
    gallery: boolean;
    directory: boolean;
    agenda: boolean;
    about: boolean;
  };
  
  // Error states
  errors: {
    info: string | null;
    gallery: string | null;
    directory: string | null;
    agenda: string | null;
    about: string | null;
  };
  
  // CRUD methods
  // Info
  fetchInfo: () => Promise<void>;
  createInfo: (data: any) => Promise<void>;
  updateInfo: (id: string, data: any) => Promise<void>;
  deleteInfo: (id: string) => Promise<void>;
  
  // Gallery
  fetchGallery: () => Promise<void>;
  createGallery: (data: any) => Promise<void>;
  updateGallery: (id: string, data: any) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  
  // Directory
  fetchDirectory: () => Promise<void>;
  createDirectory: (data: any) => Promise<void>;
  updateDirectory: (id: string, data: any) => Promise<void>;
  deleteDirectory: (id: string) => Promise<void>;
  
  // Agenda
  fetchAgenda: () => Promise<void>;
  createAgenda: (data: any) => Promise<void>;
  updateAgenda: (id: string, data: any) => Promise<void>;
  deleteAgenda: (id: string) => Promise<void>;
  
  // About
  fetchAbout: () => Promise<void>;
  createAbout: (data: any) => Promise<void>;
  updateAbout: (id: string, data: any) => Promise<void>;
  deleteAbout: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Data states
  const [info, setInfo] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [directory, setDirectory] = useState<any[]>([]);
  const [agenda, setAgenda] = useState<any[]>([]);
  const [about, setAbout] = useState<any[]>([]);

  // Loading states
  const [loading, setLoading] = useState({
    info: false,
    gallery: false,
    directory: false,
    agenda: false,
    about: false,
  });

  // Error states
  const [errors, setErrors] = useState({
    info: null,
    gallery: null,
    directory: null,
    agenda: null,
    about: null,
  });

  // Helper function untuk update loading state
  const setLoadingState = (key: keyof typeof loading, value: boolean) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  };

  // Helper function untuk update error state
  const setErrorState = (key: keyof typeof errors, value: string | null) => {
    setErrors(prev => ({ ...prev, [key]: value }));
  };

  // Info methods
  const fetchInfo = async () => {
    setLoadingState('info', true);
    setErrorState('info', null);
    try {
      const data = await infoService.getAll();
      setInfo(data);
    } catch (error) {
      setErrorState('info', 'Gagal mengambil data info');
      console.error('Error fetching info:', error);
    } finally {
      setLoadingState('info', false);
    }
  };

  const createInfo = async (data: any) => {
    setLoadingState('info', true);
    setErrorState('info', null);
    try {
      await infoService.create(data);
      await fetchInfo(); // Refresh data
    } catch (error) {
      setErrorState('info', 'Gagal membuat info baru');
      console.error('Error creating info:', error);
      throw error;
    } finally {
      setLoadingState('info', false);
    }
  };

  const updateInfo = async (id: string, data: any) => {
    setLoadingState('info', true);
    setErrorState('info', null);
    try {
      await infoService.update(id, data);
      await fetchInfo(); // Refresh data
    } catch (error) {
      setErrorState('info', 'Gagal mengupdate info');
      console.error('Error updating info:', error);
      throw error;
    } finally {
      setLoadingState('info', false);
    }
  };

  const deleteInfo = async (id: string) => {
    setLoadingState('info', true);
    setErrorState('info', null);
    try {
      await infoService.delete(id);
      await fetchInfo(); // Refresh data
    } catch (error) {
      setErrorState('info', 'Gagal menghapus info');
      console.error('Error deleting info:', error);
      throw error;
    } finally {
      setLoadingState('info', false);
    }
  };

  // Gallery methods
  const fetchGallery = async () => {
    setLoadingState('gallery', true);
    setErrorState('gallery', null);
    try {
      const data = await galleryService.getAll();
      setGallery(data);
    } catch (error) {
      setErrorState('gallery', 'Gagal mengambil data galeri');
      console.error('Error fetching gallery:', error);
    } finally {
      setLoadingState('gallery', false);
    }
  };

  const createGallery = async (data: any) => {
    setLoadingState('gallery', true);
    setErrorState('gallery', null);
    try {
      await galleryService.create(data);
      await fetchGallery(); // Refresh data
    } catch (error) {
      setErrorState('gallery', 'Gagal membuat galeri baru');
      console.error('Error creating gallery:', error);
      throw error;
    } finally {
      setLoadingState('gallery', false);
    }
  };

  const updateGallery = async (id: string, data: any) => {
    setLoadingState('gallery', true);
    setErrorState('gallery', null);
    try {
      await galleryService.update(id, data);
      await fetchGallery(); // Refresh data
    } catch (error) {
      setErrorState('gallery', 'Gagal mengupdate galeri');
      console.error('Error updating gallery:', error);
      throw error;
    } finally {
      setLoadingState('gallery', false);
    }
  };

  const deleteGallery = async (id: string) => {
    setLoadingState('gallery', true);
    setErrorState('gallery', null);
    try {
      await galleryService.delete(id);
      await fetchGallery(); // Refresh data
    } catch (error) {
      setErrorState('gallery', 'Gagal menghapus galeri');
      console.error('Error deleting gallery:', error);
      throw error;
    } finally {
      setLoadingState('gallery', false);
    }
  };

  // Directory methods
  const fetchDirectory = async () => {
    setLoadingState('directory', true);
    setErrorState('directory', null);
    try {
      const data = await directoryService.getAll();
      setDirectory(data);
    } catch (error) {
      setErrorState('directory', 'Gagal mengambil data direktori');
      console.error('Error fetching directory:', error);
    } finally {
      setLoadingState('directory', false);
    }
  };

  const createDirectory = async (data: any) => {
    setLoadingState('directory', true);
    setErrorState('directory', null);
    try {
      await directoryService.create(data);
      await fetchDirectory(); // Refresh data
    } catch (error) {
      setErrorState('directory', 'Gagal membuat direktori baru');
      console.error('Error creating directory:', error);
      throw error;
    } finally {
      setLoadingState('directory', false);
    }
  };

  const updateDirectory = async (id: string, data: any) => {
    setLoadingState('directory', true);
    setErrorState('directory', null);
    try {
      await directoryService.update(id, data);
      await fetchDirectory(); // Refresh data
    } catch (error) {
      setErrorState('directory', 'Gagal mengupdate direktori');
      console.error('Error updating directory:', error);
      throw error;
    } finally {
      setLoadingState('directory', false);
    }
  };

  const deleteDirectory = async (id: string) => {
    setLoadingState('directory', true);
    setErrorState('directory', null);
    try {
      await directoryService.delete(id);
      await fetchDirectory(); // Refresh data
    } catch (error) {
      setErrorState('directory', 'Gagal menghapus direktori');
      console.error('Error deleting directory:', error);
      throw error;
    } finally {
      setLoadingState('directory', false);
    }
  };

  // Agenda methods
  const fetchAgenda = async () => {
    setLoadingState('agenda', true);
    setErrorState('agenda', null);
    try {
      const data = await agendaService.getAll();
      setAgenda(data);
    } catch (error) {
      setErrorState('agenda', 'Gagal mengambil data agenda');
      console.error('Error fetching agenda:', error);
    } finally {
      setLoadingState('agenda', false);
    }
  };

  const createAgenda = async (data: any) => {
    setLoadingState('agenda', true);
    setErrorState('agenda', null);
    try {
      await agendaService.create(data);
      await fetchAgenda(); // Refresh data
    } catch (error) {
      setErrorState('agenda', 'Gagal membuat agenda baru');
      console.error('Error creating agenda:', error);
      throw error;
    } finally {
      setLoadingState('agenda', false);
    }
  };

  const updateAgenda = async (id: string, data: any) => {
    setLoadingState('agenda', true);
    setErrorState('agenda', null);
    try {
      await agendaService.update(id, data);
      await fetchAgenda(); // Refresh data
    } catch (error) {
      setErrorState('agenda', 'Gagal mengupdate agenda');
      console.error('Error updating agenda:', error);
      throw error;
    } finally {
      setLoadingState('agenda', false);
    }
  };

  const deleteAgenda = async (id: string) => {
    setLoadingState('agenda', true);
    setErrorState('agenda', null);
    try {
      await agendaService.delete(id);
      await fetchAgenda(); // Refresh data
    } catch (error) {
      setErrorState('agenda', 'Gagal menghapus agenda');
      console.error('Error deleting agenda:', error);
      throw error;
    } finally {
      setLoadingState('agenda', false);
    }
  };

  // About methods
  const fetchAbout = async () => {
    setLoadingState('about', true);
    setErrorState('about', null);
    try {
      const data = await aboutService.getAll();
      setAbout(data);
    } catch (error) {
      setErrorState('about', 'Gagal mengambil data tentang');
      console.error('Error fetching about:', error);
    } finally {
      setLoadingState('about', false);
    }
  };

  const createAbout = async (data: any) => {
    setLoadingState('about', true);
    setErrorState('about', null);
    try {
      await aboutService.create(data);
      await fetchAbout(); // Refresh data
    } catch (error) {
      setErrorState('about', 'Gagal membuat data tentang baru');
      console.error('Error creating about:', error);
      throw error;
    } finally {
      setLoadingState('about', false);
    }
  };

  const updateAbout = async (id: string, data: any) => {
    setLoadingState('about', true);
    setErrorState('about', null);
    try {
      await aboutService.update(id, data);
      await fetchAbout(); // Refresh data
    } catch (error) {
      setErrorState('about', 'Gagal mengupdate data tentang');
      console.error('Error updating about:', error);
      throw error;
    } finally {
      setLoadingState('about', false);
    }
  };

  const deleteAbout = async (id: string) => {
    setLoadingState('about', true);
    setErrorState('about', null);
    try {
      await aboutService.delete(id);
      await fetchAbout(); // Refresh data
    } catch (error) {
      setErrorState('about', 'Gagal menghapus data tentang');
      console.error('Error deleting about:', error);
      throw error;
    } finally {
      setLoadingState('about', false);
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    fetchInfo();
    fetchGallery();
    fetchDirectory();
    fetchAgenda();
    fetchAbout();
  }, []);

  return (
    <DataContext.Provider value={{
      // Data
      info,
      gallery,
      directory,
      agenda,
      about,
      
      // Loading states
      loading,
      
      // Error states
      errors,
      
      // Info methods
      fetchInfo,
      createInfo,
      updateInfo,
      deleteInfo,
      
      // Gallery methods
      fetchGallery,
      createGallery,
      updateGallery,
      deleteGallery,
      
      // Directory methods
      fetchDirectory,
      createDirectory,
      updateDirectory,
      deleteDirectory,
      
      // Agenda methods
      fetchAgenda,
      createAgenda,
      updateAgenda,
      deleteAgenda,
      
      // About methods
      fetchAbout,
      createAbout,
      updateAbout,
      deleteAbout,
    }}>
      {children}
    </DataContext.Provider>
  );
};