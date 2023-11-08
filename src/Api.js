import axios from "axios";

const baseUrl = 'http://localhost:3000/'
// export const fetchData = async(url)=>{
//     const data = await axios.get(`${baseUrl}${url}`)
//     return data
// }

// export const addNewTag = async(payload)=>{
//     const data = await axios.post(``)
// }

export const fetchFilterTags = async ()=>{
    const data = await axios.get(`${baseUrl}filterTags`)
    return data
}
export const fetchTasks = async ()=>{
    const data = await axios.get(`${baseUrl}tasks`)
    return data
}

export const addMroeTag = async(payload)=>{
    const data = await axios.post(`${baseUrl}filterTags`,payload)
    return data
}

export const removeTag = async(id)=>{
    const data = await axios.delete(`${baseUrl}filterTags/${id}`)
    return data
}

export const addNewTask = async(payload)=>{
    const data = await axios.post(`${baseUrl}tasks`,payload)
    return data
}

export const removeTask = async(id)=>{
    const data = await axios.delete(`${baseUrl}tasks/${id}`)
    return data
}

export const getSingleTask = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}tasks/${id}`);
      // Assuming the response contains the data you need
      return data;
    } catch (error) {
      // Handle the error and return it as an object
      const errorObject = {
        message: 'An error occurred while fetching the task',
        details: error.message, // You can include additional error details
      };
      return error.message;
    }
  };
  

export const editTask = async(id,updateData)=>{
    const data = await axios.patch(`${baseUrl}tasks/${id}`,updateData)
    return data
}