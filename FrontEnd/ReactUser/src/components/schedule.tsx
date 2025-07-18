import React from "react";
void React;
import { useState, useEffect } from "react"
interface Turn {
  TurnId: number;
  DateTurn: string | Date;
  Hour: string;
  TurnLocate: string;
  UserId?: string | null;
  DoctorId: number;
}

interface Doctor {
  DoctorId: number;
  DoctorName: string;
  FieldOfSpecialization: string;
  LicenseNumber: string;
}

interface DoctorWithTurns extends Doctor {
  availableTurns: Turn[];
}

const SchedulePage = () => {
  const [doctorsWithTurns, setDoctorsWithTurns] = useState<DoctorWithTurns[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithTurns | null>(null)
  const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showTurnDetails, setShowTurnDetails] = useState(false)

  const currentUserId = 1;
  
  const fetchTurns = async (): Promise<Turn[]> => {
    const response = await fetch(`https://fullstackproject-5070.onrender.com/api/Turn`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchDoctors = async (): Promise<Doctor[]> => {
    const response = await fetch("https://fullstackproject-5070.onrender.com/api/Doctor");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const loadDoctorsWithAvailableTurns = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const [allTurns, allDoctors] = await Promise.all([
        fetchTurns(),
        fetchDoctors()
      ]);

      const availableTurns = allTurns.filter(turn => 
        !turn.UserId || turn.UserId === null || turn.UserId === ""
      );

      const turnsGroupedByDoctor = availableTurns.reduce((acc, turn) => {
        if (!acc[turn.DoctorId]) {
          acc[turn.DoctorId] = [];
        }
        acc[turn.DoctorId].push(turn);
        return acc;
      }, {} as Record<number, Turn[]>);

      const doctorsWithAvailableTurns: DoctorWithTurns[] = allDoctors
        .filter(doctor => turnsGroupedByDoctor[doctor.DoctorId]) 
        .map(doctor => ({
          ...doctor,
          availableTurns: turnsGroupedByDoctor[doctor.DoctorId] || []
        }));

      setDoctorsWithTurns(doctorsWithAvailableTurns);

      if (doctorsWithAvailableTurns.length === 0) {
        setError("אין תורים פנויים כרגע עבור אף רופא");
      }

    } catch (error) {
      console.error("Error loading data:", error);
      setError("שגיאה בטעינת נתונים מהשרת. אנא בדוק את החיבור לשרת ונסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const bookTurn = async (turn: Turn) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const updatedTurn = {
        ...turn,
        UserId: currentUserId.toString()
      };

      const response = await fetch(`https://fullstackproject-5070.onrender.com/api/Turn/${turn.TurnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTurn)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess("התור נקבע בהצלחה!");
      setShowTurnDetails(false);
      setSelectedTurn(null);
      
      if (selectedDoctor) {
        const updatedDoctor = {
          ...selectedDoctor,
          availableTurns: selectedDoctor.availableTurns.filter(t => t.TurnId !== turn.TurnId)
        };
        setSelectedDoctor(updatedDoctor);
        
        setDoctorsWithTurns(prev => 
          prev.map(doc => 
            doc.DoctorId === selectedDoctor.DoctorId 
              ? updatedDoctor
              : doc
          ).filter(doc => doc.availableTurns.length > 0) 
        );
      }

    } catch (error) {
      console.error("Error booking turn:", error);
      setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctorsWithAvailableTurns();
  }, []);

  const formatDate = (dateString: string | Date) => {
    try {
      return new Date(dateString).toLocaleDateString("he-IL");
    } catch (e) {
      return dateString.toString();
    }
  };

  const handleViewTurnDetails = (turn: Turn) => {
    setSelectedTurn(turn);
    setShowTurnDetails(true);
  };

  const handleBookTurn = () => {
    if (selectedTurn) {
      bookTurn(selectedTurn);
    }
  };

  const handleDoctorSelect = (doctor: DoctorWithTurns) => {
    setSelectedDoctor(doctor);
  };

  const handleBackToDoctors = () => {
    setSelectedDoctor(null);
  };

  const theme = {
    primary: '#00B5B8',
    secondary: '#C8736D', 
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    mediumGray: '#666666'
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.lightGray,
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          backgroundColor: theme.white, 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, #008B8E 100%)`,
            color: theme.white,
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📅</div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                לוח זמנים לתורים
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={loadDoctorsWithAvailableTurns}
                disabled={loading}
                style={{ 
                  backgroundColor: theme.white,
                  color: theme.primary,
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                 רענן רשימה
              </button>
              {selectedDoctor && (
                <button
                  onClick={handleBackToDoctors}
                  style={{ 
                    backgroundColor: theme.white,
                    color: theme.primary,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  ← חזרה לרשימה
                </button>
              )}
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  border: `4px solid ${theme.lightGray}`,
                  borderTop: `4px solid ${theme.primary}`,
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}>
                </div>
              </div>
            )}

            {error && (
              <div style={{ 
                backgroundColor: '#ffebee',
                border: '1px solid #f44336',
                color: '#d32f2f',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div style={{ 
                backgroundColor: '#e8f5e8',
                border: '1px solid #4caf50',
                color: '#2e7d32',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ✅ {success}
              </div>
            )}

            {!selectedDoctor && !loading && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>🏥</div>
                  <h2 style={{ margin: 0, color: theme.primary, fontWeight: 'bold' }}>
                    בחירת רופא
                  </h2>
                </div>
                
                {doctorsWithTurns.length > 0 ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem'
                  }}>
                    {doctorsWithTurns.map((doctor) => (
                      <div 
                        key={doctor.DoctorId}
                        style={{ 
                          border: '2px solid transparent',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backgroundColor: theme.white,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => handleDoctorSelect(doctor)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = theme.primary;
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 181, 184, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)'; 
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ 
                            backgroundColor: theme.primary,
                            color: theme.white,
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginLeft: '1rem'
                          }}>
                            👨‍⚕️
                          </div>
                          <div>
                            <h3 style={{ margin: 0, color: theme.darkGray }}>
                              {doctor.DoctorName}
                            </h3>
                            <div style={{ 
                              backgroundColor: theme.secondary,
                              color: theme.white,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              marginTop: '0.25rem',
                              display: 'inline-block'
                            }}>
                              {doctor.FieldOfSpecialization}
                            </div>
                          </div>
                        </div>
                        <div style={{ color: theme.mediumGray, fontSize: '0.9rem' }}>
                          מספר רישיון: {doctor.LicenseNumber}
                        </div>
                        <div style={{ 
                          color: theme.primary, 
                          fontSize: '0.9rem',
                          marginTop: '0.5rem',
                          fontWeight: 'bold'
                        }}>
                          {doctor.availableTurns.length} תורים זמינים
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏥</div>
                    <h3 style={{ color: theme.mediumGray }}>
                      אין תורים פנויים כרגע
                    </h3>
                  </div>
                )}
              </div>
            )}

            {selectedDoctor && !loading && (
              <div>
                <div style={{ 
                  backgroundColor: theme.lightGray, 
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ 
                      backgroundColor: theme.primary,
                      color: theme.white,
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      marginLeft: '1rem'
                    }}>
                      👨‍⚕️
                    </div>
                    <div>
                      <h2 style={{ margin: 0, color: theme.primary }}>
                        {selectedDoctor.DoctorName}
                      </h2>
                      <div style={{ color: theme.mediumGray }}>
                        תחום התמחות: {selectedDoctor.FieldOfSpecialization}
                      </div>
                      <div style={{ color: theme.mediumGray, fontSize: '0.9rem' }}>
                        מספר רישיון: {selectedDoctor.LicenseNumber}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>📅</div>
                  <h2 style={{ margin: 0, color: theme.primary, fontWeight: 'bold' }}>
                    תורים זמינים
                  </h2>
                </div>

                {selectedDoctor.availableTurns.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
                    <h3 style={{ color: theme.mediumGray }}>
                      אין תורים פנויים לרופא זה כרגע
                    </h3>
                  </div>
                ) : (
                  <div style={{ 
                    backgroundColor: theme.white,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: theme.primary }}>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            📅 תאריך
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            🕐 שעה
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            📍 מיקום
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}>
                            פעולות
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoctor.availableTurns.map((turn, index) => (
                          <tr 
                            key={turn.TurnId}
                            style={{ 
                              borderBottom: index < selectedDoctor.availableTurns.length - 1 ? `1px solid ${theme.lightGray}` : 'none'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = theme.lightGray;
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.primary, marginLeft: '0.5rem' }}>📅</span>
                                {formatDate(turn.DateTurn)}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.secondary, marginLeft: '0.5rem' }}>🕐</span>
                                {turn.Hour}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.mediumGray, marginLeft: '0.5rem' }}>📍</span>
                                {turn.TurnLocate}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button
                                  onClick={() => handleViewTurnDetails(turn)}
                                  style={{ 
                                    border: `1px solid ${theme.secondary}`,
                                    backgroundColor: 'transparent',
                                    color: theme.secondary,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  ℹ️ פרטים
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTurn(turn);
                                    bookTurn(turn);
                                  }}
                                  disabled={loading}
                                  style={{ 
                                    backgroundColor: theme.primary,
                                    color: theme.white,
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  ✅ קבע תור
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {showTurnDetails && selectedTurn && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: theme.white,
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '500px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{
                    backgroundColor: theme.primary,
                    color: theme.white,
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontWeight: 'bold' }}>
                      פרטי תור
                    </h3>
                    <button 
                      onClick={() => setShowTurnDetails(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: theme.white,
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.primary, marginLeft: '1rem', fontSize: '1.2rem' }}>👨‍⚕️</span>
                        <div>
                          <strong>רופא:</strong> {selectedDoctor?.DoctorName}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.primary, marginLeft: '1rem', fontSize: '1.2rem' }}>📅</span>
                        <div>
                          <strong>תאריך:</strong> {formatDate(selectedTurn.DateTurn)}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.secondary, marginLeft: '1rem', fontSize: '1.2rem' }}>🕐</span>
                        <div>
                          <strong>שעה:</strong> {selectedTurn.Hour}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.mediumGray, marginLeft: '1rem', fontSize: '1.2rem' }}>📍</span>
                        <div>
                          <strong>מיקום:</strong> {selectedTurn.TurnLocate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem',
                    borderTop: `1px solid ${theme.lightGray}`
                  }}>
                    <button
                      onClick={() => setShowTurnDetails(false)}
                      style={{ 
                        border: `1px solid ${theme.mediumGray}`,
                        backgroundColor: 'transparent',
                        color: theme.mediumGray,
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      סגירה
                    </button>
                    <button
                      onClick={handleBookTurn}
                      disabled={loading}
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.white,
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {loading ? "מקבע..." : "✅ אישור הרשמה"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default SchedulePage