import { useEffect, useState } from "react";

import {
  FaTruck,
  FaBars,
  FaSearch,
  FaRoute,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import "./App.css";

function App() {

  const [vehicles, setVehicles] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    route: "",
    status: "",
    capacity: "",
    deliveryDate: "",
  });





  // FETCH VEHICLES

  const fetchVehicles = async () => {

    try {

      const response = await fetch(
        "s://transport-management-system-backend-liey.onrender.com"
      );

      const data = await response.json();

      setVehicles(data);

    } catch (error) {

      console.log(error);

    }
  };





  useEffect(() => {

    fetchVehicles();

  }, []);







  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };








  // ADD + UPDATE

  const addVehicle = async (e) => {

    e.preventDefault();

    try {

      // UPDATE

      if (editId) {

        await fetch(
          `://localhost:5000/api/vehicles/${editId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),
          }
        );

        setEditId(null);

      }

      // ADD

      else {

        await fetch(
          "://localhost:5000/api/vehicles/add",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),
          }
        );
      }

      fetchVehicles();

      setFormData({
        vehicleNumber: "",
        driverName: "",
        route: "",
        status: "",
        capacity: "",
        deliveryDate: "",
      });

    } catch (error) {

      console.log(error);

    }
  };









  // DELETE

  const deleteVehicle = async (id) => {

    try {

      await fetch(
        `://localhost:5000/api/vehicles/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchVehicles();

    } catch (error) {

      console.log(error);

    }
  };










  // EDIT

  const editVehicle = (vehicle) => {

    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      driverName: vehicle.driverName,
      route: vehicle.route,
      status: vehicle.status,
      capacity: vehicle.capacity,
      deliveryDate: vehicle.deliveryDate,
    });

    setEditId(vehicle._id);
  };









  // STATS

  const totalVehicles = vehicles.length;

  const activeVehicles = vehicles.filter(
    (v) => v.status === "Active"
  ).length;

  const delayedVehicles = vehicles.filter(
    (v) => v.status === "Delayed"
  ).length;

  const pendingVehicles = vehicles.filter(
    (v) => v.status === "Pending"
  ).length;









  return (

    <div className="dashboard">






      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="logo">

          <FaTruck className="logo-icon" />

          <div>
            <h2>RouteMaster</h2>
            <p>Logistics</p>
          </div>

        </div>






        <ul>

          <li
            className={
              activeMenu === "Dashboard"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setActiveMenu("Dashboard")
            }
          >
            <FaBars /> Dashboard
          </li>





          <li
            className={
              activeMenu === "Vehicles"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setActiveMenu("Vehicles")
            }
          >
            <FaTruck /> Vehicles
          </li>





          <li
            className={
              activeMenu === "Routes"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setActiveMenu("Routes")
            }
          >
            <FaRoute /> Routes
          </li>





          <li
            className={
              activeMenu === "Reports"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setActiveMenu("Reports")
            }
          >
            <FaChartBar /> Reports
          </li>





          <li
            className={
              activeMenu === "Settings"
                ? "active-menu"
                : ""
            }
            onClick={() =>
              setActiveMenu("Settings")
            }
          >
            <FaCog /> Settings
          </li>

        </ul>

      </div>














      {/* MAIN */}

      <div className="main-content">







        {/* TOPBAR */}

        <div className="topbar">

          <h1>
            {activeMenu}
          </h1>





          <div className="search-container">

            <FaSearch />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>














        {/* DASHBOARD */}

        {activeMenu === "Dashboard" && (

          <>





            {/* CARDS */}

            <div className="stats-container">

              <div className="card blue">
                <h2>{totalVehicles}</h2>
                <p>Total Vehicles</p>
              </div>

              <div className="card green">
                <h2>{activeVehicles}</h2>
                <p>Active</p>
              </div>

              <div className="card orange">
                <h2>{delayedVehicles}</h2>
                <p>Delayed</p>
              </div>

              <div className="card purple">
                <h2>{pendingVehicles}</h2>
                <p>Pending</p>
              </div>

            </div>









            {/* ANALYTICS GRID */}

            <div className="analytics-grid">





              {/* FORM */}

              <div className="left-panel">

                <form
                  className="vehicle-form"
                  onSubmit={addVehicle}
                >

                  <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="driverName"
                    placeholder="Driver Name"
                    value={formData.driverName}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="route"
                    placeholder="Route"
                    value={formData.route}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="status"
                    placeholder="Active / Delayed / Pending"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    required
                  />

                  <button type="submit">

                    {editId
                      ? "Update Vehicle"
                      : "Add Vehicle"}

                  </button>

                </form>

              </div>









              {/* RECENT OPERATIONS */}

              <div className="activity-panel">

                <h2>
                  Recent Operations
                </h2>





                {vehicles
                  .slice(-5)
                  .reverse()
                  .map((vehicle) => (

                    <div
                      key={vehicle._id}
                      className="activity-card"
                    >

                      <div>

                        <h3>
                          {vehicle.vehicleNumber}
                        </h3>

                        <p>
                          {vehicle.route}
                        </p>

                      </div>





                      <span
                        className={
                          vehicle.status === "Active"
                            ? "active"

                            : vehicle.status === "Delayed"
                            ? "delayed"
                            : "pending"
                        }
                      >

                        {vehicle.status}

                      </span>

                    </div>

                  ))}

              </div>

            </div>

          </>

        )}














        {/* VEHICLES */}

        {activeMenu === "Vehicles" && (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>Capacity</th>
                  <th>Delivery</th>
                  <th>Action</th>
                </tr>

              </thead>





              <tbody>

                {vehicles

                  .filter((vehicle) =>

                    vehicle.vehicleNumber
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||

                    vehicle.driverName
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||

                    vehicle.route
                      .toLowerCase()
                      .includes(search.toLowerCase())

                  )

                  .map((vehicle) => (

                    <tr key={vehicle._id}>

                      <td>
                        {vehicle.vehicleNumber}
                      </td>

                      <td>
                        {vehicle.driverName}
                      </td>

                      <td>
                        {vehicle.route}
                      </td>





                      <td>

                        <span
                          className={
                            vehicle.status === "Active"
                              ? "active"

                              : vehicle.status === "Delayed"
                              ? "delayed"
                              : "pending"
                          }
                        >

                          {vehicle.status}

                        </span>

                      </td>





                      <td>
                        {vehicle.capacity}
                      </td>

                      <td>
                        {vehicle.deliveryDate}
                      </td>





                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editVehicle(vehicle)
                          }
                        >
                          Edit
                        </button>





                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteVehicle(
                              vehicle._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}














        {/* ROUTES */}

        {activeMenu === "Routes" && (

          <div className="route-box">

            <h2>
              Active Routes
            </h2>

            {vehicles.map((vehicle) => (

              <div
                key={vehicle._id}
                className="route-card"
              >

                <h3>
                  {vehicle.route}
                </h3>

                <p>
                  Vehicle:
                  {" "}
                  {vehicle.vehicleNumber}
                </p>

                <p>
                  Driver:
                  {" "}
                  {vehicle.driverName}
                </p>

              </div>

            ))}

          </div>

        )}













        {/* REPORTS */}

        {activeMenu === "Reports" && (

          <div className="reports-box">

            <div className="card blue">
              <h2>{totalVehicles}</h2>
              <p>Total Operations</p>
            </div>

            <div className="card green">
              <h2>{activeVehicles}</h2>
              <p>Successful Deliveries</p>
            </div>

            <div className="card orange">
              <h2>{delayedVehicles}</h2>
              <p>Delayed Operations</p>
            </div>

          </div>

        )}












        {/* SETTINGS */}

        {activeMenu === "Settings" && (

          <div className="settings-box">

            <h2>
              System Settings
            </h2>

            <p>
              Manufacturing Logistics Dashboard
            </p>

            <p>
              MERN Stack Application
            </p>

            <p>
              Version 1.0
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;