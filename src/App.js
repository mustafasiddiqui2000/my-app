import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      // Create
      setUsers([...users, formData]);
    }
    setFormData({ name: '', email: '' });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    if (editIndex === index) {
      setFormData({ name: '', email: '' });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '' });
    setEditIndex(null);
  };

  // Professional inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#fdfdfd',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
      fontFamily: '"Segoe UI", sans-serif',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '30px',
    },
    input: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    buttonRow: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
    },
    userCard: {
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfo: {
      flex: 1,
    },
    actions: {
      display: 'flex',
      gap: '8px',
    },
    actionBtn: {
      padding: '6px 12px',
      borderRadius: '4px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    editBtn: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    deleteBtn: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
          {editIndex !== null && (
            <button type="button" onClick={handleCancel} style={{ ...styles.button, ...styles.cancelButton }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {users.map((user, index) => (
        <div key={index} style={styles.userCard}>
          <div style={styles.userInfo}>
            <strong>{user.name}</strong><br />
            <small>{user.email}</small>
          </div>
          <div style={styles.actions}>
            <button onClick={() => handleEdit(index)} style={{ ...styles.actionBtn, ...styles.editBtn }}>Edit</button>
            <button onClick={() => handleDelete(index)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
