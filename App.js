import React, { useState } from 'react';
import Autocomplete from 'react-autocomplete';

import './App.css';
const initialData = [
  { id: 1, name: 'mahek', age: 21, gender: 'f' },
  { id: 2, name: 'ravi', age: 31, gender: 'm' },
  { id: 3, name: 'surya', age: 24, gender: 'm' },
  { id: 4, name: 'johhny', age: 17, gender: 'm' },
  { id: 5, name: 'shenal', age: 29, gender: 'f' },
]

function App() {
  
    const [data] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all'); // 'all', 'f', 'm'

  const filteredData = data.filter(item => {
    const searchMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const genderMatches = genderFilter === 'all' || item.gender === genderFilter;
    return searchMatches && genderMatches;
  });
  
  const handleNameChange = value => {
    setSearchTerm(value);
  };

  return (
    <div>
      <div>
        
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Autocomplete
          getItemValue={item => item.name}
          items={data}
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
              key={item.id}
            >
              {item.name}
            </div>
          )}
          value={searchTerm}
          onChange={(e, value) => handleNameChange(value)}
          onSelect={value => handleNameChange(value)}
        />
        <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
          <option value="all">All Genders</option>
          <option value="f">Female</option>
          <option value="m">Male</option>
        </select>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id} style={{ backgroundColor: item.gender === 'm' ? 'blue' : 'pink' }}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.gender === 'f' ? 'Female' : 'Male'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
