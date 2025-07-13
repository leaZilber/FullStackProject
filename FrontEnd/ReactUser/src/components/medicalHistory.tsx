
import { useEffect, useState } from "react"
import { Box, Typography, Paper, CircularProgress, Chip, Pagination, Stack } from "@mui/material"
import { Stethoscope, Calendar, User, FileText, AlertTriangle, ImageIcon } from "lucide-react"
import React from "react"

void React

interface MedicalRecord {
  id: string
  date: string
  diagnosis: string
  doctor: string
  notes: string
  imageUrl: string | null
}

const MedicalHistory = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")
      if (!token) return null

      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      )

      const decoded = JSON.parse(jsonPayload)
      return decoded.UserId ? Number.parseInt(decoded.UserId) : null
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  }

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const UserId = getUserIdFromToken()

        if (!UserId) {
          console.error("No valid user ID found")
          setLoading(false)
          return
        }

        setCurrentUserId(UserId)

        const token = localStorage.getItem("token") || sessionStorage.getItem("token")
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        }

        if (token) {
          headers["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`https://fullstackproject-5070.onrender.com/api/TestResualt?userId=${UserId}`, {
          method: "GET",
          headers,
        })

        if (response.ok) {
          const data = await response.json()

          const filteredData = data.filter((item: any) => item.userId === UserId || item.userId === UserId.toString())

          const convertedData: MedicalRecord[] = filteredData.map((item: any) => ({
            id: item.testId.toString(),
            date: new Date(item.testDate).toLocaleDateString("he-IL"),
            diagnosis: item.summary,
            doctor: "מומחה עור",
            notes: "",
            imageUrl: item.imgURL && item.imgURL.trim() !== "" ? item.imgURL : null,
          }))

          setMedicalRecords(convertedData)
        } else {
          console.error(`Failed to fetch medical records. Status: ${response.status}`)
          const errorText = await response.text()
          console.error("Error response:", errorText)
        }
      } catch (error) {
        console.error("Error fetching medical history:", error)

        if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
          console.error("This might be a CORS issue. Check server CORS configuration.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMedicalHistory()
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(medicalRecords.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = medicalRecords.slice(startIndex, endIndex)

  const handlePageChange = (_: unknown, value: number) => {
    setCurrentPage(value);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
          direction: "rtl",
        }}
      >
        <CircularProgress sx={{ color: "#00B5B8", ml: 2 }} size={32} />
        <Typography variant="h6" sx={{ fontWeight: "medium", color: "text.primary" }}>
          טוען היסטוריה רפואית...
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ direction: "rtl" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          pb: 2,
          borderBottom: "2px solid #00B5B8",
        }}
      >
        <Stethoscope size={32} color="#00B5B8" />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mr: 2,
            color: "text.primary",
          }}
        >
          היסטוריה רפואית
        </Typography>
        {currentUserId && (
          <Chip
            label={`משתמש: ${currentUserId}`}
            sx={{
              backgroundColor: "#00B5B8",
              color: "white",
              mr: 2,
            }}
          />
        )}
        {medicalRecords.length > 0 && (
          <Chip
            label={`סה"כ ${medicalRecords.length} בדיקות`}
            sx={{
              backgroundColor: "#C8736D",
              color: "white",
            }}
          />
        )}
      </Box>

      {medicalRecords.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            border: "2px dashed #ccc",
            backgroundColor: "#fafafa",
          }}
        >
          <AlertTriangle size={48} color="#C8736D" style={{ marginBottom: 16 }} />
          <Typography variant="h6" color="text.secondary">
            אין עדיין בדיקות להצגה עבור המשתמש הנוכחי.
          </Typography>
        </Paper>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            {currentRecords.map((record) => (
              <Paper
                key={record.id}
                elevation={2}
                sx={{
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 100,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      m: 2,
                    }}
                  >
                    {record.imageUrl ? (
                      <img
                        src={record.imageUrl || "/placeholder.svg"}
                        alt="תמונת בדיקה"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "2px solid #00B5B8",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                          border: "2px solid #ccc",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <ImageIcon size={24} color="#999" />
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ flex: 1, px: 3, py: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FileText size={20} color="#C8736D" />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mr: 1,
                          color: "text.primary",
                        }}
                      >
                        תוצאת בדיקה
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        lineHeight: 1.6,
                        mb: 2,
                      }}
                    >
                      {record.diagnosis}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <User size={16} color="#666" />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mr: 1,
                        }}
                      >
                        <strong>רופא:</strong> {record.doctor}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 3,
                      py: 2,
                      borderRight: "1px solid #f0f0f0",
                      minWidth: 120,
                    }}
                  >
                    <Chip
                      icon={<Calendar size={16} />}
                      label={record.date}
                      sx={{
                        backgroundColor: "#00B5B8",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        mb: 2,
                        "& .MuiChip-icon": {
                          color: "white",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: "#C8736D",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                      }}
                    >
                      {record.id}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Stack spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  עמוד {currentPage} מתוך {totalPages} (מציג {currentRecords.length} מתוך {medicalRecords.length}{" "}
                  בדיקות)
                </Typography>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontSize: "1rem",
                      fontWeight: "medium",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#00B5B8 !important",
                      color: "white",
                    },
                  }}
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default MedicalHistory
