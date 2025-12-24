import express from "express";
import crypto from "crypto";

const app = express();

app.use(express.json());

// sample data
let aiTools = [
  {
    id: "tool_001",
    name: "ChatGPT",
    category: "AI Assistant",
    company: "OpenAI",
    pricing: "Freemium",
    rating: 4.8,
    tags: ["chat", "nlp"],
    isActive: true,
  },
];

// get tools
app.get("/tools", (req, res) => {
  const tools = aiTools;
  res.json({ success: true, data: tools });
});

// create tool
app.post("/tools", (req, res) => {
  const { name, category, company } = req.body;

  if (!name || !category || !company) {
    return res.status(400).json({
      success: false,
      error: true,
      message: "Missing required fields",
    });
  }

  const newTool = {
    id: crypto.randomUUID(),
    name: name,
    category: category,
    company: company,
    pricing: "Freemium",
    rating: 0,
    tags: [],
    isActive: true,
  };

  aiTools.push(newTool);
  res.status(201).json({
    success: true,
    message: "Tool Created Successfully",
    data: newTool,
  });
});

// get single tool
app.get("/tools/:id", (req, res) => {
  const { id } = req.params;

  const findTool = aiTools.find((tool) => tool?.id === id);

  if (!findTool) {
    return res.status(404).json({
      success: false,
      error: true,
      message: "Tool not found",
    });
  }

  res.status(200).json({ success: true, data: findTool });
});

// delete tool
app.delete("/tools/:id", (req, res) => {
  const { id } = req.params;

  const index = aiTools.findIndex((tool) => tool.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: true,
      message: "Tool not found",
    });
  }

  aiTools.splice(index, 1);
  res.json({ success: true, message: "Tool deleted successfully" });
});

// update tool
app.put("/tools/:id", (req, res) => {
  const body = req.body;
  const { id } = req.params;

  const index = aiTools.findIndex((tool) => tool.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: true,
      message: "Tool not found",
    });
  }

  const tool = aiTools[index];
  const updatedTool = { ...tool, ...body };
  aiTools[index] = updatedTool;

  res.json({
    success: true,
    message: "Tool updated Successfuly",
    data: updatedTool,
  });
});

app.listen(3000, () => {
  console.log(`server is listening on http://localhost:3000/tools`);
});
