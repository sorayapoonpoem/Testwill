import { useState } from "react"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }

  return (
    <div className="inputContainer">


      <div className="head">
        <h1><span>Short URL Generator</span></h1>
      </div>
      <div className="input">
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',

          }}
        >
          <TextField fullWidth label="Paste your link here" color="secondary" value={value}
            onChange={e => setValue(e.target.value)} sx={{ mr: 2, ml: 2 }} />

          <Button variant="contained" color="secondary" onClick={handleClick}>
            Shorten
          </Button>
        </Box>



      </div>


    </div>
  )
}

export default InputShortener