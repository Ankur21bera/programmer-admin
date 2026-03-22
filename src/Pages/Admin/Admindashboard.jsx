import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveOfflinePayment, getAdminDashboard, getOfflineRequests } from '../../Redux/courseSlice';
import { Badge, Button, Card, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { BadgeCheck, BookOpen, CheckCircle, ClipboardList, CreditCard, Users, Wallet } from 'lucide-react';

const Admindashboard = () => {
  const dispatch = useDispatch();
  const {dashboard,offlineRequests} = useSelector((state)=>state.course);
  useEffect(()=>{
    dispatch(getAdminDashboard());
    dispatch(getOfflineRequests());
  },[dispatch])

  const handleApprove = (id) => {
    dispatch(approveOfflinePayment(id))
  }

  return (
    <div className='p-6'>
     <h2 className='text-2xl font-semibold mb-6'>Admin Dashboard</h2>
     <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Total Users</p>
          <h3 className='text-2xl font-bold'>{dashboard?.totalUsers}</h3>
         </div>
         <Users size={36} className='text-blue-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Total Course</p>
          <h3 className='text-2xl font-bold'>{dashboard?.totalCourses}</h3>
         </div>
         <BookOpen size={36} className='text-blue-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Total Enrollments</p>
          <h3 className='text-2xl font-bold'>{dashboard?.totalBookings}</h3>
         </div>
         <ClipboardList size={36} className='text-indigo-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Completed Course</p>
          <h3 className='text-2xl font-bold'>{dashboard?.completedCourse}</h3>
         </div>
         <CheckCircle size={36} className='text-red-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Offline Request</p>
          <h3 className='text-2xl font-bold'>{dashboard?.offlinePaymentRequests}</h3>
         </div>
         <Wallet size={36} className='text-yellow-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Offline Approved</p>
          <h3 className='text-2xl font-bold'>{dashboard?.offlinePaymentApproved}</h3>
         </div>
         <BadgeCheck size={36} className='text-green-600'/>
        </div>
      </Card>
      <Card>
        <div className='flex items-center justify-between'>
         <div>
          <p className='text-gray-500 text-sm'>Online Payments</p>
          <h3 className='text-2xl font-bold'>{dashboard?.onlinePayments}</h3>
         </div>
         <CreditCard size={36} className='text-pink-600'/>
        </div>
      </Card>
     </div>
    <h2 className='text-xl font-semibold mt-10 mb-4'>Offline Payment Requests</h2>
    <div className='hidden md:block overflow-x-auto'>
     <Table>
      <TableHead>
        <TableHeadCell>S.No</TableHeadCell>
        <TableHeadCell>User</TableHeadCell>
        <TableHeadCell>Course</TableHeadCell>
        <TableHeadCell>Duration</TableHeadCell>
        <TableHeadCell>Payment Mode</TableHeadCell>
        <TableHeadCell>Offline Status</TableHeadCell>
        <TableHeadCell>Payment Status</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>      
      </TableHead>
      <TableBody>
        {offlineRequests?.map((item,index)=>(
          <TableRow key={item._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.userData.name}</TableCell>
            <TableCell>{item.courseId.title}</TableCell>
            <TableCell>{item.courseData.duration}</TableCell>
            <TableCell className='capitalize'>{item.paymentMode}</TableCell>
            <TableCell>
              {item.offlinePending?(
               <Badge color='warning'>
                 Pending
               </Badge> 
              ):(
                <Badge color='success'>
                  Completed
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {item.payment ? (
             <Badge color="success">
               Payment Completed
             </Badge>
             ):(
             <Badge color="failure">
               Payment Pending
             </Badge>
             )}
            </TableCell>
            <TableCell>
              {item.payment?(
               <Badge color='success'>Approved</Badge>
              ):(
                <button className='px-2 py-2 bg-green-600 text-white cursor-pointer' onClick={()=>handleApprove(item._id)} size='xs' color="success">Approve</button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
     </Table>
    </div>
    </div>
  )
}

export default Admindashboard