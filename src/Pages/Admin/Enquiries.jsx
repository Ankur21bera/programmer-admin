import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Trash2,FileText} from 'lucide-react'
import { deleteEnquiry, deleteJobApplication, getAllEnquiries, getJobApplication } from '../../Redux/courseSlice';

const Enquiries = () => {
    const dispatch = useDispatch();
    const {enquiries,applications} = useSelector((state)=>state.course)

    useEffect(()=>{
      dispatch(getAllEnquiries());
      dispatch(getJobApplication());
    },[dispatch])

    const handleDeleteEnquiry = (id) => {
      if(window.confirm("Are You Sure You Want To Delete")){
        dispatch(deleteEnquiry(id))
      }
    }

    const handleDeleteApplication = (id) => {
      if(window.confirm("Are You Sure You Want To Delete")){
        dispatch(deleteJobApplication(id))
      }
    }

  return (
   <div className="p-6">

    

      <h2 className="text-2xl font-bold mb-6">
        Course Enquiries
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {enquiries.map((item) => (

          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >

            <h3 className="font-semibold text-lg mb-2">
              {item.name}
            </h3>

            <p className="text-sm text-gray-600">
              {item.email}
            </p>

            <p className="text-sm text-gray-600">
              {item.phone}
            </p>

            <p className="mt-3 text-gray-700">
              {item.message}
            </p>

            <button
              onClick={() => handleDeleteEnquiry(item._id)}
              className="mt-4 text-red-600 flex items-center gap-2"
            >

              <Trash2 size={18} />
              Delete
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">
        Job Applications
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {item.email}
            </p>
            <p className="text-gray-600 text-sm">
              {item.phone}
            </p>
            <p className="text-gray-600 text-sm">
              Qualification: {item.qualification}
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={item.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-600"
              >
                <FileText size={18} />
                View Resume
              </a>
              <button
                onClick={() => handleDeleteApplication(item._id)}
                className="flex items-center gap-1 text-red-600"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Enquiries