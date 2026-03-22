import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMentorProfile, setProfile, updateMentorProfile } from '../../Redux/mentorSlice';
import { Briefcase, Camera, FolderMinus, GraduationCap, Info, Mail, Pencil, User, X } from 'lucide-react';
import { Button, Modal, ModalBody } from 'flowbite-react';

const MentorProfile = () => {
  const dispatch = useDispatch();
  const {mentorProfile} = useSelector((state)=>state.mentor);
  const [openModal,setOpenModal] = useState(false);
  const [formData,setFormData] = useState({});
  const [image,setImage] = useState(null);
  const [preview,setPreview] = useState(null);

  useEffect(()=>{
    dispatch(fetchMentorProfile());
  },[])

  useEffect(()=>{
    if(mentorProfile){
      setFormData(mentorProfile);
      setPreview(mentorProfile.image);
    }
  },[mentorProfile])

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if(formData[key]) data.append(key,formData[key])
    })
  if(image) data.append("image",image);
  dispatch(setProfile({...formData,image:preview}));
  dispatch(updateMentorProfile(data));
  setOpenModal(false);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6'>
     <div className='backdrop-blur-xl bg-white/10 border bg-blue-600 border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white transition-all duration-300 hover:scale-[1.03]'>
      <div className='relative flex justify-center'>
       <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' src={mentorProfile?.image} alt="" />
      </div>
      <div className='text-center mt-4'>
       <h2 className='text-2xl font-bold flex justify-center items-center gap-2'>
        <User size={20}/> {mentorProfile?.name}
       </h2>
       <p className='text-gray-200 text-sm flex justify-center items-center gap-2 mt-1'>
        <Mail size={16}/> {mentorProfile?.email}
       </p>
      </div>
      <div className='mt-6 space-y-3 text-sm'>
       <div className='bg-white/10 p-3 rounded-xl flex items-center gap-2'>
        <GraduationCap size={18}/>
        <span><b>Degree:</b> {mentorProfile?.degree}</span>
       </div>
       <div className='bg-white/10 p-3 rounded-xl flex items-center gap-2'>
        <Briefcase size={18}/>
        <span><b>Experience:</b> {mentorProfile?.experience}</span>
       </div>
       <div className='bg-white/10 p-3 rounded-xl flex items-center gap-2'>
        <Info size={18}/>
        <span><b>About:</b> {mentorProfile?.about}</span>
       </div>
      </div>
      <Button onClick={()=>setOpenModal(true)} className='mt-6 w-full flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold hover:bg-gray-200 cursor-pointer'>
         <Pencil size={18}/> Edit Profile
      </Button>
     </div>
     <Modal show={openModal} onClose={()=>setOpenModal(false)} size='md'>
      <ModalBody>
        <div className='relative p-4'>
        <X className='absolute top-0 right-1 cursor-pointer hover:text-red-500' onClick={()=>setOpenModal(false)}/>
          <h2 className='text-xl font-bold mb-4 text-center flex justify-center items-center gap-2'>
            <Pencil size={18}/> Update Profile
          </h2>
          <div className='flex flex-col items-center mb-4 relative'>
           <img className='w-24 h-24 rounded-full object-cover border-2 shadow' src={preview} alt="" />
           <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:scale-110 transition">
             <Camera size={16} color='white'/>
             <input type="file" hidden onChange={handleImage} />
           </label>
          </div>
          <div className='space-y-3'>
           <div className='flex items-center border rounded-lg p-2 gap-2'>
            <User size={16}/>
            <input type="text" name='name' value={formData.name || ""} onChange={handleChange} placeholder='Name' className='w-full outline-none' />
           </div>
            <div className='flex items-center border rounded-lg p-2 gap-2'>
            <GraduationCap size={16}/>
            <input type="text" name='degree' value={formData.degree || ""} onChange={handleChange} placeholder='Degree' className='w-full outline-none' />
           </div>
            <div className='flex items-center border rounded-lg p-2 gap-2'>
            <Briefcase size={16}/>
            <input type="text" name='experience' value={formData.experience || ""} onChange={handleChange} placeholder='Experience' className='w-full outline-none' />
           </div>
            <div className='flex items-start border rounded-lg p-2 gap-2'>
            <Info className='mt-1' size={16}/>
            <textarea  name='about' value={formData.about || ""} onChange={handleChange} placeholder='About' className='w-full outline-none' />
           </div>
           <div className='flex gap-3 mt-4'>
            <Button onClick={handleSubmit} className='w-full flex items-center cursor-pointer justify-center gap-2'>
              Update
            </Button>
            <Button color="gray"className='w-full cursor-pointer' onClick={()=>setOpenModal(false)}>
              Close
            </Button>
           </div>
          </div>
        </div>
      </ModalBody>
     </Modal>
    </div>
  )
}

export default MentorProfile