import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function AddMedicationModal({patient, handleClose}) {

  let [startDate, setStartDate] = useState();
  let [endDate, setEndDate] = useState();
  let [medicationName, setMedicationName] = useState();
  let [dosage, setDosage] = useState();

  const isDisabled = !dosage || !medicationName;

  async function addMedication() {
    try {     
        
        const response = await fetch(`/api/addMedication?` + new URLSearchParams({
              name: medicationName,
              dosage: dosage,
              startDate: startDate ? startDate.format("MM-DD-YYYY") : '',
              endDate: endDate ? endDate.format("MM-DD-YYYY") : '',
              patientId: patient.id
        }));

        const data = await response.json();

        handleClose();

        return data;
      } 
      catch (error) {
         console.log(error)
      }
  }

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Medication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`To add a medication for ${patient.name}, please fill out the following.`}
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Medication Name"
            fullWidth
            variant="standard"
            onChange={(e) => setMedicationName(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="dosage"
            name="dosage"
            label="Medication Dosage (mg)"
            fullWidth
            variant="standard"
            type="number"
            onChange={(e) => setDosage(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateField
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <DateField
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isDisabled} onClick={addMedication}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}