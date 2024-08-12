import {config as conf} from "dotenv";
conf();

const _config={
    port: process.env.PORT,
};

// the objext.freeze() make the file read only
export const config = Object.freeze(_config);