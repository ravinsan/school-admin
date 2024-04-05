import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Teacher from '../teacher/Teacher';
import EditTeacher from '../teacher/EditTeacher';
import AddTeacher from '../teacher/AddTeacher';
import Student from '../student/Student';
import AddStudent from '../student/AddStudent';
import EditStudent from '../student/EditStudent';
import ClassChange from '../student/ClassChange';
import Section from '../section/Section';
import Author from '../author/Author';
import Book from '../book/Book';
import AddBook from '../book/AddBook';
import EditBook from '../book/EditBook';

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/teachers-create" element={<AddTeacher/>} />
      <Route path="/teachers" element={<Teacher/>} />
      <Route path="/teachers/:id" element={<EditTeacher/>} />
      <Route path="/students" element={<Student/>} />
      <Route path="/students-create" element={<AddStudent/>} />
      <Route path="/students/:id" element={<EditStudent/>} />
      <Route path="/students-class-change/:id" element={<ClassChange/>} />
      <Route path="/sections" element={<Section/>} />
      <Route path="/authors" element={<Author/>} />
      <Route path="/books" element={<Book/>} />
      <Route path="/book-create" element={<AddBook/>} />
      <Route path="/edit-book/:id" element={<EditBook/>} />
    </Routes>
  )
}

export default MyRoute;
