import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchwatherdata = createAsyncThunk(
  "watherApi/featchwather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.205753&lon=29.924526&appid=932741cad31452bd052fd298ecacdbc8"
    );
    // handle success
    const theTemp = Math.round(response.data.main.temp - 273.15);
    const thedesic = response.data.weather[0].description;
    const theMaxnum = Math.round(response.data.main.temp_max - 273.15);
    const theMinnum = Math.round(response.data.main.temp_min - 273.15);
    const theIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    return {
      number: theTemp,
      description: thedesic,
      maxNum: theMaxnum,
      minNum: theMinnum,
      icon: theIcon,
    };
  }
);

const initialState = {
  result: null,
  weather: {},
  isloder: false,
};

export const watherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    getwath: (curentstate, action) => {
      console.log("wather api");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchwatherdata.pending, (state, action) => {
        state.isloder = true;
      })
      .addCase(fetchwatherdata.fulfilled, (state, action) => {
        console.log("==============");
        console.log("the state is ", state, "the action is ", action);
        console.log("API is start");
        state.isloder = false;
        state.weather = action.payload;
      })
      .addCase(fetchwatherdata.rejected, (state, action) => {
        state.isloder = true;
      });
  },
});

export const { getwath } = watherSlice.actions;
export default watherSlice.reducer;
