import { useState, useEffect } from "react";
import { BsTrash3 } from "react-icons/bs";
import PropTypes from "prop-types";

const TabularView = ({ files }) => {
  const [tableResults, setTableResults] = useState(files);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNameChange = (event, fileId) => {
    const updatedFiles = tableResults.map((file) => {
      if (file.id === fileId) {
        return {
          ...file,
          name: event.target.value,
        };
      }
      return file;
    });
    setTableResults(updatedFiles);
  };

  // Delete file from table
  const handleDeleteFile = (fileId) => {
    const updatedFiles = tableResults.filter((file) => file.id !== fileId);
    setTableResults(updatedFiles);
  };

  useEffect(() => {
    setTableResults(files);
  }, [files]);

  return (
    <div
      style={{
        maxWidth: "840px",
        margin: "2rem auto",
        overflowX: "auto",
        maxHeight: "220px", // Set maximum height for scroll (can change how it's looks)
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
            <th
              style={{
                border: "1px solid lightgray",
                padding: "0.5rem",
              }}
            >
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
          {/* Assign unique key key={file.id} for table issue */}
          {tableResults.map((file) => (
            <tr key={file.id}>
              <td style={{ padding: "0.5rem" }}>
                <input
                  value={file.name}
                  onChange={(event) => handleNameChange(event, file.id)}
                  style={{ borderRadius: "5px", width: "90%", padding: "5px" }}
                />
              </td>
              <td>{file.fullName}</td>
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
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  style={{ border: "none", cursor: "pointer" }}
                >
                  <BsTrash3
                    style={{
                      color: "lightblue",
                      fontSize: "1rem",
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TabularView.propTypes = {
  files: PropTypes.array.isRequired,
};

export default TabularView;
