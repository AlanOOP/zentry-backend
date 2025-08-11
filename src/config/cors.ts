import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes desde el frontend
        const whiteList = [];
        whiteList.push(process.env.FRONTEND_URL);
        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

