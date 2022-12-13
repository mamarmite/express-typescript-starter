import ServerController from "@Server/Controllers/ServerController";
import App from "@/Express/App";
import MainApp from "@/App/MainApp";

const mainApp:App = new MainApp();
const serverController = ServerController.getInstance(mainApp.provide());

serverController.start();