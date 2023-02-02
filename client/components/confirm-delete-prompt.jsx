import React from 'react'

const ConfirmDeletePrompt = (props) => {
  const { confirmDelete,
    handleEntryDelete,
    handleConfirmDelete
  } = props;

  const displayStyle = {
    display: confirmDelete ? 'flex' : 'none'
  }

  return (
    <div className="prompt-bg" style={displayStyle}>
      <div className="prompt">
        <p>Are you sure you want to delete this entry?</p>
        <div className="delete-buttons">
          <button onClick={() => handleEntryDelete(confirmDelete)}>Yes</button>
          <button onClick={() => handleConfirmDelete(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeletePrompt;
