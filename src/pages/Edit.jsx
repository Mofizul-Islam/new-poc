import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
      <div>Edit Profile</div>
      <Paper>
        <Grid
          container
          justifyContent={"space-between"}
          className={"profile-form-container"}
        >
          <Grid md={4}>
            <TextField
              style={{ margin: 0 }}
              fullWidth
              id="outlined-firstname-input"
              label="First Name"
              type="text"
              autoComplete="given-name"
            />
          </Grid>
          <Grid md={4}>
            <TextField
              style={{ margin: 0 }}
              fullWidth
              id="outlined-lastname-input"
              label="Last Name"
              type="text"
              autoComplete="family-name"
            />
          </Grid>
          <Grid md={4}>
            <TextField
              style={{ margin: 0 }}
              fullWidth
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="email"
            />
          </Grid>
          <Grid md={4}>
            <TextField
              style={{ margin: 0 }}
              fullWidth
              id="outlined-cellnumber-input"
              label="Cell Number"
              type="tel"
              autoComplete="tel"
            />
          </Grid>
          <Grid md={8}>
            <TextField
              style={{ margin: 0 }}
              fullWidth
              id="outlined-address-input"
              label="Address"
              type="text"
              autoComplete="address-line1"
            />
          </Grid>
          <Grid md={4}>
            <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city-select"
                value={city}
                label="City"
                onChange={handleCityChange}
              >
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Noida">Noida</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid md={4}>
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
              <TextField
                fullWidth
                style={{ margin: 0 }}
                id="outlined-school-input"
                label="School Code"
                type="school"
                autoComplete="school"
              />
            </FormControl>
          </Grid>
          <Grid md={4}>
            <FormControl fullWidth>
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

          <Grid md={4}>
            <Grid container alignItems={"center"}>
              <Grid md={6}>
                <Typography variant={"h6"}>Profile Picture</Typography>
              </Grid>
              <Grid md={6}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <Avatar
                    style={{
                      alignSelf: "center",
                    }}
                    src="/broken-image.jpg"
                  />
                  <Button variant="outlined">Upload</Button>
                  <Button variant="text">Remove Image</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid md={4}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button variant="contained">Save</Button>
              <Button variant="contained" color="success">
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
