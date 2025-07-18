import React, { createContext, useContext, useState, useEffect } from 'react';
import { students as initialStudents, announcements as initialAnnouncements, galleryItems as initialGalleryItems, events as initialEvents } from '../data/mockData';

interface DataContextType {
  students: any[];
  announcements: any[];
  galleryItems: any[];
  events: any[];
  updateStudents: (students: any[]) => void;
  updateAnnouncements: (announcements: any[]) => void;
  updateGalleryItems: (galleryItems: any[]) => void;
  updateEvents: (events: any[]) => void;
  addStudent: (student: any) => void;
  addAnnouncement: (announcement: any) => void;
  addGalleryItem: (item: any) => void;
  addEvent: (event: any) => void;
  updateStudent: (id: string, student: any) => void;
  updateAnnouncement: (id: string, announcement: any) => void;
  updateGalleryItem: (id: string, item: any) => void;
  updateEvent: (id: string, event: any) => void;
  deleteStudent: (id: string) => void;
  deleteAnnouncement: (id: string) => void;
  deleteGalleryItem: (id: string) => void;
  deleteEvent: (id: string) => void;
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
  // Load data from localStorage or use initial data
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('trpla-students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('trpla-announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [galleryItems, setGalleryItems] = useState(() => {
    const saved = localStorage.getItem('trpla-gallery');
    return saved ? JSON.parse(saved) : initialGalleryItems;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('trpla-events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('trpla-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('trpla-announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('trpla-gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('trpla-events', JSON.stringify(events));
  }, [events]);

  // Students methods
  const updateStudents = (newStudents: any[]) => {
    setStudents(newStudents);
  };

  const addStudent = (student: any) => {
    const newStudent = {
      ...student,
      id: Date.now().toString()
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (id: string, updatedStudent: any) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updatedStudent } : student
    ));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  // Announcements methods
  const updateAnnouncements = (newAnnouncements: any[]) => {
    setAnnouncements(newAnnouncements);
  };

  const addAnnouncement = (announcement: any) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id: string, updatedAnnouncement: any) => {
    setAnnouncements(prev => prev.map(announcement => 
      announcement.id === id ? { ...announcement, ...updatedAnnouncement } : announcement
    ));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  // Gallery methods
  const updateGalleryItems = (newGalleryItems: any[]) => {
    setGalleryItems(newGalleryItems);
  };

  const addGalleryItem = (item: any) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updatedItem: any) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  // Events methods
  const updateEvents = (newEvents: any[]) => {
    setEvents(newEvents);
  };

  const addEvent = (event: any) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updatedEvent: any) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return (
    <DataContext.Provider value={{
      students,
      announcements,
      galleryItems,
      events,
      updateStudents,
      updateAnnouncements,
      updateGalleryItems,
      updateEvents,
      addStudent,
      addAnnouncement,
      addGalleryItem,
      addEvent,
      updateStudent,
      updateAnnouncement,
      updateGalleryItem,
      updateEvent,
      deleteStudent,
      deleteAnnouncement,
      deleteGalleryItem,
      deleteEvent
    }}>
      {children}
    </DataContext.Provider>
  );
};