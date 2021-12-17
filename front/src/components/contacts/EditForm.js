import React from "react";

function EditForm({ placeholderName, placeholderNumber }) {
  return (
    <form>
      <input
        style={{ height: "30px", width: "150px" }}
        placeholder={placeholderName}
      />
      <input
        style={{ height: "30px", width: "150px" }}
        placeholder={placeholderNumber}
      />
    </form>
  );
}

export default EditForm;
