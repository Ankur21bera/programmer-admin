import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentorStudents } from '../../Redux/mentorSlice';
import { GraduationCap, Mail, Phone, Search, User, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react';

const Mentorallenrollment = () => {
  const dispatch = useDispatch();
  const {students,loading} = useSelector((state)=>state.mentor);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    dispatch(fetchMentorStudents());
  },[])

  const filteredStudents = students?.filter((s)=>s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='p-4 md:p-8 bg-gray-50 min-h-screen'>
     <div className='flex items-center gap-3 mb-6'>
      <Users className='text-blue-600'/>
      <h1 className='text-2xl md:text-3xl font-bold'>Your Enrolled Students</h1>
     </div>
     <div className='mb-6 md:w-1/3'>
      <TextInput icon={Search} placeholder='Search Students...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
     </div>
     <div className='hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden'>
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Profile</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Phone</TableHeadCell>
          <TableHeadCell>Qualification</TableHeadCell>
          <TableHeadCell>Gender</TableHeadCell>
          <TableHeadCell>Age</TableHeadCell>
        </TableHead>
        <TableBody className='divide-y'>
          {filteredStudents?.map((student)=>(
            <TableRow className='bg-white' key={student._id}>
             <TableCell>
              <img className='w-10 h-10 rounded-full object-cover border' src={student.image} alt="" />
             </TableCell>
             <TableCell className='font-medium'>
              {student.name}
             </TableCell>
             <TableCell>
              <div className='flex items-center gap-2'>
               <Mail size={14}/>
               {student.email}
              </div>
             </TableCell>
              <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {student._id.phone || "-"}
                  </div>
                </TableCell>
               <TableCell>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} />
                    {student._id.qualification || "-"}
                  </div>
                </TableCell>  
                 <TableCell>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    {student._id.gender || "-"}
                  </div>
                </TableCell>
                 <TableCell>
                    {student._id.age || "-"}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </div>
    </div>
  )
}

export default Mentorallenrollment