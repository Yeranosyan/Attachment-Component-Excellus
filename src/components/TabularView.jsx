import { useState, useEffect } from "react";
import { BsTrash3 } from "react-icons/bs";

const TabularView = ({ files }) => {
  const [tableResults, setTableResults] = useState(files);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNameChange = (event, file) => {
    const selectedFile = tableResults.find((t) => t.id === file.id);
    selectedFile.name = event.target.value;
    const results = tableResults.filter((t) => t.id !== file.id);
    setTableResults([selectedFile, ...results]);
  };

  useEffect(() => {
    console.log("files fired");
    console.log(files);
    setTableResults([...files]);
  }, [files]);

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
          {tableResults.map((file) => (
            <tr key={file.id}>
              {" "}
              {/* Assign unique key */}
              <td style={{ padding: "0.5rem" }}>
                <input
                  value={file.name}
                  onChange={(event) => handleNameChange(event, file)}
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
                <BsTrash3
                  style={{
                    color: "lightblue",
                    fontSize: "1rem",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabularView;
