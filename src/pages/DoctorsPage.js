import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../data/diseaseData';

const DoctorsPage = () => {
  const navigate = useNavigate();

  const viewDoctorDetail = (doctor) => {
    navigate(`/doctor/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div className="page-container">
      <div className="doctors-header">
        <h2>Consult a Doctor</h2>
        <p>Book an appointment with our expert herbal medicine practitioners</p>
      </div>

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-card-content">
              <div className="doctor-avatar">{doctor.image}</div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>
                <div className="doctor-details">
                  <span className="doctor-rating">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {doctor.rating}
                  </span>
                  <span>• {doctor.experience}</span>
                  <span>• {doctor.fee}</span>
                </div>
                <p className="doctor-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline', marginRight: '0.25rem'}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {doctor.location}
                </p>
                <button 
                  onClick={() => viewDoctorDetail(doctor)}
                  className="book-btn"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;