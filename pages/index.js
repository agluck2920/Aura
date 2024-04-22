import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, CardActions, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  
  async function getAllData() {
    try {
      const response = await fetch("/api/patients");
      const data = await response.json();

      setPatients(data);
      
      return data;
    } 
    catch (error) {
       console.log(error)
    }  
  }

  let [patients, setPatients] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Head>
        <title>List of Patients</title>
      </Head>
      <main>
         <Box sx={{display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h1">Patient List</Typography>
            {
              patients[0] ?
                patients.map(function(patient) {
                  return (
                    <Card key={patient.id} sx={{ backgroundColor: "#d3d3d3", marginBottom: "20px", width: "90%" }}>
                      <CardContent sx={{marginLeft: "20px"}}>
                        <Typography variant="h3">
                          {patient.name}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{marginLeft: "20px", padding: "16px"}}>
                        <Link href={`/${patient.id}`}> Go to Patient Page </Link>
                      </CardActions>
                    </Card>
                  );
                })
                : <Box sx={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center"}}>
                    <CircularProgress />
                  </Box>
            }
          </Box>
      </main>
    </div>
  );
}
