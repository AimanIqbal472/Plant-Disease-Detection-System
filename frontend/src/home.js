import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import axios from "axios";
import wallpaper from "./wallpaper.jpg";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": { backgroundColor: "#ffffff7a" },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${wallpaper})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      filter: "blur(6px)",
      zIndex: -1,
    },
  },
  sidebar: {
    width: "300px",
    backgroundColor: "rgba(0,100,0,0.8)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflowY: "auto",
  },
  sidebarSection: {
    marginBottom: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarTitle: { fontSize: "28px", fontWeight: "bold" },
  sidebarSubtitle: { fontSize: "20px", fontStyle: "italic" },
  sidebarBody: { fontSize: "18px" },
  sidebarInvalid: { fontSize: "18px", color: "#ff4d4d", fontWeight: "bold" },
  hr: { width: "100%", borderColor: "white", margin: "10px 0" },
  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2em",
  },
  imageCard: {
    maxWidth: 400,
    width: "100%",
    backgroundColor: "transparent",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: { height: "auto" },
  media: { height: 400 },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  loader: { color: "#be6a77 !important" },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
    marginTop: "15px",
  },
}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [language, setLanguage] = useState("en");
  let confidence = 0;

  const validClasses = ["Early Blight", "Late Blight", "Healthy"];
  const confidenceThreshold = 0.6; // 60% minimum confidence

  const texts = {
    en: {
      title: "Potato Doctor",
      slogan: "Your Smart Guide to Potato Plant Health",
      uploadInstruction: "Upload an image of a potato leaf to get predictions",
      label: "Label",
      confidence: "Confidence",
      precaution: "Precautionary Measures",
      diseases: {
        "Early Blight": [
          "Remove and destroy infected leaves.",
          "Apply fungicides early in the season.",
          "Rotate crops to avoid soil build-up.",
        ],
        "Late Blight": [
          "Use certified disease-free seeds.",
          "Apply copper-based fungicides regularly.",
          "Avoid overhead irrigation to reduce moisture.",
        ],
        Healthy: [
          "Maintain proper watering schedule.",
          "Ensure balanced fertilization.",
          "Monitor regularly for early signs of disease.",
        ],
      },
      clear: "Clear",
      processing: "Processing",
      uploadHere: "Upload here",
      invalid: "The uploaded image is invalid. Please upload a potato leaf image.",
    },
    ur: {
      title: "Potato Doctor",
      slogan: "آپ کے آلو کے پودے کی صحت کے لیے اسمارٹ رہنما",
      uploadInstruction: "پیش گوئی کے لیے آلو کے پتے کی تصویر اپ لوڈ کریں",
      label: "قسم",
      confidence: "اعتماد",
      precaution: "احتیاطی تدابیر",
      diseases: {
        "Early Blight": [
          "متاثرہ پتے ہٹا کر تلف کریں۔",
          "فنگسائیڈ موسم کے شروع میں لگائیں۔",
          "زمین میں بیماری سے بچاؤ کے لیے فصل کی گردش کریں۔",
        ],
        "Late Blight": [
          "تصدیق شدہ بیماری سے پاک بیج استعمال کریں۔",
          "تھوڑے وقفے سے کاپر پر مبنی فنگسائیڈ لگائیں۔",
          "پانی کے اوپر سے پانی دینے سے گریز کریں۔",
        ],
        Healthy: [
          "پانی دینے کا شیڈول برقرار رکھیں۔",
          "متوازن کھاد استعمال کریں۔",
          "بیماری کے ابتدائی نشانوں کی نگرانی کریں۔",
        ],
      },
      clear: "صاف کریں",
      processing: "عمل ہو رہا ہے",
      uploadHere: "یہاں اپ لوڈ کریں",
      invalid: "اپ لوڈ کی گئی تصویر درست نہیں ہے۔ براہ کرم آلو کے پتے کی تصویر اپ لوڈ کریں۔",
    },
  };

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) setData(res.data);
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) return;
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) confidence = parseFloat(data.confidence);

  const label =
    data && (confidence < confidenceThreshold || !validClasses.includes(data.class))
      ? "Invalid"
      : data?.class;

  return (
    <div className={classes.mainContainer}>
      {/* Sidebar */}
      <div className={classes.sidebar}>
        {/* Language Switch */}
        <div className={classes.sidebarSection}>
          <Button
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            variant="contained"
            style={{ marginBottom: "10px" }}
          >
            {language === "en" ? "اردو" : "English"}
          </Button>
        </div>

        {/* Title */}
        <div className={classes.sidebarSection}>
          <Typography className={classes.sidebarTitle}>
            {texts[language].title}
          </Typography>
        </div>
        <hr className={classes.hr} />

        {/* Slogan */}
        <div className={classes.sidebarSection}>
          <Typography className={classes.sidebarSubtitle}>
            {texts[language].slogan}
          </Typography>
        </div>
        <hr className={classes.hr} />

        {/* Upload Instructions */}
        {!image && (
          <div className={classes.sidebarSection}>
            <Typography className={classes.sidebarBody}>
              {texts[language].uploadInstruction}
            </Typography>
          </div>
        )}

        {/* Prediction Results */}
        {data && (
          <div className={classes.sidebarSection}>
            <Typography className={classes.sidebarBody} style={{ fontWeight: "bold" }}>
              <b>{texts[language].label}:</b> {label}
            </Typography>

            {label !== "Invalid" ? (
              <>
                <Typography className={classes.sidebarBody}>
                  <b>{texts[language].confidence}:</b> {(confidence * 100).toFixed(2)}%
                </Typography>
                <hr className={classes.hr} />
                <Typography className={classes.sidebarBody} style={{ fontWeight: "bold" }}>
                  {texts[language].precaution}:
                </Typography>
                <ul>
                  {texts[language].diseases[data.class].map((item, idx) => (
                    <li key={idx} className={classes.sidebarBody}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <Typography className={classes.sidebarInvalid}>
                {texts[language].invalid}
              </Typography>
            )}

            {/* Clear Button */}
            <ColorButton
              variant="contained"
              className={classes.clearButton}
              onClick={clearData}
              startIcon={<Clear />}
            >
              {texts[language].clear}
            </ColorButton>
          </div>
        )}
      </div>

      {/* Image Upload Section */}
      <div className={classes.imageSection}>
        <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ""}`}>
          {!image && (
            <CardContent>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={texts[language].uploadHere}
                onChange={onSelectFile}
              />
            </CardContent>
          )}

          {image && (
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={preview}
                component="img"
                title="Uploaded Leaf"
              />
            </CardActionArea>
          )}

          {isLoading && (
            <CardContent className={classes.detail}>
              <CircularProgress color="secondary" className={classes.loader} />
              <Typography variant="h6">{texts[language].processing}</Typography>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
