import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Profile.css";

export default function FormPropsTextFields() {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [qualification, setQualification] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [experience, setExperience] = React.useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleChangeChange = (event) => {
    setSchool(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>Create Profile</div>
      <Grid
        container
        justifyContent={"space-between"}
        className={"profile-form-container"}
      >
        <Grid md={4}>
          <TextField
            fullWidth
            id="outlined-firstname-input"
            label="First Name"
            type="text"
            autoComplete="given-name"
          />
        </Grid>
        <Grid md={4}>
          <TextField
            fullWidth
            id="outlined-lastname-input"
            label="Last Name"
            type="text"
            autoComplete="family-name"
          />
        </Grid>
        <Grid md={4}>
          <TextField
            fullWidth
            id="outlined-email-input"
            label="Email"
            type="email"
            autoComplete="email"
          />
        </Grid>
        <Grid md={4}>
          <TextField
            fullWidth
            id="outlined-cellnumber-input"
            label="Cell Number"
            type="tel"
            autoComplete="tel"
          />
        </Grid>
        <Grid md={8}>
          <TextField
            fullWidth
            id="outlined-address-input"
            label="Address"
            type="text"
            autoComplete="address-line1"
          />
        </Grid>
      </Grid>

      <Grid item md={4}>
        <Autocomplete
          id="city-select"
          value={city}
          onChange={handleCityChange}
          options={["Delhi", "Noida", "Mumbai"]}
          renderInput={(params) => (
            <TextField {...params} label="City" fullWidth />
          )}
        />
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="country-label">Your Country</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            value={country}
            label="Your Country"
            onChange={handleCountryChange}
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="zip-label">Zip Code</InputLabel>
          <Select
            labelId="zip-label"
            id="zip-select"
            value={zipCode}
            label="Zip Code"
            onChange={handleZipCodeChange}
          >
            <MenuItem value="12345">12345</MenuItem>
            <MenuItem value="67890">67890</MenuItem>
            <MenuItem value="13579">13579</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="qualification-label">Qualification</InputLabel>
          <Select
            labelId="qualification-label"
            id="qualification-select"
            value={qualification}
            label="Qualification"
            onChange={handleQualificationChange}
          >
            <MenuItem value="High School">High School</MenuItem>
            <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
            <MenuItem value="Master's Degree">Master's Degree</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="subject-label">Select Subject</InputLabel>
          <Select
            labelId="subject-label"
            id="subject-select"
            value={subject}
            label="Select Subject"
            onChange={handleSubjectChange}
          >
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="History">History</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="grade-label">Select Grade</InputLabel>
          <Select
            labelId="grade-label"
            id="grade-select"
            value={grade}
            label="Select Grade"
            onChange={handleGradeChange}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <FormControl>
          <InputLabel id="grade-label">Select School</InputLabel>
          <Select
            labelId="grade-label"
            id="grade-select"
            value={school}
            label="Select School"
            onChange={handleChangeChange}
          >
            <MenuItem value="A">School-A</MenuItem>
            <MenuItem value="B">School-B</MenuItem>
            <MenuItem value="C">School-C</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid md={4}>
        <TextField
          fullWidth
          id="outlined-school-input"
          label="School Code"
          type="school"
          autoComplete="school"
        />
      </Grid>
      <Grid md={4}>
        <FormControl>
          <InputLabel id="grade-label">Select Experience</InputLabel>
          <Select
            labelId="experience-label"
            id="select-experience"
            value={experience}
            label="Year Of Experience"
            onChange={handleExperienceChange}
          >
            <MenuItem value="A">5</MenuItem>
            <MenuItem value="B">6</MenuItem>
            <MenuItem value="C">7</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
}
