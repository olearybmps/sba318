import React from 'react';

const AddPlayerForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const age = formData.get('age');

    try {
      const response = await fetch('/api/roster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });

      if (response.ok) {
        // Reset form fields after successful submission
        e.target.reset();
        alert('Player added successfully');
      } else {
        const error = await response.json();
        alert(`Error adding player: ${error.message}`);
      }
    } catch (error) {
      console.error('Error adding player:', error);
      alert('An error occurred while adding the player');
    }
  };

  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/AddPlayerForm.css" />
      </head>
      <body>
        <h1>Add Player</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='lblInput' htmlFor="name">Name:</label><br></br>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label className='lblInput'  htmlFor="age">Age:</label><br></br>
            <input type="number" id="age" name="age" required />
          </div>
          <button type="submit">Add Player</button>
        </form>
      </body>
    </html>
  );
};

export default AddPlayerForm;