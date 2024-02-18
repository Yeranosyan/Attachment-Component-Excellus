import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";

const TabularView = () => {
  // Define state for the dropdown value
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to handle changes in the dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div
      style={{
        maxWidth: "840px",
        margin: "2rem auto",
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid lightgray",
        }}
      >
        <thead>
          <tr
            style={{
              border: "1px solid lightgray",
            }}
          >
            <th style={{ border: "1px solid lightgray", padding: "0.5rem" }}>
              Name<span style={{ color: "red" }}>*</span>
            </th>
            <th style={{ border: "1px solid lightgray" }}>File</th>
            <th>Category</th>
            <th
              style={{
                borderRight: "1px solid lightgray",
              }}
            ></th>
            <th style={{ padding: "1rem" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>name_logo2</td>
            <td>name_logo2.png</td>
            <td style={{ padding: "0.5rem" }}>
              <select
                value={selectedCategory}
                onChange={handleDropdownChange}
                style={{ borderRadius: "5px", width: "100%", padding: "5px" }}
              >
                <option value="">Select..</option>
                <option value="Claims">Claims</option>
                <option value="Supporting Documentation">
                  Supporting Documentation
                </option>
              </select>
            </td>
            <td></td>
            <td style={{ textAlign: "center" }}>
              <BsTrash3
                style={{
                  color: "lightblue",
                  fontSize: "1rem",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabularView;
