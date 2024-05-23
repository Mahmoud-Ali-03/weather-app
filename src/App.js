import "./App.css";

// MomoentJS
import moment from "moment/moment";
import "moment/min/locales";
//this is Materal UI moduels
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// React Hoks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// redax
import { useDispatch, useSelector } from "react-redux";
import { fetchwatherdata } from "./storeSlice";
const Theme = createTheme({
  typography: {
    fontFamily: ["Baloo-reg"],
  },
});

function App() {
  const runisloader = useSelector((state) => {
    return state.weather.isloder;
  });
  const temp = useSelector((state) => {
    return state.weather.weather;
  });
  const dispatch = useDispatch();
  const [curentlang, setCurentlang] = useState("ar");
  const theday = moment().format("dddd");
  const thedate = moment().format("l");
  const directions = curentlang == "ar" ? "rtl" : "ltr";
  const [showdayanddate, setShowdayanddate] = useState({ day: "", date: "" });
  const { t, i18n } = useTranslation();
  const handelchangelang = () => {
    if (curentlang == "ar") {
      moment.locale("ar");
      setCurentlang("en");
      i18n.changeLanguage("en");
    } else if (curentlang == "en") {
      moment.locale("en");
      setCurentlang("ar");
      i18n.changeLanguage("ar");
    }
    setShowdayanddate({ day: theday, date: thedate });
  };
  useEffect(() => {
    dispatch(fetchwatherdata());
    setShowdayanddate({ day: theday, date: thedate });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Container
          maxWidth="sm"
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Div of head */}
          <div
            style={{
              background: "#10439F",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
            }}
          >
            {/* City and Date */}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                color: "#fff",
              }}
              dir={directions}
            >
              <Typography variant="h2" style={{ marginRight: "25px" }}>
                {t("alexandria")}
              </Typography>
              <Typography variant="h4" style={{ marginRight: "25px" }}>
                <span
                  style={{
                    paddingLeft: curentlang == "ar" ? "10px" : "0px",
                    paddingRight: curentlang == "en" ? "10px" : "0px",
                  }}
                >
                  {showdayanddate.day}
                </span>
                {showdayanddate.date}
              </Typography>
            </div>
            {/* End City and Date */}
            <hr />
            {/* Degre and Description */}
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              dir={directions}
            >
              {/* right section */}
              <div style={{ textAlign: curentlang == "ar" ? "right" : "left" }}>
                {/* temper  */}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  {runisloader ? (
                    <CircularProgress
                      style={{ color: "#fff", marginTop: "40px" }}
                    />
                  ) : (
                    ""
                  )}
                  <Typography variant="h2" style={{ fontSize: "100px" }}>
                    {temp.number}
                  </Typography>
                  <img src={temp.icon} style={{ objectFit: "cover" }} />
                </div>
                {/* End temper  */}
                <p style={{ marginTop: "0px", marginBottom: "10px" }}>
                  {t(temp.description)}
                </p>
                {/*  temp big and smal */}
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    style={{
                      marginLeft: curentlang == "ar" ? "10px" : "0px",
                      marginRight: curentlang == "en" ? "10px" : "0px",
                      fontSize: "18px",
                    }}
                  >
                    {t("Max :")} <span>{temp.maxNum}</span>
                  </Typography>
                  |
                  <Typography
                    variant="h6"
                    style={{
                      marginRight: curentlang == "ar" ? "10px" : "0px",
                      marginLeft: curentlang == "en" ? "10px" : "0px",
                      fontSize: "18px",
                    }}
                  >
                    {t("Min :")} <span>{temp.minNum}</span>
                  </Typography>
                </div>
                {/*====temp big and smal====*/}
              </div>
              {/*===== right section =====*/}
              {/* left section */}
              <div>
                <WbCloudyIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
              {/* ===== left section ===== */}
            </div>
            {/* End Degre and Description */}
          </div>
          <Button
            variant="text"
            style={{
              marginTop: "10px",
              fontSize: "20px",
              color: "#fff",
              alignSelf: "flex-start",
            }}
            dir={directions}
            onClick={handelchangelang}
          >
            {curentlang == "ar" ? "أنجليزي" : "عربي"}
          </Button>
          {/* End Div of head */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
