import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const HostelData = createContext()
function Context({children}) {
    useEffect(() => {
        fetchRoomsWithRents();
      }, []);
      
      const [roomRentData, setRoomRentData] = useState([]);
      
      const fetchRoomsWithRents = async () => {
        try {
          const res = await axios.get("http://localhost:5001/rooms/rooms-with-rents");
          console.log(res.data.data)
          setRoomRentData(res.data.data); // assuming the response is an array of rooms with rent
        } catch (err) {
          console.error("Error fetching rent data:", err);
        }
      };
  return (
    <HostelData.Provider value={{fetchRoomsWithRents, roomRentData, setRoomRentData}}>
        {children}
    </HostelData.Provider>
  )
}

export default Context