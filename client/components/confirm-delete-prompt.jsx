import React from 'react'

const ConfirmDeletePrompt = (props) => {
  const { confirmDelete,
    handleEntryDelete,
    handleConfirmDelete
  } = props;

  const displayStyle = {
    display: confirmDelete ? 'block' : 'none'
  }

  return (
    <div className="prompt" style={displayStyle}>
      <p>Are you sure you want to delete this entry?</p>
      <button onClick={() => handleEntryDelete(confirmDelete)}>Yes</button>
      <button onClick={() => handleConfirmDelete(false)}>No</button>
    </div>
  );
}

export default ConfirmDeletePrompt;
