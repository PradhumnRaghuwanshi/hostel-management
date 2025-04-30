import AdminSidebar from "./AdminSidebar";

export default function ManageRooms() {
  const rooms = [
    { id: 101, type: "Single", floor: 1, capacity: 1, occupied: false },
    { id: 102, type: "Double", floor: 1, capacity: 2, occupied: true },
    { id: 201, type: "Triple", floor: 2, capacity: 3, occupied: false },
    { id: 202, type: "Double", floor: 2, capacity: 2, occupied: true },
    { id: 301, type: "Single", floor: 3, capacity: 1, occupied: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Hostel Rooms</h1>
            <p className="text-sm text-gray-500">View, allocate, or manage room availability</p>
          </div>
          <button className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            + Add New Room
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`rounded-2xl p-5 shadow-lg bg-white border-t-4 transition-all duration-200 hover:scale-[1.01] ${
                room.occupied ? "border-red-500" : "border-green-500"
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-1">Room #{room.id}</h2>
              <p className="text-sm text-gray-500">Type: {room.type}</p>
              <p className="text-sm text-gray-500">Floor: {room.floor}</p>
              <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  room.occupied ? "text-red-600" : "text-green-600"
                }`}
              >
                {room.occupied ? "Currently Occupied" : "Available"}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  {room.occupied ? "View Details" : "Allocate Room"}
                </button>
                <button
                  className="px-3 py-2 bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
