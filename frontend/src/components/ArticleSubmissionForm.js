import React, { useState } from 'react';

const ArticleSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journalName: '',
    year: '',
    volume: '',
    number: '',
    pages: '',
    doi: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.authors) tempErrors.authors = "Authors are required";
    if (!formData.journalName) tempErrors.journalName = "Journal name is required";
    if (!formData.year || isNaN(formData.year)) tempErrors.year = "Valid year is required";
    if (!formData.doi) tempErrors.doi = "DOI is required";
    return tempErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          alert('Article submitted successfully!');
        } else {
          alert('Submission failed!');
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label>Authors</label>
        <input
          type="text"
          value={formData.authors}
          onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
        />
        {errors.authors && <p>{errors.authors}</p>}
      </div>

      <div>
        <label>Journal Name</label>
        <input
          type="text"
          value={formData.journalName}
          onChange={(e) => setFormData({ ...formData, journalName: e.target.value })}
        />
        {errors.journalName && <p>{errors.journalName}</p>}
      </div>

      <div>
        <label>Year of Publication</label>
        <input
          type="text"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
        />
        {errors.year && <p>{errors.year}</p>}
      </div>

      <div>
        <label>Volume</label>
        <input
          type="text"
          value={formData.volume}
          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
        />
      </div>

      <div>
        <label>Number</label>
        <input
          type="text"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
        />
      </div>

      <div>
        <label>Pages</label>
        <input
          type="text"
          value={formData.pages}
          onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
        />
      </div>

      <div>
        <label>DOI</label>
        <input
          type="text"
          value={formData.doi}
          onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
        />
        {errors.doi && <p>{errors.doi}</p>}
      </div>

      <button type="submit">Submit Article</button>
    </form>
  );
};

export default ArticleSubmissionForm;
