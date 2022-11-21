import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";
import Button from '@mui/material/Button';
import QRCode from "qrcode.react";


const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);


  const fetchData = async () => {
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setShortenLink(res.data.result.full_short_link);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);


  if (error) {
    return <p className="noData">Something went wrong</p>
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${shortenLink}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="showresult">
      {shortenLink && (
        <div >
          <div className="result">
            <p>{shortenLink}</p>

            <CopyToClipboard
              text={shortenLink}
              onCopy={() => setCopied(true)}
            >
              <Button variant="outlined" color="secondary" className={copied ? "copied" : ""}>
                Copy
              </Button>
            </CopyToClipboard>
          </div>


          <div className="qrcode">
            <QRCode value={shortenLink}
              id="qr-gen"

            />


          </div>

          <div className="dowload"> <Button variant="outlined" color="secondary" onClick={downloadQRCode} >
            Download QR Code
          </Button></div>

        </div>

      )}


    </div>


  )
}


export default LinkResult