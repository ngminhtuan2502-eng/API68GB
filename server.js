const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const SOURCE_API = "http://172.2.2.176:8367/lchu";

app.get("/api/lchu", async (req, res) => {
  try {
    const { data } = await axios.get(SOURCE_API);

    const result = {
      analysis_note: data.analysis_note || "",
      current_result: {
        ket_qua: data.current_result?.ket_qua || "",
        phien: data.current_result?.phien || 0,
        thoi_gian: data.current_result?.thoi_gian || "",
        tong: data.current_result?.tong || 0,
        x1: data.current_result?.x1 || 0,
        x2: data.current_result?.x2 || 0,
        x3: data.current_result?.x3 || 0
      },
      history_count: data.history_count || 0,
      id: data.id || "node_algorithm_v1",
      next_session: data.next_session || 0,
      prediction: data.prediction || "",
      reason: data.reason || 0,
      success: data.success ?? true,
      timestamp: data.timestamp || new Date().toISOString()
    };

    res.json(result);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi lấy API gốc",
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("API LC79 đang chạy...");
});

app.listen(PORT, () => {
  console.log(`Server chạy tại port ${PORT}`);
});
