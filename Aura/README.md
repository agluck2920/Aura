# Instructions on how to run project

## Please download the entire project to start.
## Afterwards, please open up a terminal and in that terminal, navigate to the directory you downloaded the project.
## Once you are in the directory, please run 'npm install' to download all of the project's dependencies.
## Next, please run 'npx prisma migrate reset' to reset the database with the data in 'patient.json'
## Then please run the command 'npm run dev' to start up a localhost version of the application on port 3000
#### Note if you have something currently running on that port the application will run on port 3001 instead, the terminal should tell you which port the application is using
## Once this is up and running, go to a web browser and enter in the following URL to see the application running 'localhost:3000'

# Justifications and Assumptions on Implementation: 

## I assumed that the 'name' associated with a patient is a last name since a first name is provided in the data 
## Since the requirements specify current medications as opposed to all medications, I filtered the medication list based on if today's date is within the date range they provided. 
#### If there is no date range for the medication since the startDate and endDate are optional for a medication, I also include it in the current medication list with the assumption that it is a medication that will be used indefinitely.
## I chose to use the MUI library because MUI already has all of the components I needed to build out this project
## I chose to use the moment library because it integrates well with the MUI library when dealing with dates
## I chose to use Next.js and prisma because Next.js allows me to easily make APIs and prisma allows me to not only easily populate my databases with test data, but also query my databases
