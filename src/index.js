import app from "./app.js";

async function main() {
    try {
        app.listen(app.get("port"));
        console.log("Server is in port", app.get("port"));
    } catch (e) {
        console.log(e);
    }
};

main();