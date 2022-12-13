import express from "express";
import ExpressProvider from "@/Express/Providers/ExpressProvider";

export default interface AppContract {
    express: express.Application;
    start:() => void;
    provide:() => ExpressProvider
}