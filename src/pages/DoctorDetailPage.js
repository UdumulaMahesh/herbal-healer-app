import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [reason, setReason] = useState('');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  if (!doctor) {
    return (
      <div className="page-container">
        <p>No doctor information available.</p>
        <button onClick={() => navigate('/doctors')} className="btn-primary">
          Back to Doctors
        </button>
      </div>
    );
  }

  const bookAppointment = (e) => {
    e.preventDefault();
    
    if (!appointmentDate || !appointmentTime || !patientName || !patientPhone) {
      alert('Please fill all required fields');
      return;
    }

    setAppointmentBooked(true);
    
    setTimeout(() => {
      navigate('/doctors');
    }, 3000);
  };

  if (appointmentBooked) {
    return (
      <div className="page-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h3 className="success-title">Appointment Booked!</h3>
          <p className="success-text">
            Your appointment with {doctor.name} has been confirmed.
          </p>
          <p className="success-detail">
            Date: {new Date(appointmentDate).toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {appointmentTime}
          </p>
          <p className="success-detail" style={{marginTop: '1rem'}}>
            A confirmation message has been sent to {patientPhone}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate('/doctors')} className="back-button">
        ← Back to Doctors
      </button>

      <div className="doctor-detail-header">
        <div className="doctor-detail-avatar">{doctor.image}</div>
        <h2 className="doctor-detail-name">{doctor.name}</h2>
        <p className="doctor-detail-specialization">{doctor.specialization}</p>
        <div className="doctor-stats">
          <span style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {doctor.rating}
          </span>
          <span>{doctor.experience}</span>
        </div>
      </div>

      <div style={{marginBottom: '2rem'}}>
        <div className="doctor-detail-info">
          <div className="info-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div className="info-content">
              <p className="info-label">Location</p>
              <p className="info-text">{doctor.location}</p>
            </div>
          </div>

          <div className="info-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div className="info-content">
              <p className="info-label">Availability</p>
              <p className="info-text">{doctor.availability}</p>
            </div>
          </div>

          <div className="info-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <div className="info-content">
              <p className="info-label">Consultation Fee</p>
              <p className="info-text">{doctor.fee}</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={bookAppointment} className="appointment-form">
        <h3>Book Appointment</h3>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name *"
            className="form-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone Number *"
            className="form-input"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address (Optional)"
            className="form-input"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            className="form-input"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="time"
            className="form-input"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            className="textarea-input"
            rows="3"
            placeholder="Reason for consultation (Optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default DoctorDetailPage;