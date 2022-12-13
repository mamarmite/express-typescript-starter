import ServerController from "@Server/Controllers/ServerController";
import MainApp from "@/MainApp";
import App from "@/Express/App";

const mainApp:App = new MainApp();
const serverController = ServerController.getInstance(mainApp.provide());

serverController.start();