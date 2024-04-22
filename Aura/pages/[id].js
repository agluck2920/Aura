import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import AddMedicationModal from '../components/addMedicationModal';
import TemperatureChart from '../components/temperatureChart';
import moment from 'moment';
import {TextField, CircularProgress} from '@mui/material';

export default function Patient() {
  
    const router = useRouter();
    const patientId = router.query.id;

    const [isModalOpen, setModalState] = useState(false);
    const [currentMedications, setCurrentMedications] = useState([]);
    const [patient, setPatient] = useState();
    const [newTemp, setNewTemp] = useState();
    const [scale, setScale] = useState(1);
    
    useEffect(() => {
        patientId && !isModalOpen && getAllData();
    }, [patientId, isModalOpen]);

    async function removeMedication(id) {
        try {
          const response = await fetch(`/api/deleteMedication?id=${id}`);
          const data = await response.json();
          const medications = currentMedications;
                  
          const filteredMedications = medications.filter((medication) => medication.id !== id);
          
          setCurrentMedications(filteredMedications);
        
          return data;
        } 
        catch (error) {
           console.log(error)
        }
        
    }

    async function addTemperature() {
        try {             
            const response = await fetch(`/api/addTemperature?` + new URLSearchParams({
                date: moment().format("YYYY-MM-DD"),
                temperature: newTemp,
                patientId: patient.id
            }));
    
            const data = await response.json();

            await getAllData();

            return data;
          } 
          catch (error) {
             console.log(error)
          }
        
    }

    async function getAllData() {
        try {
          const response = await fetch(`/api/patient?id=${patientId}`);
          const patient = await response.json();
          setPatient(patient);

          const medications = patient.medications;
          const filteredMedications = medications.filter(function(medication) {
                if(moment(medication.start_date).isBefore(moment()) && moment(medication.end_date).isAfter(moment()) || !medication.end_date)
                {
                    return medication;
                }   
          });

          setCurrentMedications(filteredMedications);
          
          return patient;
        } 
        catch (error) {
           console.log(error)
        }
        
    }

    const hasTemperatureToday = patient && patient.temperatures && patient.temperatures.some(function(temp){
        if(moment(temp.date).format('YYYY-MM-DD') === (moment().format('YYYY-MM-DD')))
        {
            return true;
        }
    })

    let currentMonth = moment().format("MM-YYYY");
    let last3months = [currentMonth,  moment().subtract(1,"month").format("MM-YYYY"),  moment().subtract(2,"month").format("MM-YYYY")];
    let last6months = [...last3months, moment().subtract(3,"month").format("MM-YYYY"),  moment().subtract(4,"month").format("MM-YYYY"),  moment().subtract(5,"month").format("MM-YYYY")];

    const temperatures = patient && patient.temperatures && patient.temperatures.filter(function(temp) {
        let tempMonth = moment(temp.date).format("MM-YYYY");

        if (scale === 1)
        {
            return tempMonth === currentMonth;
        }
        else if(scale === 3)
        {
            return last3months.includes(tempMonth);
        }
        else if (scale === 6)
        {
            return last6months.includes(tempMonth);
        }
    })

    return (
        <Box>
            {
                patient ?
            <React.Fragment>
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", marginBottom: "150px" }}>                   
                    <Box sx={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography variant="h4" sx={{textDecoration: "underline", marginBottom: "15px"}}>Name</Typography>
                            <Typography variant="h4">{patient.firstName} {patient.name}</Typography> 
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}> 
                            <Typography variant="h4" sx={{textDecoration: "underline", marginBottom: "15px"}}>Age</Typography>
                            <Typography variant="h4">{patient.age}</Typography>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}> 
                            <Typography variant="h4" sx={{textDecoration: "underline", marginBottom: "15px"}}>Gender</Typography>
                            <Typography variant="h4">{patient.gender}</Typography>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography variant="h4" sx={{textDecoration: "underline", marginBottom: "15px"}}>Height</Typography>
                            <Typography variant="h4">{patient.height} in</Typography> 
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}> 
                            <Typography variant="h4"sx={{textDecoration: "underline", marginBottom: "15px"}}>Weight</Typography>
                            <Typography variant="h4">{patient.weight} lbs</Typography>
                        </Box>
                    </Box>              
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "150px"}}>               
                    <Box sx={{width: "25%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <TextField
                            required
                            margin="dense"
                            id="temperature"
                            name="temperature"
                            label={hasTemperatureToday ? "Already Entered Temperature Today" : "Enter New Temperature"}
                            disabled={hasTemperatureToday}
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setNewTemp(e.target.value)}
                        />
                        <Button disabled={hasTemperatureToday} onClick={addTemperature}>Add Temperature</Button>
                    </Box>        
                    <Box sx={{width: "70%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Box sx={{display: "flex", justifyContent: "flex-end", marginRight: "50px"}}>
                            <Button onClick={() => setScale(1)}>1 month</Button>
                            <Button onClick={() => setScale(3)}>3 months</Button>
                            <Button onClick={() => setScale(6)}>6 months</Button>
                        </Box>
                        <TemperatureChart temperatures={temperatures} label={`${scale} ${scale === 1 ? 'month' : 'months'}`}/>
                    </Box>          
                </Box>
                <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <Typography variant="h4" sx={{textDecoration: "underline", marginBottom: "15px"}}>Current Medications</Typography> 
                    <Box sx={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}>
                        {
                            currentMedications &&
                                currentMedications.map(function(medication) {
                                    return (
                                        <Card key={patient.id} sx={{ backgroundColor: "#d3d3d3", marginBottom: "20px", width: "90%" }}>
                                            <CardContent sx={{marginLeft: "20px"}}>
                                                <Typography variant="h6">
                                                    {medication.name}
                                                </Typography>
                                                <Typography>
                                                    {medication.dosage}
                                                </Typography>
                                                <Typography >
                                                    {medication.start_date} {medication.start_date && '-'}  {medication.end_date}
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{marginLeft: "20px", padding: "16px"}}>
                                                <Button onClick={() => removeMedication(medication.id)}> Remove Medication </Button>
                                            </CardActions>
                                        </Card>
                                    );
                                })
                        }
                    </Box>
                    <Button onClick={() => setModalState(true)}>Add Medication</Button>
                </Box>
                {isModalOpen && <AddMedicationModal handleClose={() => setModalState(false)} patient={patient} />}
            </React.Fragment>
            : <Box sx={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress />
              </Box>
            }
        </Box>
    );
  }
  