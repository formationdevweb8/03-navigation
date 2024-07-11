"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
//importation de dotenv pour gèrer les .env pour le backend
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
//on configure le fichier .env pour le serveur.js dans le répertoire src/server/.env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//port 
const PORT = process.env.PORT;
// MongoDB connection
mongoose_1.default.connect(process.env.MONGO_DB_SERVER, {
//useNewUrlParser: true,
//useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// Task Schema and Model
const taskSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    date: String,
    done: Boolean,
});
const Task = mongoose_1.default.model('Task', taskSchema);
// Routes
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task.find();
    res.json(tasks);
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task(req.body);
    yield task.save();
    res.json(task);
}));
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
}));
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
}));
app.get('/gettask/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Task.findById(req.params.id);
    res.json({ message: 'Get task' });
}));
app.put('/updatetaskdone', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //where _id=
    const myquery = { _id: req.body._id };
    //set done=
    var newvalues = { $set: { done: req.body.done } };
    const task = yield Task.updateOne(myquery, newvalues);
    res.json(task);
}));
/*
 var myquery = { address: "Valley 345" };
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
